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
            required: true
        },
        totalCholesterol: {
            type: Number,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        cigarettesPerDay: {
            type: Number,
            required: true
        },
        bmi: {
            type: Number,
            required: true
        },
        diabetes: {
            type: Number,
            enum: [0, 1], // 0 for No, 1 for Yes
            required: true
        }
    }
});

module.exports = mongoose.model('fingerprints', fingerPrintSchema);
