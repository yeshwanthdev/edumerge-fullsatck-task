import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getAllottedSeats } from '@pages/Dashboard/api';

const AllottedSeatsPerQuota = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			let fetchData = async () => {
				const result = await getAllottedSeats();
				setData(result || []);
			};
			fetchData();
		} catch (error) {}
	}, []);

	return <PieChart series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]} {...settings} />;
};
export default AllottedSeatsPerQuota;

const settings = {
	margin: { right: 5 },
	width: 200,
	height: 200,
	hideLegend: true,
};
