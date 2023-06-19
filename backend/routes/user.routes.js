const express = require("express");
const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const hash_pass = require("../middlewares/hash.middleware");
const jwt = require("jsonwebtoken");
const check = require("../middlewares/checkex.middleware");
const auth = require("../middlewares/auth.middleware");
const TokenModel = require("../models/token.models");

const userRouter = express.Router();

userRouter.post("/register", check, hash_pass, async (req, res) => {
    try {
        let new_user = new UserModel(req.body);
        await new_user.save();
        res.status(200).json({ msg: "New user has been registered" });
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
        try {
            bcrypt.compare(req.body.pass, user.pass, (err, result) => {
                if (err) {
                    res.status(200).json({ error: err.message });
                }
                console.log(user._id, user.name);
                jwt.sign({ id: user._id, name: user.name }, `${process.env.secret}`, { expiresIn: '7d' }, (err, token) => {
                    res.status(200).json({ msg: "Logged In!", tkn: token });
                });
            })
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    } else {
        res.status(200).json({ msg: "Signup before logging in" });
    }
});

userRouter.get("/logout", auth, async (req, res) => {
    let tkn = req.headers.authorization?.split(" ")[1];
    try {
        let token = new TokenModel({token: tkn});
        await token.save();
        res.status(200).json({msg: "Logged Out"});
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
});

module.exports = userRouter;