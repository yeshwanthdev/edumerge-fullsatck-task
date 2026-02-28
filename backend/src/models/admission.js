const rm = require('@root/rm'),
	mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
	//common fields
	...rm.utils.commonSchema,

	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: Number, required: true },
	seatMatrix: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatMatrix', required: true },
	academicYear: { type: Number, required: true },
	institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
	campus: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true },
	quota: { type: mongoose.Schema.Types.ObjectId, ref: 'Quota', required: true },
	courseType: { type: String, required: true },
	applicationNumber: { type: String },
	admissionNumber: { type: String },
	isAdmissionGenerated: { type: Boolean, default: false },
	isDocumentVerified: { type: Boolean, default: false },
	recordStatus: {
		type: mongoose.Schema.Types.String,
		enum: [rm.enums.admissionStatus.pending, rm.enums.admissionStatus.completed],
		default: rm.enums.admissionStatus.pending,
	},
	isFeePaid: { type: Boolean, default: false },
	seatLockedAt: { type: Date, default: rm.utils.UTCDateNow },
	lockExpiresAt: { type: Date, default: rm.utils.UTCDateNow },
});

module.exports = mongoose.model('Admission', admissionSchema);
