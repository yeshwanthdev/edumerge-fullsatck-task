require('../config/module-alias')();

const express = require('express'),
	rm = require('@root/rm'),
	http = require('http'),
	dotenv = require('dotenv'),
	compression = require('compression'),
	cookieParser = require('cookie-parser'),
	cronJob = require('@helper/cronJob'),
	{ connectDB } = require('@config/db');

dotenv.config();
const app = express();

//middlewares
app.use(cookieParser());
app.use(compression());
app.use(express.json({ limit: rm.config.requestLimit }));
app.use(require('@middleware/cors'));

//routes
app.use('/api/dashboard', require('@route/dashboard'));
app.use('/api/admission', require('@route/admission'));
app.use('/api/payment', require('@route/payment'));
app.use('/api/institution', require('@route/institution'));
app.use('/api/campus', require('@route/campus'));
app.use('/api/department', require('@route/department'));
app.use('/api/program', require('@route/program'));
app.use('/api/quota', require('@route/quota'));
app.use('/api/seatMatrix', require('@route/seatMatrix'));

//healthcheck
app.get('/', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

async function startServer() {
	await connectDB();

	const PORT = rm.config.PORT;
	const server = http.createServer(app);

	server.listen(PORT, () => {
		console.log('------------------------');
		console.log(`Server running on port ${PORT}`);
		console.log('------------------------');
	});
	cronJob(rm.config.cronJobs);
}

startServer();
