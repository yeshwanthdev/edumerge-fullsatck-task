const env = {
	environment: process.env.ENV,
	PORT: process.env.PORT || 5000,
	MONGODB_URI: process.env.MONGODB_URI,
	FRONTEND_URL: process.env.FRONTEND_URL,
	CRON_JOB_ENABLED: process.env.CRON_JOB_ENABLED,
};

module.exports = env;
