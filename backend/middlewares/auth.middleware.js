const mongoose = require("mongoose");
const TokenModel = require("../models/token.models");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            let bltoken = await TokenModel.findOne({ tkn: token });
            if (bltoken) {
                res.status(200).json({ msg: "Please login again" });
            } else {
                jwt.verify(token, `${process.env.secret}`, (err, decoded) => {
                    if (err) {
                        res.status(200).json({ error: err.message });
                    }
                    req.body.userID = decoded.id;
                    req.body.user = decoded.name;
                    console.log(req.body);
                    next();
                });
            }
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    } else {
        res.status(200).json({ msg: "Please login first" });
    }
}
module.exports = auth;