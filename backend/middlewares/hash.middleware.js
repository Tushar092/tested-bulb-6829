const bcrypt = require("bcrypt");

const hash_pass = (req, res, next) => {
    try {
        console.log("hashing")
        bcrypt.hash(req.body.pass, 4, (err, hash) => {
            if (err) {
                res.status(200).json({ error: err.message });
            }
            req.body.pass = hash;
            next();
        });
    } catch (error) {
        res.status(400).json({ err: error.message });
    }
    // next();
}

module.exports = hash_pass;