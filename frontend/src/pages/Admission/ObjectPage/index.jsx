import * as RM from '@root/rm';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useEffect, useMemo } from 'react';
import { getSingleRecord, handleSubmit, validationSchema } from '@pages/Admission/api';
import { useNavigate, useParams } from 'react-router-dom';
import RHTextField from '@root/components/form/RHTextField';
import Page from '@root/components/ui/Page';
import { Grid, Stack } from '@mui/material';
import Label from '@root/components/ui/Label';
import { useDialogs } from '@toolpad/core';
import RHAsyncAutoComplete from '@root/components/form/RHAsyncAutoComplete';
import RHAutoComplete from '@root/components/form/RHAutoComplete';

const ObjectPage = (props) => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const { code } = useParams();

	const [isEditable, setIsEditable] = useState(false);
	const isCreateNewRecord = code === 'createNewRecord';
	const isEditDisabled = isEditable || !RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_EDIT);

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
			onClick: async () => navigate('/admission'),
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
			navigate('/admission');
			setIsEditable(false);
		} catch (error) {
			console.error(error);
		}
	};

	// breadcrums
	const breadcrumbs = [
		{
			title: 'Admission',
			path: '/admission',
		},
		{
			title: isCreateNewRecord ? 'Create Applicant' : values?.firstName + ' ' + values?.lastName,
		},
	];
	console.log('values form', values);

	const isGovernmentQuota = Boolean(values?.quota?.isGovernmentQuota);
	const isAdmissionGenerated = Boolean(values?.isAdmissionGenerated);
	const quotaOptions = values?.seatMatrix?.quotas?.map((q) => ({
		label: q.type.name,
		value: q.type._id,
		disabled: q.total === q.filled,
	}));

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				<Page title="Admission" breadcrumbs={breadcrumbs} actions={actions}>
					<Grid container spacing={2}>
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
						<Grid size={6}>
							{isEditable ? (
								<RHAsyncAutoComplete
									name="campus"
									label="Campus"
									apiUrl={`${RM.commonConfig.apiBaseUrl}/campus`}
									apiMethod="get"
									getOptionLabel={(option) => option?.name || ''}
								/>
							) : (
								<Label label="Campus" value={values?.institution?.name ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="firstName" label="First Name" fullWidth />
							) : (
								<Label label="First Name" value={values?.firstName ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="lastName" label="Last Name" fullWidth />
							) : (
								<Label label="Last Name" value={values?.lastName ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="email" label="Email" fullWidth />
							) : (
								<Label label="Email" value={values?.email ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="phone" label="Phone" fullWidth />
							) : (
								<Label label="Phone" value={values?.phone ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHAsyncAutoComplete
									name="seatMatrix"
									label="Program"
									apiUrl={`${RM.commonConfig.apiBaseUrl}/seatMatrix`}
									apiMethod="get"
									getOptionLabel={(option) => option?.program?.name || ''}
								/>
							) : (
								<Label label="Program" value={values?.seatMatrix?.program?.name ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHAutoComplete
									key="type"
									options={values?.seatMatrix?.quotas?.map((q) => q.type) || []}
									name="quota"
									label="Quota"
									getOptionLabel={(option) => option?.name || ''}
								/>
							) : (
								<Label label="Quota" value={values?.quota?.name ?? ''} />
							)}
						</Grid>
						{isGovernmentQuota && (
							<Grid size={6}>
								{isEditable ? (
									<RHTextField name="applicationNumber" label="Application Number" fullWidth />
								) : (
									<Label label="Application Number" value={values?.applicationNumber ?? '-'} />
								)}
							</Grid>
						)}
						<Grid size={6}>
							{isEditable ? (
								<RHAutoComplete key="type" options={['UG', 'PG']} name="courseType" label="Course Type" />
							) : (
								<Label label="Course Type" value={values?.courseType ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHTextField name="academicYear" label="Academic year" fullWidth />
							) : (
								<Label label="Academic year" value={values?.academicYear ?? '-'} />
							)}
						</Grid>
						<Grid size={6}>
							{isEditable ? (
								<RHAutoComplete
									key="type"
									options={[true, false]}
									name="documentVerification"
									label="Document Verification"
									getOptionLabel={(option) => (option === true ? 'Yes' : 'No')}
								/>
							) : (
								<Label label="Document Verification" value={values?.documentVerification ? 'Yes' : 'No'} />
							)}
						</Grid>
						{isAdmissionGenerated && (
							<Grid size={6}>
								{isEditable ? (
									<RHTextField name="admissionNumber" label="Admission Number" disabled fullWidth />
								) : (
									<Label label="Admission Number" value={values?.admissionNumber ?? '-'} />
								)}
							</Grid>
						)}
					</Grid>
				</Page>
			</form>
		</FormProvider>
	);
};
export default ObjectPage;
