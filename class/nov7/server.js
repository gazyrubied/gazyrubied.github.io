const express = require("express");
const app = express();
const joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images"});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})


app.listen(3000, () => {
    console.log("I'm listenging");
})
