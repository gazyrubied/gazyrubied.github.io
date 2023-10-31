const getMovies = async () => {
    const link = "https://gazyrubied.github.io/json/review.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch(error) {
        console.log(error);
    }
};

    const newMovies = moviesData.filter(movie => movie.year === 2023);

    const newMoviesContainer = document.getElementById('new-movies');

    newMovies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('new-image');

        const movieLink = document.createElement('a');
        movieLink.href = "review.html"; 

        const movieImage = document.createElement('img');
        movieImage.src = `https://gazyrubied.github.io/json/$movie.img`;
        movieImage.alt = `${movie.title} Movie Poster`;
        movieImage.classList.add('movie-image');

        movieLink.appendChild(movieImage);
        movieDiv.appendChild(movieLink);
        newMoviesContainer.appendChild(movieDiv);
    });
;
