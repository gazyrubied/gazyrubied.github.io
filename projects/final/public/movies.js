const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://gazrubied2200:iiZail1e1be5Ngrv@cluster0.0xwqweg.mongodb.net/Reviews", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

const newReview = async () => {
  const review = new Review({
    name: 'Mike',
    title: 'Avengers',
    rating: '6',
    analysis: 'Amazing movie',
  }
  );

  try {
    const result = await review.save();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

// Call the function
newReview();