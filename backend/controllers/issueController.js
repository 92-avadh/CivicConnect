import IssueModel from '../models/issueModel.js';

export const createIssueController = async (req, res) => {
    try {
        // From the auth middleware, we get the logged-in user's ID
        const userId = req.user._id;

        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(400).send({ success: false, message: 'Title, description, and category are required.' });
        }

        // Handle file paths for multiple images
        let imagePaths = [];
        if (req.files && req.files.length > 0) {
            // Assuming your files are served from a public/uploads directory
            imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        }

        const newIssue = new IssueModel({
            userId,
            title,
            description,
            category,
            images: imagePaths,
        });

        await newIssue.save();

        res.status(201).send({
            success: true,
            message: 'Issue reported successfully!',
            issue: newIssue,
        });

    } catch (error) {
        console.error("Error creating issue:", error);
        res.status(500).send({ success: false, message: 'Server error while creating issue.' });
    }
};

// Controller to GET all issues
export const getIssuesController = async (req, res) => {
    try {
        const issues = await IssueModel.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'Issues fetched successfully',
            issues,
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).send({ success: false, message: 'Error fetching issues.' });
    }
};