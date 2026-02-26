import React from 'react';
// import { formStyles } from './formStyles';
import { Controller } from 'react-hook-form';
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';
import * as RM from '@root/rm';
import { Autocomplete, TextField } from '@mui/material';

const RHAutoComplete = ({ rules, options, label, name, defaultValue, ...autoprops }) => {
	return (
		<Controller
			name={name}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field, fieldState }) => {
				return (
					<Autocomplete
						noOptionsText={'No Options'}
						openText={'Open'}
						clearText={'Clear'}
						{...autoprops}
						{...field}
						options={options || []}
						size="small"
						onChange={(event, value, reason) => {
							field.onChange(value);
							autoprops.onChange && autoprops.onChange(event, value, reason);
						}}
						disabled={autoprops?.disabled || false}
						value={autoprops.multiple ? (field.value ? field.value : []) : field.value ? field.value : null}
						renderInput={
							autoprops.renderInput ||
							((props) => (
								<TextField
									{...props}
									{...(autoprops?.showAsterisk ? { required: true } : { required: false })}
									helperText={fieldState?.error && fieldState?.error?.message}
									error={Boolean(fieldState?.error)}
									size="small"
									variant="outlined"
									label={label}
								/>
							))
						}
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

	blur: 'blur',
	clear: 'clear',
};
export default RHAutoComplete;
