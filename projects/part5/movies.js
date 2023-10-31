// movie.js
const getMovies = async () => {
    const link = "https://gazyrubied.github.io/projects/part5/json/latest.json";

    try {
        const response = await fetch(link);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const newMovie = async () => {
    let latest = await getMovies();
    let movieSection = document.querySelector(".new-movies"); 

    latest.forEach(movie => movieSection.appendChild(getMovieInfo(movie)));
};

const getMovieInfo = (movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movies");

    const img = document.createElement('img');
    img.src = `https://gazyrubied.github.io/projects/part5/json/${movie.img}`; 
    movieDiv.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = movie.title;
    movieDiv.appendChild(title);

    return movieDiv;
};

window.onload = newMovie; 
