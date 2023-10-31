document.addEventListener('DOMContentLoaded', async function() {
    const moviesContainer = document.getElementById('movies-container');
  
    try {
      const response = await fetch("https://gazyrubied.github.io/projects/part5/json/movie.json");
      const movies = await response.json();
  
      movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const title = document.createElement('h2');
  
        link.href = `review.html?image=${encodeURI(movie.image)}`;
        image.src = `images/${encodeURI(movie.image)}`;
        image.alt = `${movie.title} Movie Poster`;
        image.classList.add('movie-image');
  
        title.textContent = movie.title;
  
        link.appendChild(image);
        movieDiv.appendChild(title);
        movieDiv.appendChild(link);
        moviesContainer.appendChild(movieDiv);
      });
    } catch (error) {
      console.log(error);
    }
  });
  