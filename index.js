// const movies = [];

const movieSearchInput = document.getElementById("movie-search-app-input")
const movieSearchButton = document.getElementById("movie-search-app-button")

const movieHandler = () => {
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=8a6b6056")
        .then(Response => Response.json())
        .then(json => {
            const movieSearch = json;

            document.getElementById("movie-search-list").innerHTML = `
            <p>
            ${movieSearch}
            </p>
                `;
        });
};

const addMovie = () => {

};



movieSearchButton.addEventListener("click", movieHandler);