import * as RM from '@root/rm';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useMemo } from 'react';
import { getSingleRecord, handleSubmit, quotaOptions, validationSchema } from '@pages/Quota/api';
import { useNavigate, useParams } from 'react-router-dom';
import RHTextField from '@root/components/form/RHTextField';
import Page from '@root/components/ui/Page';
import { Grid, Stack } from '@mui/material';
import Label from '@root/components/ui/Label';
import { useDialogs } from '@toolpad/core';
import RHAutoComplete from '@root/components/form/RHAutoComplete';

const ObjectPage = (props) => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const { code } = useParams();

	const [isEditable, setIsEditable] = useState(false);
	const isCreateNewRecord = code === 'createNewRecord';
	const isEditDisabled = isEditable || !RM.helper().isAuthorized(RM.commonConfig.arnConstants.QUOTAS_EDIT);

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
			onClick: async () => navigate('/quota'),
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
			navigate('/quota');
			setIsEditable(false);
		} catch (error) {
			console.error(error);
		}
	};

	// breadcrums
	const breadcrumbs = [
		{
			title: 'Quota',
			path: '/quota',
		},
		{
			title: isCreateNewRecord ? 'Create Quota' : values?.name || '',
		},
	];

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				<Page title="Quota" breadcrumbs={breadcrumbs} actions={actions}>
					{/* <Grid container spacing={2}>
						{isEditable ? (
							<RHTextField name="name" label="Name" fullWidth />
						) : (
							<Label label="Name" value={values?.name ?? '-'} />
						)}
						{isEditable ? (
							<RHTextField name="description" label="Description" fullWidth multiline rows={4} />
						) : (
							<Label label="Description" value={values?.description ?? '-'} />
						)}
						{isEditable ? (
							<RHAutoComplete key="type" options={quotaOptions} name="isGovernmentQuota" label="Government Quota" />
						) : (
							<Label label="Government Quota" value={values?.isGovernmentQuota ? 'Yes' : 'No'} />
						)}
					</Grid> */}

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
								<RHAutoComplete
									key="type"
									options={quotaOptions}
									name="isGovernmentQuota"
									label="Government Quota"
									getOptionLabel={(option) => (option === true ? 'Yes' : 'No')}
									onChange={(option) => option}
								/>
							) : (
								<Label label="Government Quota" value={values?.isGovernmentQuota ? 'Yes' : 'No'} />
							)}
						</Grid>
						<Grid size={12}>
							{isEditable ? (
								<RHTextField name="description" label="Description" fullWidth multiline />
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
