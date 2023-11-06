const getMovies = async () => {
    const link = "https://portiaportia.github.io/json/movies.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch(error) {
        console.log(error);
    }
};

const showMovies = async () => {
    let movies = await getMovies();
    let moviesContainer = document.querySelector(".movies-container");

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const img = document.createElement('img');
        img.src = `https://portiaportia.github.io/json/${movie.img}`;
        img.alt = movie.title;
        movieDiv.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = movie.title;
        movieDiv.appendChild(title);

        const director = document.createElement('p');
        director.textContent = `Director: ${movie.director}`;
        movieDiv.appendChild(director);

        const actors = document.createElement('p');
        actors.textContent = `Actors: ${movie.actors}`;
        movieDiv.appendChild(actors);

        const genres = document.createElement('p');
        genres.textContent = `Genres: ${movie.genres}`;
        movieDiv.appendChild(genres);

        const year = document.createElement('p');
        year.textContent = `Year Released: ${movie.year}`;
        movieDiv.appendChild(year);

        const description = document.createElement('p');
        description.textContent = ` ${movie.description}`; 
        movieDiv.appendChild(description);


        moviesContainer.appendChild(movieDiv);
    });
};

window.onload = showMovies;
