const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
const upload = multer({ dest: __dirname + "/public/images/activities" });

app.listen(3000, () => {
  console.log("Listening");
});

mongoose
    .connect(

    )
    .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log("Couldn't connect to MongoDB", error);
      });

const reviewSchema = new mongoose.Schema({
name: String,
actor: String,



});