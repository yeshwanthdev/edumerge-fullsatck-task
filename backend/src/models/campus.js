const rm = require('@root/rm'),
	mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	name: { type: String, required: true },
	description: { type: String, required: true },
	institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
});

module.exports = mongoose.model('Campus', campusSchema);
