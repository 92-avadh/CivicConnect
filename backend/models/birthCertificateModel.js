import mongoose from 'mongoose';
import Counter from './counterModel.js'; 
const birthCertificateSchema = new mongoose.Schema({
    applicationNumber: { type: String, unique: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    childsFullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    hospitalOfBirth: { type: String, required: true },
    mothersFullName: { type: String, required: true },
    status: {
        type: String,
        default: 'SUBMITTED',
        enum: ['SUBMITTED', 'IN REVIEW', 'APPROVED', 'REJECTED'],
    },
}, { timestamps: true });

// Middleware to generate the application number before saving
birthCertificateSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'birthCertificateId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.applicationNumber = `SMC-BC-${counter.seq}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

export default mongoose.model('BirthCertificate', birthCertificateSchema);