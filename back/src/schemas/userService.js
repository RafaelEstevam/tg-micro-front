const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    login: Boolean,
    online: Boolean,
    type: String,
    doc: String,
    connection_id: String,
    recieve_sms: Boolean,
    recieve_email: Boolean,
    recieve_call: Boolean,
    show_sensitive_data: Boolean,
    term_accept: Boolean,
    term_accept_version: Number,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Users', UserSchema);