const rm = require('@root/rm');

const cronJobs = {};
const concurrency = {};

const executeTask = async (concurrencyKey, job) => {
	//check if the job is currently running
	if (concurrency[concurrencyKey] === true) {
		return console.info(`Skipping ${concurrencyKey} execution, since already it is in progress`);
	}

	concurrency[concurrencyKey] = true;
	const handler = require(`@root/${job.module}`)[job.handler];
	console.info(`Started executing job for ${job.name} at ${new Date()}`);
	await handler();
	concurrency[concurrencyKey] = false;
	console.info(`Completed executing job for ${job.name} at ${new Date()}`);
};

const init = async (jobsConfig) => {
	if (!process.env.CRON_JOB_ENABLED) return console.info('CRON JOB IS DISABLED');

	for (const job of jobsConfig) {
		if (job.disabled) continue;

		const concurrencyKey = job.name + '_' + job.handler;

		// if expression is defined, set up a cron job
		if (job.expression) {
			const cron = require('node-cron');

			cronJobs[job.name] = cron.schedule(
				job.expression,
				async () => {
					await executeTask(concurrencyKey, job);
				},
				{
					scheduled: true,
					timezone: job.timeZone || 'Asia/Kolkata',
				}
			);
			console.info('Cron Job scheduled: ', job.name);
			continue;
		}

		// if expression is not defined, set up a setInterval job
		cronJobs[job.name] = setInterval(async () => {
			try {
				await executeTask(concurrencyKey, job);
			} catch (error) {
				concurrency[concurrencyKey] = false;
				console.error(`Cron Job error at ${concurrencyKey}`, error);
			}
		}, job.runAtEvery * 1000);
		console.info('Cron Job scheduled: ', job.name);
	}
};

module.exports = init;
