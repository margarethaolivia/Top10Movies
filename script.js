// load movie lists by default
document.addEventListener('DOMContentLoaded', function() {
    load_movies();
});

// GET request API to get all movies from database
function load_movies(){
    fetch('./db.json')
    .then(response => response.json())
    .then(db => {
        movies = db.movies
        movies.forEach(movie => show_movie(movie))
    })
}
// function for showing movie lists
function show_movie(movie) {
    let container = document.getElementById("movies-container");
    container.innerHTML += `
        <div class="card">
            <img src="${movie.poster}" alt="Movie Poster" class="card-img">
            <div class="card-body">
                <div class="row">
                    <h3 class="card-title">${movie.title}</h3>
                    <div class="badge">
                        <p>${movie.rate}</p>
                    </div>
                </div>
                <div class="row flex-end">
                    <button class="btn" onclick="overview(${movie.id})">Overview</button>
                </div>
            </div>
        </div>
    `
}

// function for showing the movie description's modal
function overview(id) {

    // Get the modal
    var modal = document.getElementById("modal-container");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // GET request API to get movie's description
    fetch('./db.json')
    .then(response => response.json())
    .then(db => {

        // get the movie's description
        movie = db.movies[id-1];
        
        // get the movie's genre
        genreId = movie.genreId;
        genre = db.genres[genreId-1];

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onclick="close_modal()">&times;</span>
                    <h1 class="title" style="padding: 0.5em;">${movie.title}</h1>
                </div>
                <div class="modal-body">
                    <img src=${movie.poster} alt="Movie Poster" class="modal-img">
                    <div class="modal-desc">
                        <div style="margin-bottom: 1em;">
                            <h3>Overview</h3>
                            <p>${movie.description}</p>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">IMDb rating:</h4>
                            <h>${movie.rate}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Genre:</h4>
                            <h>${genre.name}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Year:</h4>
                            <h>${movie.year}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Duration:</h4>
                            <h>${movie.duration}</h>
                        </div>
                    </div>
                </div>
            </div>
        `
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// function for closing the movie description's modal
function close_modal() {
    var modal = document.getElementById("modal-container");
    modal.style.display = "none";
}