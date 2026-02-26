const env = {
	environment: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 5000,
	MONGODB_URI: process.env.MONGODB_URI,
	FRONTEND_URL: process.env.FRONTEND_URL,
};

module.exports = env;
