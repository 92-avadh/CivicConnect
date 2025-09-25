import IssueModel from '../models/issueModel.js';
import birthCertificateModel from "../models/birthCertificateModel.js";
import deathCertificateModel from "../models/deathCertificateModel.js";
import waterConnectionModel from "../models/waterConnectionModel.js";


// Controller to CREATE a new issue
export const createIssueController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { location, description, category } = req.body;

        if (!location || !description || !category) {
            return res.status(400).send({ success: false, message: 'All fields are required.' });
        }

        const imagePaths = req.files ? `/uploads/${req.file.filename}` : null;

        const newIssue = new IssueModel({
            userId,
            location,
            description,
            category,
            images: imagePaths,
            status: "OPEN"
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

// Controller to GET ALL issues
export const getIssuesController = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const issues = await IssueModel.find({})
            .populate('userId', 'firstName lastName')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await IssueModel.countDocuments();
        res.status(200).send({
            success: true,
            issues,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).send({ success: false, message: 'Server error while fetching issues.' });
    }
};

// Controller to UPDATE an issue's status
export const updateIssueStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

        if (!validStatuses.includes(status)) {
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


//--- GET ALL STATS FOR DASHBOARD (Corrected Version) ---
export const getStatsController = async (req, res) => {
  try {
    const totalIssues = await IssueModel.countDocuments();
    // 👇 This status has been corrected from "Pending" to "OPEN"
    const pendingIssues = await IssueModel.countDocuments({ status: "OPEN" });
    const birthApps = await birthCertificateModel.countDocuments();
    const deathApps = await deathCertificateModel.countDocuments();
    const waterApps = await waterConnectionModel.countDocuments();

    res.status(200).json({
        totalIssues,
        pendingIssues,
        totalApplications: birthApps + deathApps + waterApps,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
};