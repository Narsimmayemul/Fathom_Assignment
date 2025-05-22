const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    IMO: { type: String, required: true },
    flag: { type: String, required: true },
    type: { type: String, required: true },
    built: { type: Number, required: true }
});

const Ship = mongoose.model('Ship', shipSchema);
module.exports = Ship;
