const rm = require('@root/rm'),
	mongoose = require('mongoose');

const quotaSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	name: { type: String, required: true },
	description: { type: String, required: true },
	isGovernmentQuota: { type: Boolean, default: false },
});

module.exports = mongoose.model('Quota', quotaSchema);
