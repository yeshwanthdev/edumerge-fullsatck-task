import * as RM from '@root/rm';
import React, { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { http as HTTP } from '@root/utils/http';

const RHAsyncAutoComplete = (props) => {
	let { rules, label, name, apiUrl, apiMethod, apiBody, apiSelect, groupBy, required = false, defaultValue } = props;
	console.log(props);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);

	const loading = open && options.length === 0;
	apiBody = apiBody && Object.keys(apiBody).find((key) => apiBody[key]) && apiBody;
	const getAsyncData = async (apiUrl, apiMethod, body = {}) => {
		try {
			let response = {};
			response = await HTTP[apiMethod.apiMethod](apiUrl, body);

			return response?.data?.data;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			try {
				const response = await getAsyncData(apiUrl, { apiMethod, apiBody, apiSelect });

				if (groupBy) {
					response.sort((a, b) => {
						return (
							RM.helper().getNestedObjValue(a, groupBy)?.[groupBy]?.toString() -
							RM.helper().getNestedObjValue(b, groupBy)?.[groupBy]?.toString()
						);
					});
				}

				if (active) {
					setOptions(response);
				}
			} catch (err) {
				console.log(err);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (apiBody) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Controller
			name={name}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field, fieldState }) => {
				return (
					<Autocomplete
						noOptionsText={'No Options'}
						{...props}
						open={open}
						onOpen={() => {
							setOpen(true);
						}}
						onClose={() => {
							setOpen(false);
						}}
						options={options || []}
						onChange={(event, value) => {
							field.onChange(value);
							props.onChange && props.onChange(event, value);
						}}
						groupBy={(option) => option?.[groupBy]}
						value={props.multiple ? (field.value ? field.value : []) : field.value ? field.value : null}
						loading={loading}
						loadingText={'loading'}
						size="small"
						renderInput={(props) => (
							<TextField
								{...props}
								required={required}
								helperText={fieldState?.error && fieldState?.error?.message}
								error={Boolean(fieldState?.error)}
								size="small"
								variant="outlined"
								label={label}
								InputProps={{
									...props.InputProps,
									endAdornment: (
										<>
											{loading ? <CircularProgress color="inherit" size={20} /> : null}
											{props.InputProps.endAdornment}
										</>
									),
								}}
							/>
						)}
					/>
				);
			}}
		/>
	);
};

export const freeSoloReasonConstants = {
	selected: 'select-option',
	created: 'create-option',
	removed: 'remove-option',
};
export default RHAsyncAutoComplete;
