import mongoose from 'mongoose';
import WaterConnectionModel from '../models/waterConnectionModel.js';

export const applyForWaterConnection = async (req, res) => {
    try {
        const applicationData = { ...req.body, applicantId: req.user._id };
        if (req.file) {
            applicationData.addressProof = `/uploads/${req.file.filename}`;
        }
        const newApplication = new WaterConnectionModel(applicationData);
        await newApplication.save();
        
        res.status(201).send({
            success: true,
            message: `Application submitted successfully! Your Application ID is: ${newApplication.applicationNumber}`,
            applicationNumber: newApplication.applicationNumber
        });
    } catch (error) {
        console.error("Error applying for water connection:", error);
        res.status(500).send({ success: false, message: 'Server error while submitting application.' });
    }
};

export const editWaterConnection = async (req, res) => {
    try {
        // 👇 ADDED: Validate the ID format to prevent crashes
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ success: false, message: 'Invalid Application ID format.' });
        }

        const application = await WaterConnectionModel.findById(req.params.id);
        if (!application) {
            return res.status(404).send({ success: false, message: 'Application not found.' });
        }
        if (application.applicantId.toString() !== req.user._id) {
            return res.status(403).send({ success: false, message: 'Not authorized to edit this application.' });
        }
        if (application.status !== 'SUBMITTED') {
            return res.status(400).send({ success: false, message: 'Application is under review and cannot be edited.' });
        }

        const { applicantName, propertyAddress } = req.body;
        application.applicantName = applicantName;
        application.propertyAddress = propertyAddress;

        if (req.file) {
            application.addressProof = `/uploads/${req.file.filename}`;
        }

        await application.save();
        res.status(200).send({ success: true, message: 'Application updated successfully.' });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error while updating application.' });
    }
};

// ... (rest of the functions remain the same)
export const getUserWaterConnections = async (req, res) => {
    try {
        const applications = await WaterConnectionModel.find({ applicantId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, applications });
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).send({ success: false, message: 'Error fetching applications.' });
    }
};

export const getAllWaterConnections = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const applications = await WaterConnectionModel.find({})
            .populate('applicantId', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.status(200).send({ success: true, applications });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};

export const updateWaterConnectionStatus = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const { status } = req.body;
        const application = await WaterConnectionModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) {
            return res.status(404).send({ success: false, message: 'Application not found.' });
        }
        res.status(200).send({ success: true, application });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};

export const deleteWaterConnection = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const application = await WaterConnectionModel.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).send({ success: false, message: 'Application not found.' });
        }
        res.status(200).send({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};