const getMovies = async () => {
    const link = "https://gazyrubied.github.io/projects/final/json/movies.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const displayMovies = async () => {
    const moviesContainer = document.getElementById('movies-container');
    const movies = await getMovies();

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-info');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const title = movie.title;
        const director = movie.Director;
        const cast = movie.Actors;
        const year = movie.Year;
        const rated = movie.Rated;
        const runtime = movie.Runtime;

        link.href = '#'; 
        image.src = movie.image;
        image.alt = `${movie.title} Movie Poster`;
        image.classList.add('movie-image');

        link.appendChild(image);
        movieDiv.appendChild(link);
        moviesContainer.appendChild(movieDiv);

        // Add click event listener for each movie image
        image.addEventListener('click', () => {
            // Show modal and display movie information
            showModal(title, director, cast, year, rated, runtime);
        });
    });
};

// Function to show the modal and display movie information
const showModal = (title, director, cast, year, rated, runtime) => {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-content');

    // Clear previous content
    modalContent.innerHTML = '';

    // Create elements to display in the modal
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const directorElement = document.createElement('p');
    directorElement.textContent = `Director: ${director}`;

    const castElement = document.createElement('p');
    castElement.textContent = `Cast: ${cast}`;

    const yearElement = document.createElement('p');
    yearElement.textContent = `Year: ${year}`;

    const ratedElement = document.createElement('p');
    ratedElement.textContent = `Rated: ${rated}`;

    const runtimeElement = document.createElement('p');
    runtimeElement.textContent = `Runtime: ${runtime}`;

    // Append elements to modal content
    modalContent.appendChild(titleElement);
    modalContent.appendChild(directorElement);
    modalContent.appendChild(castElement);
    modalContent.appendChild(yearElement);
    modalContent.appendChild(ratedElement);
    modalContent.appendChild(runtimeElement);

    // Create a button element
    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Write a Review';
    reviewButton.classList.add('review-button');

    // Add an event listener to the button for navigation
    reviewButton.addEventListener('click', () => {
        // Redirect to the review page or any other desired page
        window.location.href = 'review.html'; // Change 'review.html' to your desired page
    });

    // Append the button to the modal content
    modalContent.appendChild(reviewButton);

    // Display the modal
    modal.style.display = 'block';

    // Close the modal when the 'x' is clicked
    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    const submitReviewButton = document.getElementById('submitReview');
    submitReviewButton.addEventListener('click', () => {
        const reviewTitle = document.getElementById('reviewTitle').value;
        const reviewContent = document.getElementById('reviewContent').value;

        // Handle the review submission here

        // Optionally, close the modal or reset the form after submission
        // modal.style.display = 'none';
        // document.getElementById('reviewForm').reset();
    });

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};

window.onload = displayMovies;
