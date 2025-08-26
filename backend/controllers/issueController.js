import IssueModel from '../models/issueModel.js';

// Controller to CREATE a new issue
export const createIssueController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).send({ success: false, message: 'Title, description, and category are required.' });
        }

        let imagePaths = [];
        if (req.files && req.files.length > 0) {
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

// ✅ THIS IS THE FIX: This function correctly handles the update logic.
export const updateIssueStatusController = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access denied. Only officials can update status.' });
        }

        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['OPEN', 'IN PROGRESS', 'RESOLVED'].includes(status)) {
            return res.status(400).send({ success: false, message: 'Invalid status provided.' });
        }

        const updatedIssue = await IssueModel.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedIssue) {
            return res.status(404).send({ success: false, message: 'Issue not found.' });
        }

        res.status(200).send({
            success: true,
            message: 'Issue status updated successfully!',
            issue: updatedIssue,
        });

    } catch (error) {
        console.error("Error updating issue status:", error);
        res.status(500).send({ success: false, message: 'Server error while updating status.' });
    }
};