const express = require("express");
const connection = require("./mongo_db");
const userRouter = require("./routes/user.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(`${process.env.port}`, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
        console.log("Connected to DB successfully");
    } catch (error) {
        console.log(error.message);
    }
});