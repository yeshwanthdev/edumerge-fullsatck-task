const rm = require('@root/rm'),
	mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	name: { type: String, required: true },
	description: { type: String, required: true },
});

module.exports = mongoose.model('Institution', institutionSchema);
