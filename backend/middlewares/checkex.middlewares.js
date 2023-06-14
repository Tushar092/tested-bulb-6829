const UserModel = require("../models/user.models");

const existing = async (req, res, next) => {
    let {email} = req.body;
    let user = await UserModel.findOne({email});
    if(user) {
        res.status(200).json({msg: "User already exists."});
    }else{
        next();
    }
}

module.exports = existing;