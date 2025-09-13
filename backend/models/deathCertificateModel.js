import mongoose from 'mongoose';
import Counter from './counterModel.js';

const deathCertificateSchema = new mongoose.Schema({
    applicationNumber: {
        type: String,
        unique: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deceasedsFullName: { type: String, required: true },
    dateOfDeath: { type: Date, required: true },
    placeOfDeath: { type: String, required: true },
    status: {
        type: String,
        default: 'SUBMITTED',
        enum: ['SUBMITTED', 'IN REVIEW', 'APPROVED', 'REJECTED'],
    },
}, { timestamps: true });

// Middleware to generate the application number before saving
deathCertificateSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'deathCertificateId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.applicationNumber = `SMC-DC-${counter.seq}`;
    }
    next();
});

export default mongoose.model('DeathCertificate', deathCertificateSchema);