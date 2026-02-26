const rm = require('@root/rm'),
	mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	name: { type: String, required: true },
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

module.exports = mongoose.model('Program', programSchema);
