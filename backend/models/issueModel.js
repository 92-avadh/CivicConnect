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
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            type: String,
            trim: true,
        }
    ],
    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'], // ✅ consistent uppercase + underscore
        default: 'OPEN',
    },
}, { timestamps: true });

export default mongoose.model('Issue', issueSchema);
