const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const formateData = (data) => {
	const chartData = data.map((item, index) => ({
		label: item.quotaName || item.quotaId,
		value: item.totalAllotedSeats,
		color: colors[index % colors.length],
	}));

	return chartData;
};

module.exports = { formateData };
