document.getElementById("review-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const successContainer = document.getElementById("success");
    const reviewContent = document.getElementById("review-content");

    const title = document.getElementById("review-title").value;
    const rating = document.getElementById("movie-rating").value;
    const reviewText = document.getElementById("movie-review-text").value;
    const tags = document.getElementById("movie-tags").value;

    const successMessage = `
    Title: ${title}
    Rating: ${rating}
    Review: ${reviewText}
    Tags: ${tags}
    `;

    reviewContent.textContent = successMessage;
    successContainer.classList.remove("hidden");
});

document.getElementById("submit-button").addEventListener("click", function () {
    document.getElementById("review-form").submit();
});


