const express = require('express');
const bpmRouter = express.Router();
const watchFp = require('../modules/watchFingerPrint');

bpmRouter.post('/', async (req,res)=>{
    try{
        const {fPrint, bpm} = req.body;
        const fp = await watchFp.findOne({fingerPrint: fPrint});
        fp.heartBPM = bpm;
        await fp.save();
        res.status(200).json({
            message: "saved successfully",
            success: true
        });
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "failed to save",
            success: false
        })
    }
});

bpmRouter.get('/', async (req, res)=>{
    try{
        const {fPrint} = req.body;
        const fp = await watchFp.findOne({fingerPrint: fPrint}).select("-alertEmails");
        res.status(200).json({
            message: "current heartbeat",
            heartBPM : fp.heartBPM,
            success: true
        });
    }catch(err){
        res.status(500).json({
            message: "something went wrong",
            success: false
        })
    }
})
module.exports = bpmRouter;