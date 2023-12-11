const getMovies = async () => {
    const link = "https://gazyrubied.github.io/projects/final/json/movie.json";

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
    title.textContent = movie.title;
    titleContainer.appendChild(title);

    movieDiv.appendChild(titleContainer);

  
    img.addEventListener('click', () => {
        showModal(movie.title, movie.Director, movie.Actors, movie.Year, movie.Rated, movie.Runtime, movie.Plot);
    });

    return movieDiv;
};


const newMovie = async () => {
    let latest = await getMovies();
    let movieSection = document.getElementById("new-movies-container");

   
    movieSection.innerHTML = '';

    latest.forEach(movie => {
        const movieDiv = getMovieInfo(movie);
        movieSection.appendChild(movieDiv);
    });
};



const filterMoviesByGenre = async () => {
    const genreSelect = document.getElementById('genre-select');
    const selectedGenre = genreSelect.value.toLowerCase();

    let movies = await getMovies();

    if (selectedGenre !== 'all') {
        movies = movies.filter(movie => {
            const genres = (movie.Genre || (movie.genres && movie.genres.join(', ')) || '').split(',').map(genre => genre.trim().toLowerCase());
            return genres.includes(selectedGenre);
        });
    }

    
    const movieContainer = document.getElementById('new-movies-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => movieContainer.appendChild(getMovieInfo(movie)));
};



const showModal = (title, director, cast, year, rated, runtime, plot) => {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = '';

   
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

    const plotElement = document.createElement('p');
    plotElement.textContent = `Plot: ${plot}`;


   
    modalContent.appendChild(titleElement);
    modalContent.appendChild(directorElement);
    modalContent.appendChild(castElement);
    modalContent.appendChild(yearElement);
    modalContent.appendChild(ratedElement);
    modalContent.appendChild(runtimeElement);
    modalContent.appendChild(plotElement);


    const reviewButton = document.createElement('button');
    reviewButton.textContent = 'Write a Review';
    reviewButton.classList.add('review-button');


    reviewButton.addEventListener('click', () => {
       
        window.location.href = 'review.html'; 
    });

  
    modalContent.appendChild(reviewButton);

 
    modal.style.display = 'block';

   
    const closeModal = document.getElementsByClassName('close')[0];
    closeModal.onclick = function () {
        modal.style.display = 'none';
    };


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};

document.addEventListener('DOMContentLoaded', async () => {
    
    await newMovie();

  
    const genreSelect = document.getElementById('genre-select');
    genreSelect.addEventListener('change', filterMoviesByGenre);
});