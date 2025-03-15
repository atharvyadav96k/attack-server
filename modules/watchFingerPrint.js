const mongoose = require('mongoose');

const fingerPrintSchema = new mongoose.Schema({
    fingerPrint: {
        type: String,
        required: true
    },
    alertEmails: [
        {
            type: String
        }
    ],
    heartBPM: {
        type: Number,
        required: true
    },
    parameter: {
        sex: {
            type: Number,
            enum: [1, 2],
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
