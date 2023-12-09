const getMovies = async () => {
    try {
        return (await fetch("/api/movies")).json();
    } catch (error) {
        console.log(error);
    }
};

const showMovies = async () => {
    let movies = await getMovies();
    let moviesDiv = document.getElementById("movie-list");
    moviesDiv.innerHTML = "";
    movies.forEach((movie) => {
        const section = document.createElement("section");
        section.classList.add("movie");
        moviesDiv.append(section);

        const a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = movie.title;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayMovieDetails(movie);
        };
    });
};

const displayMovieDetails = (movie) => {
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = movie.title;
    movieDetails.append(h3);

    const img = document.createElement("img");
    img.src = movie.img;
    img.alt = movie.title;
    img.classList.add("movie-image");
    movieDetails.append(img);

    const dLink = document.createElement("a");
    dLink.innerHTML = "&#x2715;";
    movieDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    movieDetails.append(eLink);
    eLink.id = "edit-link";

    const p = document.createElement("p");
    movieDetails.append(p);
    p.innerHTML = `Year: ${movie.year}, Rated: ${movie.rated}, Released: ${movie.released}, Runtime: ${movie.runtime}, Plot: ${movie.plot}, Genre: ${movie.genre}, Director: ${movie.director}, Actors: ${movie.actors.join(", ")}`;

    eLink.onclick = (e) => {
        e.preventDefault();
        showEditMovieForm(movie);
    };

    dLink.onclick = (e) => {
        e.preventDefault();
        showDeleteMovieConfirmation(movie);
    };
};

const showEditMovieForm = (movie) => {
    const form = document.getElementById("add-edit-movie-form");
    form._id.value = movie._id;
    form.title.value = movie.title;
    form.year.value = movie.year;
    form.rated.value = movie.rated;
    form.released.value = movie.released;
    form.runtime.value = movie.runtime;
    form.plot.value = movie.plot;
    form.genre.value = movie.genre;
    form.director.value = movie.director;
    form.actors.value = movie.actors.join(", ");

    document.querySelector(".movie-dialog").classList.remove("transparent");
    document.getElementById("add-edit-movie-title").innerHTML = "Edit Movie";
};

const addEditMovie = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-movie-form");
    const formData = new FormData(form);

    try {
        if (form._id.value === "-1") {
            formData.delete("_id");
            const response = await fetch("/api/movies", {
                method: "POST",
                body: formData,
            });

            if (response.status !== 200) {
                const errorData = await response.json();
                displayErrorMessage(errorData.message);
                console.log("Error with data", errorData);
                return;
            }

            const newMovie = await response.json();
            displayMovieDetails(newMovie);
        } else {
            const response = await fetch(`/api/movies/${form._id.value}`, {
                method: "PUT",
                body: formData,
            });

            if (response.status !== 200) {
                const errorData = await response.json();
                displayErrorMessage(errorData.message);
                console.log("Error updating movie", errorData);
                return;
            }

            const updatedMovie = await response.json();
            displayMovieDetails(updatedMovie);
        }

        resetMovieForm();
        document.querySelector(".movie-dialog").classList.add("transparent");
        showMovies();
    } catch (error) {
        console.error("Error:", error);
        displayErrorMessage("An unexpected error occurred.");
    }
};

const displayErrorMessage = (message) => {
    const errorMessageElement = document.getElementById("error-message-movie");
    errorMessageElement.textContent = message;
};

const showDeleteMovieConfirmation = (movie) => {
    const confirmDelete = window.confirm("Do you want to delete this movie?");

    if (confirmDelete) {
        deleteMovie(movie);
    }
};

const deleteMovie = async (movie) => {
    let response = await fetch(`/api/movies/${movie._id}`, {
        method: "DELETE",
    });

    if (response.status !== 200) {
        console.log("Error deleting");
        return;
    }

    showMovies();
    document.getElementById("movie-details").innerHTML = "";
    resetMovieForm();
};

const resetMovieForm = () => {
    const form = document.getElementById("add-edit-movie-form");
    form.reset();
    form._id = "-1";
};

const showHideAddMovie = (e) => {
    e.preventDefault();
    document.querySelector(".movie-dialog").classList.remove("transparent");
    document.getElementById("add-edit-movie-title").innerHTML = "Add Movie";
    resetMovieForm();
};

window.onload = () => {
    showMovies();
    document.getElementById("add-edit-movie-form").onsubmit = addEditMovie;
    document.getElementById("add-link-movie").onclick = showHideAddMovie;

    document.querySelector(".close-movie").onclick = () => {
        document.querySelector(".movie-dialog").classList.add("transparent");
    };
};
