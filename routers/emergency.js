const express = require('express');
const egRouter = express.Router();
const fingerPrint = require('../modules/watchFingerPrint');
const {getAddressFromCoordinates, generateGoogleMapsLink} = require('../services/location.service');
const sendMail = require('../services/mail.service');

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

egRouter.post('/alert', async (req, res) => {
    try {
        const { fPrint } = req.body;

        if (!fPrint) {
            return res.status(400).json({ message: "Fingerprint is required", success: false });
        }

        const fingerDetails = await fingerPrint.findOne({ fingerPrint: fPrint });
        console.log(fingerDetails)
        if (!fingerDetails) {
            return res.status(404).json({ message: "Fingerprint not found", success: false });
        }

        const link = `<a href="${generateGoogleMapsLink(fingerDetails.loc.lat, fingerDetails.loc.long)}">See location in Map</a>`;

        let address = await getAddressFromCoordinates(fingerDetails.loc.lat, fingerDetails.loc.long);

        let response = `<h1>Your relative is in <b>Emergency</b></h1><p>Address: ${address}</p><br>${link}`;

        if (!Array.isArray(fingerDetails.alertEmails)) {
            return res.status(500).json({ message: "Invalid email list", success: false });
        }

        const validEmails = fingerDetails.alertEmails.filter(isValidEmail);
        validEmails.forEach((email) => sendMail(email, response));

        return res.status(200).json({
            message: "Alert Successful",
            success: true
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            message: "Failed to send Alert",
            success: false
        });
    }
});


egRouter.post('/cardio', async (req, res) => {
    try {
        const { fPrint } = req.body;

        if (!fPrint) {
            return res.status(400).json({ message: "Fingerprint is required", success: false });
        }

        const fingerDetails = await fingerPrint.findOne({ fingerPrint: fPrint });
        console.log(fingerDetails)
        if (!fingerDetails) {
            return res.status(404).json({ message: "Fingerprint not found", success: false });
        }

        const link = `<a href="${generateGoogleMapsLink(fingerDetails.loc.lat, fingerDetails.loc.long)}">See location in Map</a>`;

        let address = await getAddressFromCoordinates(fingerDetails.loc.lat, fingerDetails.loc.long);

        let response = `<h1>Your relative is in <b>Emergency</b></h1><p>Address: ${address}</p><br>${link}`;

        if (!Array.isArray(fingerDetails.alertEmails)) {
            return res.status(500).json({ message: "Invalid email list", success: false });
        }

        const validEmails = fingerDetails.alertEmails.filter(isValidEmail);
        validEmails.forEach((email) => sendMail(email, response));

        return res.status(200).json({
            message: "Alert Successful",
            success: true
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            message: "Failed to send Alert",
            success: false
        });
    }
});

module.exports = egRouter;