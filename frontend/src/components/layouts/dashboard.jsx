import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Box, CircularProgress } from '@mui/material';

export default function Layout() {
	return (
		<DashboardLayout>
			<React.Suspense
				fallback={
					<Box display="flex" justifyContent="center" mt={5}>
						<CircularProgress />
					</Box>
				}>
				<Outlet />
			</React.Suspense>
		</DashboardLayout>
	);
}
