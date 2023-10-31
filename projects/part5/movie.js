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
    const moviesData = await getMovies();

    moviesData.forEach(movie => {
        const movieDiv = document.createElement('div');
        const title = document.createElement('h2');
        const director = document.createElement('p');
        const castList = document.createElement('ul');
        const image = document.createElement('img');

        title.textContent = movie.title;
        director.textContent = "Director: " + movie.director;

        movie.cast.forEach(actor => {
            const castMember = document.createElement('li');
            castMember.textContent = actor;
            castList.appendChild(castMember);
        });

        image.src = movie.image;
        image.alt = `${movie.title} Movie Poster`;

        movieDiv.appendChild(title);
        movieDiv.appendChild(director);
        movieDiv.appendChild(castList);
        movieDiv.appendChild(image);
        
        moviesContainer.appendChild(movieDiv);
    });
};

window.onload = displayMovies;