const mongoose = require('mongoose');

const fingerPrint = new mongoose.Schema({
    fingerPrint: {
        type: String,
        required : true
    },
    alertEmails : [
        {
            type: String
        }
    ],
    heartBPM : {
        type: Number
    }
});

module.exports = mongoose.model('fingerprints', fingerPrint);