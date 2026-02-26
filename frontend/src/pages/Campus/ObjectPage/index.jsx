import * as RM from '@root/rm';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useMemo } from 'react';
import { getSingleRecord, handleSubmit, validationSchema } from '@pages/Campus/api';
import { useNavigate, useParams } from 'react-router-dom';
import RHTextField from '@root/components/form/RHTextField';
import Page from '@root/components/ui/Page';
import { Grid, Stack } from '@mui/material';
import Label from '@root/components/ui/Label';
import { useDialogs } from '@toolpad/core';
import RHAsyncAutoComplete from '@root/components/form/RHAsyncAutoComplete';

const ObjectPage = (props) => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const { code } = useParams();

	const [isEditable, setIsEditable] = useState(false);
	const isCreateNewRecord = code === 'createNewRecord';
	const isEditDisabled = isEditable || !RM.helper().isAuthorized(RM.commonConfig.arnConstants.CAMPUS_EDIT);

	const formMethods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(validationSchema),
	});

	const values = formMethods.watch();
	const {
		formState: { isDirty, isValid },
	} = formMethods;

	// actions
	const actions = [
		{
			label: 'cancel',
			variant: 'contained',
			hidden: !isEditable,
			onClick: async () => navigate('/campus'),
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
			await handleSubmit(isCreateNewRecord, values);
			navigate('/campus');
			setIsEditable(false);
		} catch (error) {
			console.error(error);
		}
	};

	// breadcrums
	const breadcrumbs = [
		{
			title: 'Campus',
			path: '/campus',
		},
		{
			title: isCreateNewRecord ? 'Create Campus' : values?.name || '',
		},
	];

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				<Page title="Campus" breadcrumbs={breadcrumbs} actions={actions}>
					<Grid container spacing={2}>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="name" label="Name" fullWidth />
							) : (
								<Label label="Name" value={values?.name ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHAsyncAutoComplete
									name="institution"
									label="Institution"
									apiUrl={`${RM.commonConfig.apiBaseUrl}/institution`}
									apiMethod="get"
									getOptionLabel={(option) => option?.name || ''}
								/>
							) : (
								<Label label="Institution" value={values?.institution?.name ?? '-'} />
							)}
						</Grid>
						<Grid size={12}>
							{isEditable ? (
								<RHTextField name="description" label="Description" fullWidth multiline rows={4} />
							) : (
								<Label label="Description" value={values?.description ?? '-'} />
							)}
						</Grid>
					</Grid>
				</Page>
			</form>
		</FormProvider>
	);
};
export default ObjectPage;
