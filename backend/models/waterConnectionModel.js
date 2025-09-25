import mongoose from 'mongoose';
import Counter from './counterModel.js'; 

const waterConnectionSchema = new mongoose.Schema({
    applicationNumber: {
        type: String,
        unique: true,
    },
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applicantName: { type: String, required: true },
    propertyAddress: { type: String, required: true },
    addressProof: { type: String },
    status: {
        type: String,
        default: 'SUBMITTED',
        enum: ['SUBMITTED', 'IN REVIEW', 'APPROVED', 'REJECTED'],
    },
}, { timestamps: true });

// Middleware to generate the application number before saving
waterConnectionSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'waterConnectionId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.applicationNumber = `SMC-WC-${counter.seq}`;
    }
    next();
});

export default mongoose.model('WaterConnection', waterConnectionSchema);