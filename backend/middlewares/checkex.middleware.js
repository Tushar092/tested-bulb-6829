const express = require("express");
const UserModel = require("../models/user.models");

const check = async (req, res, next) => {
    let {email} = req.body;
    try {
        let user = await UserModel.findOne({email});
        console.log(user);
        if(user) {
            res.status(200).json({msg: "User already exists"});
        }else{
            next();
        }
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

module.exports = check;