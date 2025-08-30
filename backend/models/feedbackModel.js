import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    feedbackType: {
        type: String,
        required: true,
        enum: ['Suggestion', 'Appreciation', 'Bug Report']
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;