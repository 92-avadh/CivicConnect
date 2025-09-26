import mongoose from 'mongoose';
import BirthCertificateModel from '../models/birthCertificateModel.js';

export const editBirthCertificate = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ success: false, message: 'Invalid Application ID format.' });
        }

        const application = await BirthCertificateModel.findById(req.params.id);
        if (!application) return res.status(404).send({ success: false, message: 'Application not found.' });
        if (application.applicantId.toString() !== req.user._id) return res.status(403).send({ success: false, message: 'Not authorized.' });
        if (application.status !== 'SUBMITTED') return res.status(400).send({ success: false, message: 'Application cannot be edited.' });

        const { childsFullName, hospitalOfBirth, mothersFullName } = req.body;
        const changes = [];

        if (application.childsFullName !== childsFullName) changes.push({ field: 'Child\'s Full Name', oldValue: application.childsFullName, newValue: childsFullName });
        if (application.hospitalOfBirth !== hospitalOfBirth) changes.push({ field: 'Hospital of Birth', oldValue: application.hospitalOfBirth, newValue: hospitalOfBirth });
        if (application.mothersFullName !== mothersFullName) changes.push({ field: 'Mother\'s Full Name', oldValue: application.mothersFullName, newValue: mothersFullName });

        if (changes.length > 0) {
            application.childsFullName = childsFullName;
            application.hospitalOfBirth = hospitalOfBirth;
            application.mothersFullName = mothersFullName;
            application.hasUnreadUpdate = true;
            
            await application.save();

            const editHistory = new EditHistoryModel({
                applicationId: application._id,
                applicationNumber: application.applicationNumber,
                applicationType: 'Birth Certificate',
                changes: changes,
            });
            await editHistory.save();
        }

        res.status(200).send({ success: true, message: 'Application updated successfully.' });

    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error while updating application.' });
    }
};

export const applyForBirthCertificate = async (req, res) => {
    try {
        const applicationData = { ...req.body, applicantId: req.user._id };
        const newApplication = new BirthCertificateModel(applicationData);
        await newApplication.save();

        res.status(201).send({
            success: true,
            message: `Application submitted successfully! Your Application ID is: ${newApplication.applicationNumber}`,
            applicationNumber: newApplication.applicationNumber
        });
    } catch (error) {
        console.error("Error applying for birth certificate:", error);
        res.status(500).send({ success: false, message: 'Server error while submitting application.' });
    }
};
export const getUserBirthCertificates = async (req, res) => {
    try {
        const applications = await BirthCertificateModel.find({ applicantId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, applications });
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).send({ success: false, message: 'Error fetching applications.' });
    }
};

export const getAllBirthCertificates = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const applications = await BirthCertificateModel.find({}).populate('applicantId', 'firstName lastName email').sort({ createdAt: -1 });
        res.status(200).send({ success: true, applications });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};

export const updateBirthCertificateStatus = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const { status } = req.body;
        const application = await BirthCertificateModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) {
            return res.status(404).send({ success: false, message: 'Application not found.' });
        }
        res.status(200).send({ success: true, application });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};

export const deleteBirthCertificate = async (req, res) => {
    try {
        if (req.user.role !== 'official') {
            return res.status(403).send({ success: false, message: 'Access Denied.' });
        }
        const application = await BirthCertificateModel.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).send({ success: false, message: 'Application not found.' });
        }
        res.status(200).send({ success: true, message: 'Application deleted successfully.' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error.' });
    }
};