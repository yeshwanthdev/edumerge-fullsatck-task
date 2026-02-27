import * as RM from '@root/rm';
import Page from '@root/components/ui/Page';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialogs, useNotifications } from '@toolpad/core';
import { breadcrumbs, columns, customDataSource, handleSubmit } from '@pages/Payment/api';
import { tableStyles } from '@root/utils/constants';

const ListPage = () => {
	const navigate = useNavigate();
	const dialogs = useDialogs();
	const notifications = useNotifications();
	const apiRef = useGridApiRef();

	const [selectedRows, setSelectedRows] = useState([]);
	const isCreateDisabled = !RM.helper().isAuthorized(RM.commonConfig.arnConstants.ADMISSION_EDIT);
	console.log('selectedRows', selectedRows);

	// actions
	const actions = [
		{
			label: 'Update',
			variant: 'contained',
			hidden: isCreateDisabled,
			onClick: async () => {
				try {
					const selectedIds = apiRef.current.getSelectedRows();
					const selectedRows = Array.from(selectedIds.values());
					const status = selectedRows[0].recordStatus;
					if (status === 'COMPLETED') return notifications.show('Admission Completed', { info: 'success' });
					await handleSubmit(selectedRows[0].code);
					apiRef.current?.dataSource?.fetchRows();
				} catch (error) {
					console.error(error);
				}
			},
		},
	];

	return (
		<Page title="Payment" breadcrumbs={breadcrumbs} actions={actions}>
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
				onRowSelectionModelChange={(rows) => setSelectedRows(Array.from(rows.ids))}
				pageSizeOptions={[10, 20, 50]}
				sx={tableStyles}
			/>
		</Page>
	);
};

export default ListPage;
