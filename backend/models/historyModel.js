const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    response: { type: String, required: true },
    query: { type: String, required: true },
    nlp_end: { type: Date, default: Date.now },
    nlp_start: { type: Date },
    request_ret: { type: Date },
    request_in: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);