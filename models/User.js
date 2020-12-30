const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    discordUser: { type: String, required: true },
    steam64: { type: String, required: true },
    steamLibrary: { type: Object, required: false }
})

module.exports = mongoose.model('User', userSchema)