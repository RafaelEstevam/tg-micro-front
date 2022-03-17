const mongoose = require('mongoose');

const TermSchema = new mongoose.Schema({
    term_version: Number,
    term_name: String,
    // active: Boolean,
    start_date: Date
});
                                
module.exports = mongoose.model('Term', TermSchema);