const getMovies = async () => {
    const link = "https://gazyrubied.github.io/json/movies.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const showMovieInfo = async () => {
    const moviesData = await getMovies();
    const movieSelect = document.getElementById('movie-select');

    moviesData.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.title;
        option.textContent = movie.title;
        movieSelect.appendChild(option);
    });

    movieSelect.addEventListener('change', async event => {
        const selectedMovieTitle = event.target.value;
        await displaySelectedMovieInfo(selectedMovieTitle, moviesData);
    });
};

const displaySelectedMovieInfo = async (selectedMovieTitle, movies) => {
    const selectedMovieTitleElement = document.getElementById('selected-movie-title');
    const selectedMovieImageElement = document.getElementById('selected-movie-image');
    const selectedMovieDescriptionElement = document.getElementById('selected-movie-description');

    const selectedMovie = movies.find(movie => movie.title === selectedMovieTitle);

    if (selectedMovie) {
        selectedMovieTitleElement.textContent = selectedMovie.title;
        selectedMovieImageElement.src = selectedMovie.image;
        selectedMovieDescriptionElement.textContent = selectedMovie.description;
    } else {
        selectedMovieTitleElement.textContent = "No movie selected";
        selectedMovieImageElement.src = "";
        selectedMovieDescriptionElement.textContent = "";
    }
};

window.onload = showMovieInfo();
