const rm = require('@root/rm'),
	mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	name: { type: String, required: true },
	description: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentSchema);
