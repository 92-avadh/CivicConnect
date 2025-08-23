import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    // ✅ ADDED: Link to the user who created the issue
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This links to your userModel
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
    // ✅ ADDED: Category field to match the frontend form
    category: {
        type: String,
        required: true,
    },
    // ✅ CHANGED: Renamed 'location' to 'category' in the old schema
    // and made images an array of strings
    images: [{
        type: String, // We will store an array of image paths
    }],
    status: {
        type: String,
        default: 'OPEN', // Changed default to OPEN for clarity
        enum: ['OPEN', 'IN PROGRESS', 'RESOLVED'], // Ensures status is one of these values
    },
}, { timestamps: true });

export default mongoose.model('Issue', issueSchema);