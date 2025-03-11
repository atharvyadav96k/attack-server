const express = require('express');
const bpmRouter = express.Router();
const watchFp = require('../modules/watchFingerPrint');

bpmRouter.post('/:fPrint', async (req, res) => {
    try {
      const { fPrint } = req.params; // Extract fPrint from the route parameter
      const { bpm } = req.body;     // Extract bpm from the request body
  
      console.log(bpm, fPrint);
  
      // Find the document with the given fingerprint
      const fp = await watchFp.findOne({ fingerPrint: fPrint });
  
      if (!fp) {
        // Handle the case where the fingerprint is not found
        return res.status(404).json({
          message: "Fingerprint not found",
          success: false,
        });
      }
  
      // Update the heartBPM field
      fp.heartBPM = bpm;
      await fp.save();
  
      res.status(200).json({
        message: "Saved successfully",
        success: true,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Failed to save",
        success: false,
      });
    }
});

bpmRouter.get('/:fPrint', async (req, res)=>{
    try{
        const {fPrint} = req.params;
        console.log(fPrint)
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