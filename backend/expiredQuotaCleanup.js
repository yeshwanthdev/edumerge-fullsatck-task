const taskProcessor = require('./src/wrappers/quotaCleanup.js');

module.exports.handler = async () => {
	await taskProcessor();
};
