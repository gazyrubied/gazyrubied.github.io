const getMovies = async () => {
    const link = "https://gazyrubied.github.io/projects/part5/json/movies.json";

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
        const link = document.createElement('a');
        const image = document.createElement('img');
        const title = document.createElement('h2');

        link.href = 'review.html';
        image.src = movie.image;
        image.alt = `${movie.title} Movie Poster`;
        image.classList.add('movie-image');

        title.textContent = movie.title;

        link.appendChild(image);
        movieDiv.appendChild(title);
        movieDiv.appendChild(link);
        moviesContainer.appendChild(movieDiv);
    });
};

window.onload = displayMovies;
