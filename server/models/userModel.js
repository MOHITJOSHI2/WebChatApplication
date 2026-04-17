const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true, unique: true },
    Age: { type: Number, required: true },
    Password: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)