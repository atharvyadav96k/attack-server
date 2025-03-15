const express = require('express');
const par = express.Router();
const FingerPrint = require('../modules/watchFingerPrint'); // Import your Mongoose model

par.post('/:fPrint', async (req, res) => {
    try {
        const { fPrint } = req.params;
        const {
            sex,
            totalCholesterol,
            age,             
            cigarettesPerDay, 
            bmi,            
            diabetes  
        } = req.body;

        const updatedEntry = await FingerPrint.findOneAndUpdate(
            { fingerPrint: fPrint },
            { 
                $set: { 
                    parameter: {
                        sex,
                        totalCholesterol,
                        age,
                        cigarettesPerDay,
                        bmi,
                        diabetes
                    }
                }
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Parameters updated successfully", data: updatedEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = par;
