import * as RM from '@root/rm';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useMemo } from 'react';
import { getSingleRecord, handleSubmit, validationSchema } from '@pages/SeatMatrix/api';
import { useNavigate, useParams } from 'react-router-dom';
import RHTextField from '@root/components/form/RHTextField';
import Page from '@root/components/ui/Page';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import Label from '@root/components/ui/Label';
import { useDialogs, useNotifications } from '@toolpad/core';
import { Add, Delete } from '@mui/icons-material';
import RHAsyncAutoComplete from '@root/components/form/RHAsyncAutoComplete';

const ObjectPage = (props) => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const notifications = useNotifications();
	const { code } = useParams();

	const [isEditable, setIsEditable] = useState(false);
	const isCreateNewRecord = code === 'createNewRecord';
	const isEditDisabled = isEditable || !RM.helper().isAuthorized(RM.commonConfig.arnConstants.SEAT_MATRIX_EDIT);

	const formMethods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(validationSchema),
	});

	const values = formMethods.watch();
	const {
		control,
		formState: { isDirty, isValid },
	} = formMethods;
	const { fields, append, remove } = useFieldArray({ control, name: 'quotas' });

	// actions
	const actions = [
		{
			label: 'cancel',
			variant: 'contained',
			hidden: !isEditable,
			onClick: async () => navigate('/seatMatrix'),
		},
		{
			label: 'save',
			variant: 'outlined',
			type: 'submit',
			hidden: !isEditable,
			disabled: !isDirty,
		},
		{
			label: 'edit',
			variant: 'contained',
			hidden: isEditDisabled,
			onClick: async () => setIsEditable(true),
		},
	];

	async function fetchData() {
		if (isCreateNewRecord) return setIsEditable(true);

		try {
			const response = await getSingleRecord(code);
			const record = response?.data;
			if (record) formMethods.reset(record);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [code]);

	const onSubmit = async (values) => {
		try {
			// pre checks
			const totalSeats = values.quotas.reduce((acc, q) => acc + Number(q.total || 0), 0);
			if (totalSeats !== Number(values.totalIntake)) {
				notifications.show('Total seats must equal Total Intake', { severity: 'error', autoHideDuration: 1000 });
				return;
			}

			await handleSubmit(isCreateNewRecord, values);
			navigate('/seatMatrix');
			setIsEditable(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddQuota = () => {
		const totalSeatIntakeError = formMethods.formState.errors?.totalIntake;

		// if (RM.lodash.isEmpty(values?.totalIntake)) return notifications.show('Fill Intake', { severity: 'info' });
		if (RM.lodash.isEmpty(values?.totalIntake) || totalSeatIntakeError) {
			formMethods.setError('totalIntake', { type: 'manual', message: 'Fill Total Seat Intake before adding a quota' });
			return;
		}
		append({ type: null, total: '' });
	};

	// breadcrums
	const breadcrumbs = [
		{
			title: 'Seat Matrix',
			path: '/seatMatrix',
		},
		{
			title: isCreateNewRecord ? 'Create Seat Matrix' : values?.program?.name || '',
		},
	];

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				<Page title="Seat Matrix" breadcrumbs={breadcrumbs} actions={actions}>
					<Grid container spacing={2}>
						<Grid size={6}>
							{isEditable ? (
								<RHAsyncAutoComplete
									name="program"
									label="Program"
									apiUrl={`${RM.commonConfig.apiBaseUrl}/program`}
									apiMethod="get"
									getOptionLabel={(option) => option?.name || ''}
								/>
							) : (
								<Label label="Program" value={values?.program?.name ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="totalIntake" label="Total Intake" fullWidth />
							) : (
								<Label label="Total Intake" value={values?.totalIntake ?? '-'} />
							)}
						</Grid>
						{isEditable && (
							<Grid size={12}>
								<Button variant="outlined" startIcon={<Add />} onClick={handleAddQuota}>
									Add Quota
								</Button>
							</Grid>
						)}

						<Grid container spacing={2} size={12}>
							{fields.map((item, index) => (
								<Grid container size={12} key={item.id} alignItems="center">
									<Grid item size={isEditable ? 5 : 6}>
										{isEditable ? (
											<RHAsyncAutoComplete
												name={`quotas[${index}].type`}
												label="Quota"
												apiUrl={`${RM.commonConfig.apiBaseUrl}/quota`}
												apiMethod="get"
												getOptionLabel={(option) => option?.name || ''}
											/>
										) : (
											<Label label="Quota" value={values?.quotas?.[index]?.type?.name ?? '-'} />
										)}
									</Grid>

									<Grid item size={isEditable ? 5 : 6}>
										{isEditable ? (
											<RHTextField name={`quotas[${index}].total`} label="Seats" fullWidth />
										) : (
											<Label label="Seats" value={values?.quotas?.[index]?.total ?? '-'} />
										)}
									</Grid>
									{isEditable && (
										<Grid item xs={2}>
											<IconButton onClick={() => remove(index)}>
												<Delete />
											</IconButton>
										</Grid>
									)}
								</Grid>
							))}
						</Grid>
					</Grid>
				</Page>
			</form>
		</FormProvider>
	);
};
export default ObjectPage;
