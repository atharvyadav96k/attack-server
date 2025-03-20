const express = require('express');
const egRouter = express.Router();
const fingerPrint = require('../modules/watchFingerPrint');
const {getAddressFromCoordinates, generateGoogleMapsLink} = require('../services/location.service');
const sendMail = require('../services/mail.service');

egRouter.post('/alert', async (req, res)=>{
    try{
        const {fPrint} = req.body;
        const fingerDetails = await fingerPrint.findOne({fingerPrint: fPrint});
        console.log(fingerDetails)
        // Create HyperLink
        const link = `<a href="${generateGoogleMapsLink(fingerDetails.loc.lat, fingerDetails.loc.long)}">See location in Map</a>`
        // get local address
        let response = await getAddressFromCoordinates(fingerDetails.loc.lat, fingerDetails.loc.long);
        // message to send
        response += `<h1>Your relative is in <b>Emergency</b></h1><p>Address: ${response}</p><br>${link}`;

        fingerDetails.alertEmails.forEach((email)=>{
            sendMail(email, response);
        })

        return res.status(200).json({
            message: "Alert Successful",
            success: true
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: "Failed to send Alert",
            success: false
        })
    }
});
egRouter.post('/cardio', async (req, res)=>{
    try{
        const {fPrint} = req.body;
        const fingerDetails = await fingerPrint.findOne({fingerPrint: fPrint});
        console.log(fingerDetails)
        // Create HyperLink
        const link = `<a href="${generateGoogleMapsLink(fingerDetails.loc.lat, fingerDetails.loc.long)}">See location in Map</a>`
        // get local address
        let response = await getAddressFromCoordinates(fingerDetails.loc.lat, fingerDetails.loc.long);
        // message to send
        response += `<h1>Your relative is in <b>Emergency</b><br>He is having cardiovascular disease<br></h1><p>Address: ${response}</p><br>${link}`;

        fingerDetails.alertEmails.forEach((email)=>{
            sendMail(email, response);
        })

        return res.status(200).json({
            message: "Alert Successful",
            success: true
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: "Failed to send Alert",
            success: false
        })
    }
})
module.exports = egRouter;