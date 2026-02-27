import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { getProgramSeats } from '@pages/Dashboard/api';

export default function AllottedProgramSeats() {
	const [chartData, setChartData] = useState({
		xLabels: [],
		totalData: [],
		filledData: [],
		remainingData: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getProgramSeats();
				// Ensure we always have arrays
				setChartData({
					xLabels: result?.xLabels || [],
					totalData: result?.totalData || [],
					filledData: result?.filledData || [],
					remainingData: result?.remainingData || [],
				});
			} catch (error) {
				console.error('Error fetching program seats:', error);
				setChartData({
					xLabels: [],
					totalData: [],
					filledData: [],
					remainingData: [],
				});
			}
		};
		fetchData();
	}, []);

	if (chartData.xLabels.length === 0) {
		return <Box sx={{ width: '100%', height: 400 }}>No data available</Box>;
	}

	return (
		<Box sx={{ width: '100%', height: 200 }}>
			<BarChart
				xAxis={[{ data: chartData.xLabels, height: 10 }]}
				yAxis={[{ width: 40 }]}
				series={[
					{ data: chartData.totalData, label: 'Total Seats', id: 'totalId', color: '#0088FE' },
					{ data: chartData.filledData, label: 'Filled Seats', id: 'filledId', color: '#00C49F' },
					{ data: chartData.remainingData, label: 'Remaining Seats', id: 'remainingId', color: '#FFBB28' },
				]}
			/>
		</Box>
	);
}
