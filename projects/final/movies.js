const getMovies = async () => {
    const link = "https://gazyrubied.github.io/projects/final/json/movies.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = (movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movies");

    const img = document.createElement('img');
    img.src = movie.image;
    img.classList.add('movie-image');
    movieDiv.appendChild(img);

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');

    const title = document.createElement('h3');
    title.textContent = movie.Title;
    titleContainer.appendChild(title);

    movieDiv.appendChild(titleContainer);

    return movieDiv;
};


const newMovie = async () => {
    let latest = await getMovies();
    let movieSection = document.getElementById("new-movies-container");

    latest.forEach(movie => {
        const movieDiv = getMovieInfo(movie);
        movieSection.appendChild(movieDiv);

        // Add click event listener for each movie image
        const image = movieDiv.querySelector('.movie-image');
        image.addEventListener('click', () => {
            // Show modal and display movie information
            showModal(movie.title, movie.Director, movie.Actors, movie.Year, movie.Rated, movie.Runtime);
        });
    });
};

const filterMoviesByGenre = async () => {
    const genreSelect = document.getElementById('genre-select');
    const selectedGenre = genreSelect.value.toLowerCase();

    let movies = await getMovies();

    if (selectedGenre !== 'all') {
        movies = movies.filter(movie => {
            const genres = movie.Genre.split(',').map(genre => genre.trim().toLowerCase());
            return genres.includes(selectedGenre);
        });
    }

    // Clear existing movies in the relevant container
    const movieContainer = document.getElementById('new-movies-container');
    movieContainer.innerHTML = '';

    // Display filtered movies in the relevant container
    movies.forEach(movie => movieContainer.appendChild(getMovieInfo(movie)));
};

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

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};

document.addEventListener('DOMContentLoaded', async () => {
    // Populate movies on page load
    await newMovie();

    // Add event listener for genre filtering
    const genreSelect = document.getElementById('genre-select');
    genreSelect.addEventListener('change', filterMoviesByGenre);
});
