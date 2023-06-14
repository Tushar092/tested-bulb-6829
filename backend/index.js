const express = require("express");
const connection = require("./mongo_db");
const userRoute = require("./routes/user.route");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.listen(`${process.env.port}`, async () => {
    try {
        await connection;
        console.log(`Application running on port ${process.env.port}`);
        console.log("Connection successfull to DB");
    } catch (error) {
        console.log(error.message);
    }
});