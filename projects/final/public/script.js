const getReview = async () => {
    try {
         return (await fetch("api/reviews/")).json();
    } catch (error) {

    }
};

const showReviews = async () => {
    let reviews = await getReviews();
    let reviewDiv = document.getElementById("review-list");
    console.log(reviews);

    h3 = document.createElement("h3");
    h3.innerHTML = review.name;
    section.append(h3);
}

windows
