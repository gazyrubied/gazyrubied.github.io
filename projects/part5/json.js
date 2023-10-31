const getMovies = async () => {
  const link = "https://gazyrubied.github.io/projects/part5/json/movie.json";

  try {
      const response = await fetch(link);
      return await response.json();
  } catch (error) {
      console.log(error);
  }
};

const displayMovies = async () => {
  const moviesContainer = document.getElementById('new-movies-container');
  const movies = await getMovies();

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('new-movie-info'); 

    const link = document.createElement('a');
    const image = document.createElement('img');
    const title = document.createElement('h2');
    const director = document.createElement('p');
    const cast = document.createElement('p');
    const year = document.createElement('p');

    link.href = 'review.html';
    image.src = movie.image;
    image.alt = `${movie.title} Movie Poster`;
    image.classList.add('movie-image');

    title.textContent = movie.title;
        director.textContent = `Director: ${movie.director}`;
        cast.textContent = `Cast: ${movie.cast.join(', ')}`;
        year.textContent = `Year: ${movie.year}`;

    link.appendChild(image);
    movieDiv.appendChild(title);
    movieDiv.appendChild(director);
    movieDiv.appendChild(cast);
    movieDiv.appendChild(year);
    movieDiv.appendChild(link);
    moviesContainer.appendChild(movieDiv);
  });
};

window.onload = displayMovies;

