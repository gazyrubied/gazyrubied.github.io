const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect("mongodb+srv://gazrubied2200:iiZail1e1be5Ngrv@cluster0.0xwqweg.mongodb.net/Reviews", {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Couldn't connect to MongoDB", error));

const reviewSchema = new mongoose.Schema({
  name: String,
  title: String,
  rating: Number,
  analysis: String,
  img: String,
});


const Review = mongoose.model("Reviews", reviewSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


const getReviews = async (res) => {
  const reviews = await Review.find();
  res.send(reviews);
};


app.get("/api/Reviews", (req, res) => {
  getReviews(res);
});

app.post("/api/Reviews", upload.single("img"), (req, res) => {
  const result = validateReview(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const review = new Review({
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    analysis: req.body.analysis,
  });

  if (req.file) {
    review.img = "images/" + req.file.filename;
  }

  createReview(res, review);
});

const createReview = async (res, review) => {
  const result = await review.save();
  res.send(review);
};

app.put("/api/Reviews/:id", upload.single("img"), async (req, res) => {
  const result = validateReview(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateReview(req, res);
});

const updateReview = async (req, res) => {
  let fieldsToUpdate = {
    name: req.body.name,
    title: req.body.title,
    rating: req.body.rating,
    analysis: req.body.analysis,
  };

  if (req.file) {
    fieldsToUpdate.img = "images/" + req.file.filename;
  }

  const result = await Review.updateOne({ _id: req.params.id }, fieldsToUpdate);
  const updatedReview = await Review.findById(req.params.id);
  res.send(updatedReview);
};

app.delete("/api/Reviews/:id", upload.single("img"), (req, res) => {
  removeReview(res, req.params.id);
});

const removeReview = async (res, id) => {
  const review = await Review.findByIdAndDelete(id);

  res.send(review);
};

const validateReview = (review) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    rating: Joi.number().min(3).required(),
    analysis: Joi.string().min(3).required(),
  });

  return schema.validate(review);
};

app.listen(3000, () => {
  console.log("I'm listening");
});