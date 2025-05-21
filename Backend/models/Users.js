const mongoose = require('mongoose');
require('dotenv').config();

// console.log(process.env.MONGO_URL+"hello");

// mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
