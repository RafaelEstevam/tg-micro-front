const mongoose = require('mongoose');

const HistoricSchema = new mongoose.Schema({
    user_id: String,
    term_accept_version: Number,
    term_accept: Boolean,
    conditions_accept: Array,
    created_at: Date
});
                                
module.exports = mongoose.model('Historic', HistoricSchema);