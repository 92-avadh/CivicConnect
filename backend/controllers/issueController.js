import IssueModel from '../models/issueModel.js';

// Controller to CREATE a new issue
export const createIssueController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).send({ success: false, message: 'All fields are required.' });
        }

        const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const newIssue = new IssueModel({ userId, title, description, category, images: imagePaths });
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

// Controller to GET ALL issues (for officials only)
export const getIssuesController = async (req, res) => {
    try {
        // Role check to ensure only officials can access all issues
        if (req.user.role !== 'official') {
            return res.status(403).send({ 
                success: false, 
                message: 'Access Denied: You are not authorized to view this resource.' 
            });
        }

        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;
        const totalIssues = await IssueModel.countDocuments({});

        const issues = await IssueModel.find({})
            .populate('userId', 'name email') // Gets reporter's name and email
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        res.status(200).send({
            success: true,
            message: 'Issues fetched successfully',
            issues,
            page,
            pages: Math.ceil(totalIssues / limit),
            total: totalIssues,
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).send({ success: false, message: 'Error fetching issues.' });
    }
};

// Controller to GET issues for the logged-in user (for Profile Page)
export const getUserIssuesController = async (req, res) => {
    try {
        const issues = await IssueModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'User issues fetched successfully',
            issues,
        });
    } catch (error) {
        console.error("Error fetching user issues:", error);
        res.status(500).send({ success: false, message: 'Error fetching issues.' });
    }
};

// Controller to UPDATE an issue's status
export const updateIssueStatusController = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access denied.' });
        }
        const { id } = req.params;
        const { status } = req.body;
        if (!status || !['OPEN', 'IN PROGRESS', 'RESOLVED'].includes(status)) {
            return res.status(400).send({ success: false, message: 'Invalid status.' });
        }
        const updatedIssue = await IssueModel.findByIdAndUpdate(id, { status }, { new: true });
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

// Controller to DELETE an issue
export const deleteIssueController = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await IssueModel.findById(id);

        if (!issue) {
            return res.status(404).send({ success: false, message: 'Issue not found.' });
        }

        if (issue.userId.toString() !== req.user._id && req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access denied.' });
        }

        await issue.deleteOne();

        res.status(200).send({
            success: true,
            message: 'Issue deleted successfully!',
        });
    } catch (error) {
        console.error("Error deleting issue:", error);
        res.status(500).send({ success: false, message: 'Server error while deleting issue.' });
    }
};