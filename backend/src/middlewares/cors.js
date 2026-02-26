const rm = require('@root/rm');
const cors = require('cors');

const corsMiddleware = cors({
	origin: rm.config.FRONTEND_URL,
	credentials: true,
});

module.exports = corsMiddleware;
