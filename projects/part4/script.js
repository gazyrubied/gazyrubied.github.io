const submitReview = (e) => {
    e.preventDefault();
    const form = document.getElementById("review-form");
    const title = document.getElementById("review-title").value;
    const rating = document.getElementById("movie-rating").value;
    const reviewText = document.getElementById("movie-review-text").value;
    const tags = document.getElementById("movie-tags").value;

    console.log(title);
    console.log(rating);
    console.log(reviewText);
    console.log(tags);
  
    const successMessage = `Review Submitted: Title - ${title}, Rating - ${rating}, Review - ${reviewText}, Tags - ${tags}`;
    document.getElementById("review-content").textContent = successMessage; 
    document.getElementById("success").style.display = "block"; 
};

document.getElementById("review-form").onsubmit = submitReview;
