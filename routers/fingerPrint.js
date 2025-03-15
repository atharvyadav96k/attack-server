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

fpRouter.post('/addMails', async (req, res) => {
    try {
        const { email1, email2, email3, fPrint } = req.body;
        console.log(email1, email2, email3);
        
        const fp = await fingerPrint.findOne({ fingerPrint: fPrint });
        if (!fp) {
            return res.status(404).json({
                message: "Fingerprint not found",
                success: false
            });
        }
        
        fp.alertEmails = [email1, email2, email3];
        
        await fp.save();
        return res.status(200).json({
            message: "Mails updated successfully",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "There is a problem while updating mails",
            success: false
        });
    }
});
module.exports = fpRouter;