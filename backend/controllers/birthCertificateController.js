import BirthCertificateModel from '../models/birthCertificateModel.js';

// --- For Citizens ---

// @desc    Apply for a new Birth Certificate
// @route   POST /api/birth-certificates/apply
export const applyForBirthCertificate = async (req, res) => {
    try {
        const applicationData = { ...req.body, applicantId: req.user._id };
        const newApplication = new BirthCertificateModel(applicationData);
        await newApplication.save();

        res.status(201).send({
            success: true,
            message: 'Application submitted successfully!',
            applicationNumber: newApplication.applicationNumber
        });
    } catch (error) {
        console.error("Error applying for birth certificate:", error);
        res.status(500).send({ success: false, message: 'Server error while submitting application.' });
    }
};

// @desc    Get all of the user's birth certificate applications
export const getUserBirthCertificates = async (req, res) => {
    try {
        const applications = await BirthCertificateModel.find({ applicantId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, applications });
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).send({ success: false, message: 'Error fetching applications.' });
    }
};

// --- For Officials ---

// @desc    Get all birth certificate applications (officials only)
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

// @desc    Update a birth certificate application status (officials only)
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