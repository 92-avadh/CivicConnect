import mongoose from 'mongoose';
import IssueModel from '../models/issueModel.js';
import BirthCertificateModel from '../models/birthCertificateModel.js';
import DeathCertificateModel from '../models/deathCertificateModel.js';
import WaterConnectionModel from '../models/waterConnectionModel.js';

export const trackApplicationController = async (req, res) => {
    try {
        const id = req.params.id.trim();
        let result = null;
        let type = '';

        if (!result) {
            const birthCert = await BirthCertificateModel.findOne({ applicationNumber: id });
            if (birthCert) {
                result = birthCert;
                type = 'Birth Certificate';
            }
        }

        if (!result) {
            const deathCert = await DeathCertificateModel.findOne({ applicationNumber: id });
            if (deathCert) {
                result = deathCert;
                type = 'Death Certificate';
            }
        }
        
        if (!result) {
            const waterConn = await WaterConnectionModel.findOne({ applicationNumber: id });
            if (waterConn) {
                result = waterConn;
                type = 'Water Connection';
            }
        }
        
        if (!result) {
             const issue = await IssueModel.findOne({_id: id});
            if(issue){
                result = issue;
                type = 'Civic Issue'
            }
        }

        if (!result) {
            return res.status(404).send({ success: false, message: 'Application not found' });
        }

        res.status(200).send({ success: true, application: result, type: type });

    } catch (error) {
        console.error("Error in track controller:", error);
        res.status(500).send({ success: false, message: 'An error occurred on the server.' });
    }
};