import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    status: {
        type: String,
        default: 'OPEN',
        enum: ['OPEN', 'IN PROGRESS', 'RESOLVED'],
    },
}, { timestamps: true });

export default mongoose.model('Issue', issueSchema);