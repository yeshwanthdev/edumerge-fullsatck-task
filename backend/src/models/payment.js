const rm = require('@root/rm'),
	mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	//commonSchema
	...rm.utils.commonSchema,
	admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true, index: true },
	recordStatus: {
		type: String,
		enum: [rm.enums.paymentStatus.pending, rm.enums.paymentStatus.completed, rm.enums.paymentStatus.failed],
		default: rm.enums.paymentStatus.pending,
	},
});

module.exports = mongoose.model('Payment', paymentSchema);
