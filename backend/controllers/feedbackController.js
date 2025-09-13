import FeedbackModel from '../models/feedbackModel.js';

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

export const getAllFeedbackController = async (req, res) => {
    try {
        // Ensure the user has the 'official' role from the token
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied: You do not have permission to view this resource.' });
        }

        // Fetch all feedback, sorted by newest first
        const feedback = await FeedbackModel.find({}).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            feedback,
        });

    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).send({ success: false, message: 'Server error while fetching feedback.' });
    }
};
