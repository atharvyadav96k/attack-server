const mongoose = require('mongoose');

const fingerPrintSchema = new mongoose.Schema({
    fingerPrint: {
        type: String
    },
    alertEmails: [
        {
            type: String
        }
    ],
    heartBPM: {
        type: Number,
    },
    parameter: {
        sex: {
            type: Number,
            enum: [0, 1],
        },
        totalCholesterol: {
            type: Number,
        },
        age: {
            type: Number,
        },
        cigarettesPerDay: {
            type: Number,
        },
        bmi: {
            type: Number,
        },
        diabetes: {
            type: Number,
            enum: [0, 1], 
        }
    }
});

module.exports = mongoose.model('fingerprints', fingerPrintSchema);
