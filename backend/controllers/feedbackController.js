import FeedbackModel from '../models/feedbackModel.js';

// Controller to CREATE a new feedback entry
export const createFeedbackController = async (req, res) => {
    try {
        const { feedbackType, message } = req.body;

        if (!feedbackType || !message) {
            return res.status(400).send({ success: false, message: 'All fields are required.' });
        }

        const feedback = new FeedbackModel({ feedbackType, message });
        await feedback.save();

        res.status(201).send({
            success: true,
            message: 'Thank you! Your feedback has been submitted successfully.',
        });

    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).send({ success: false, message: 'Server error while saving feedback.' });
    }
};

// 👇 ADD THIS NEW FUNCTION TO THE END OF THE FILE
// Controller to GET ALL feedback entries (for officials)
export const getAllFeedbackController = async (req, res) => {
    try {
        // Fetch all feedback, sorted by newest first
        const feedback = await FeedbackModel.find({}).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            feedback,
        });

    } catch (error) {
        console.error("Error fetching all feedback:", error);
        res.status(500).send({ success: false, message: 'Server error while fetching feedback.' });
    }
};