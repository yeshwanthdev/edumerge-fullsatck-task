import * as React from 'react';
import Typography from '@mui/material/Typography';
import { PageContainer } from '@toolpad/core';
import { Card, CardContent, Grid } from '@mui/material';
import AllottedSeatsPerQuota from './components/AllottedSeatsPerQuota';
import AllottedProgramSeats from './components/AllottedProgramSeats';
import AdmissionBoard from './components/AdmissionBoard';

export default function DashboardPage() {
	return (
		<PageContainer>
			<Grid container spacing={3}>
				<AdmissionBoard />
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Card variant="outlined">
						<CardContent>
							<Typography variant="caption">Allotted Seats Per Quota</Typography>
							<AllottedSeatsPerQuota />
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 6 }}>
					<Card variant="outlined">
						<CardContent>
							<Typography variant="caption">Program Allottment</Typography>
							<AllottedProgramSeats />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</PageContainer>
	);
}
