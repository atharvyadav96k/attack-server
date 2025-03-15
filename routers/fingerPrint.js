const fingerPrint = require('../modules/watchFingerPrint');
const express = require('express');
const fpRouter = express.Router();

fpRouter.get('/new', async (req, res)=>{
    try{
        const d = new Date();
        const fPrint = `${d.getTime()}`;
        const fp = new fingerPrint({
            fingerPrint : fPrint
        });
        await fp.save();
        return res.status(200).json({
            fingerPrint: fPrint,
            success: true,
            message: "Finger Print Created Successfully"
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to create finger print "+err.message
        })
    }
});

fpRouter.post('/addMails', async (req, res)=>{
    try{
        const {email1, email2, email3, fPrint} = req.body;
        console.log(email1, email2, email3);
        const fp = await fingerPrint.findOne({fingerPrint: fPrint});
        fp.alertEmails.push(email1);
        fp.alertEmails.push(email2);
        fp.alertEmails.push(email3);
        await fp.save();
        return res.status(200).json({
            message: "Mails added successfully",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            message: "There is problem while adding mails",
            success: false
        })
    }
});
module.exports = fpRouter;