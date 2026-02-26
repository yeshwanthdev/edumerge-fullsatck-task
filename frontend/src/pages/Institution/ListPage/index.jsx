import * as RM from '@root/rm';
import Page from '@root/components/ui/Page';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialogs, useNotifications } from '@toolpad/core';
import { breadcrumbs, columns, customDataSource, deleteSingleRecord } from '@pages/Institution/api';
import { tableStyles } from '@root/utils/constants';

const ListPage = () => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const notifications = useNotifications();
	const apiRef = useGridApiRef();

	const [selectedRows, setSelectedRows] = useState([]);
	const isCreateDisabled = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.INSTITUTION_CREATE);
	const isDeleteDisabled = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.INSTITUTION_DELETE);

	// actions
	const actions = [
		{
			label: 'Create',
			variant: 'contained',
			hidden: isCreateDisabled,
			onClick: async () => navigate('/institution/createNewRecord'),
		},
		{
			label: 'Delete',
			variant: 'outlined',
			hidden: isDeleteDisabled,
			disabled: RM.lodash.isEmpty(selectedRows),
			onClick: async () => {
				try {
					await deleteSingleRecord(selectedRows[0]);
					apiRef.current?.dataSource.fetchRows();
					notifications.show('Deleted Successfully', { severity: 'success' });
				} catch (error) {
					console.error(error);
					notifications.show('Deleted Failed', { severity: 'fail' });
				}
			},
		},
	];

	//handle row click
	const handleRowClick = (params) => {
		navigate(`/institution/${params.row.code}`);
	};

	return (
		<Page title="Institution" breadcrumbs={breadcrumbs} actions={actions}>
			<DataGrid
				apiRef={apiRef}
				columns={columns}
				dataSource={customDataSource}
				dataSourceCache={null}
				pagination
				disableRowSelectionOnClick
				getRowId={(row) => row.code}
				checkboxSelection
				disableMultipleRowSelection
				onRowClick={handleRowClick}
				onRowSelectionModelChange={(rows) => setSelectedRows(Array.from(rows.ids))}
				pageSizeOptions={[10, 20, 50]}
				sx={tableStyles}
			/>
		</Page>
	);
};

export default ListPage;
