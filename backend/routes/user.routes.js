const express = require("express");
const checkex = require("../middlewares/checkex.middleware");
const hash = require("../middlewares/hash.middlewares");
const UserModel = require("../models/user.models");

const userRoute = express.Router();

userRoute.post("/register", checkex, hash, async (req, res) => {
    try {
        let new_user = new UserModel(req.body);
        await new_user.save();
        res.status(200).json("New User has been Created");
    } catch (error) {
        res.status(400).json({err: error.message});
    }
});

userRoute.post("/Login", (req, res) => {

});

userRoute.post("/Logout", (req, res) => {

});

module.exports = userRoute;