const rm = require('@root/rm'),
	mongoose = require('mongoose');

const seatMatrixSchema = new mongoose.Schema({
	// common fields
	...rm.utils.commonSchema,

	program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
	totalIntake: { type: Number, required: true },
	quotas: [
		{
			type: { type: mongoose.Schema.Types.ObjectId, ref: 'Quota', required: true },
			total: { type: Number, required: true },
			filled: { type: Number, default: 0 },
		},
	],
	quotaStatus: {
		type: Map,
		of: {
			total: { type: Number, required: true },
			filled: { type: Number, default: 0 },
		},
	},
});

module.exports = mongoose.model('SeatMatrix', seatMatrixSchema);
// while creating seat-matrix, when a user selects a program, and year check if theres any record already, to prevent duplication
// In frontend user selects program and year , later user selects another program (When ever he changes the program, reset year, cause when user reselects year, we can query backend)
