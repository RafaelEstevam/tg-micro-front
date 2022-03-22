const mongoose = require('mongoose');

const TalkSchema = new mongoose.Schema({
    to_id: String,
    from_id: String,
    text: String,
    created_at: Date,
});

module.exports = mongoose.model('Talk', TalkSchema);