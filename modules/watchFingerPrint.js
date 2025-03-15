const mongoose = require('mongoose');

const fingerPrint = new mongoose.Schema({
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
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        bloodPressure: {
            type: Number,
            required: true
        },
        cholesterol: {
            type: Number,
            required: true
        },
        bloodSugar: {
            type: Number,
            required: true
        },
        smoking: {
            type: Boolean,
            required: true
        },
        alcohol: {
            type: Boolean,
            required: true
        },
        activity: {
            type: String,
            enum: ['Low', 'Moderate', 'High'],
            required: true
        },
        diet: {
            type: String,
            enum: ['Healthy', 'Average', 'Unhealthy'],
            required: true
        },
        history: {
            type: Boolean,
            required: true
        }
    }
});

module.exports = mongoose.model('fingerprints', fingerPrint);
