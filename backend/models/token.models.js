const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userID: String,
    token: String
}, {
    versionKey: false
});

const TokenModel = mongoose.model("token", tokenSchema);

module.exports = TokenModel;