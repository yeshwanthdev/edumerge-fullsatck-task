import React, { useEffect, useState } from 'react';

import { getAdmissionDetails } from '@pages/Dashboard/api';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function AdmissionBoard() {
	const [data, setData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAdmissionDetails();
				setData(result);
			} catch (error) {
				console.error('Error fetching program seats:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Grid size={{ xs: 12, md: 4 }}>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="caption">Admission Pending</Typography>
						<Typography variant="h4">{data?.pendingAdmissions || 0}</Typography>
					</CardContent>
				</Card>
			</Grid>

			<Grid size={{ xs: 12, md: 4 }}>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="caption">Total Admissions</Typography>
						<Typography variant="h4">{data?.totalAdmissions || 0}</Typography>
					</CardContent>
				</Card>
			</Grid>

			<Grid size={{ xs: 12, md: 4 }}>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="caption">Percentage</Typography>
						<Typography variant="h4">{data?.percentageFilled || 0}%</Typography>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
}
