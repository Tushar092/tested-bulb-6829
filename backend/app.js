const express = require("express");
const connection = require("./mongo_db");

const app = express();
app.use(express.json());

app.listen(`${process.env.port}`, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
        console.log("Connected to DB successfully");
    } catch (error) {
        console.log(error.message);
    }
})