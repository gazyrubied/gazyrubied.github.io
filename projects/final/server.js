const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const upload = multer({ dest: __dirname + "/images" });

mongoose
  .connect("mongodb+srv://gazrubied2200:iiZail1e1be5Ngrv@cluster0.0xwqweg.mongodb.net/?retryWrites=true&w=majority", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Couldn't connect to MongoDB", error));

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  rated: String,
  released: String,
  runtime: String,
  plot: String,
  genre: String,
  director: String,
  actors: [String],
  image: String,
});

const Movie = mongoose.model("Movie", movieSchema);

app.get("/api/movies", async (req, res) => {
  getMovies(res);
});

const getMovies = async (res) => {
  const movies = await Movie.find();
  res.send(movies);
};

app.post("/api/movies", upload.single("img"), async (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    released: req.body.released,
    runtime: req.body.runtime,
    plot: req.body.plot,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
  });

  if (req.file) {
    movie.image = "images/" + req.file.filename;
  }

  createMovie(res, movie);
});

const createMovie = async (res, movie) => {
  const result = await movie.save();
  res.send(movie);
};

app.put("/api/movies/:id", upload.single("img"), async (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateMovie(req, res);
});

const updateMovie = async (req, res) => {
  let fieldsToUpdate = {
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    released: req.body.released,
    runtime: req.body.runtime,
    plot: req.body.plot,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
  };

  if (req.file) {
    fieldsToUpdate.image = "images/" + req.file.filename;
  }

  const result = await Movie.updateOne({ _id: req.params.id }, fieldsToUpdate);
  const updatedMovie = await Movie.findById(req.params.id);
  res.send(updatedMovie);
};

app.delete("/api/movies/:id", upload.single("img"), async (req, res) => {
  removeMovie(res, req.params.id);
});

const removeMovie = async (res, id) => {
  const movie = await Movie.findByIdAndDelete(id);
  res.send(movie);
};

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    year: Joi.string().required(),
    rated: Joi.string().required(),
    released: Joi.string().required(),
    runtime: Joi.string().required(),
    plot: Joi.string().required(),
    genre: Joi.string().required(),
    director: Joi.string().required(),
    actors: Joi.array().items(Joi.string()).required(),
  });

  return schema.validate(movie);
};

app.listen(3000, () => {
  console.log("I'm listening");
});
