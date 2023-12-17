const express = require("express");
const app = express();
const homeRouter = require("./routes/home");
const userRouter = require("./routes/auth/userRoute");
const env = require("dotenv");

env.config({ path: "./config.env" });

const dbUrls = process.env.dbUrl || "mongodb://127.0.0.1:27017/SocialMediaApp";

const mongoose = require("mongoose");
mongoose.connect(dbUrls, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter.router);
app.use("/user", userRouter.router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port is running on port : ${port}`);
});
