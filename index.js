
const movieSearchInput = document.getElementById("movie-search-app-input")
const movieSearchButton = document.getElementById("movie-search-app-button")

const movieHandler = () => {
    fetch("https://www.omdbapi.com/?s=fast&apikey=8a6b6056")
        .then(data => data.json())
        .then(res => console.log(res));
};

const addMovie = () => {
    movies.push 
};



movieSearchButton.addEventListener("click", movieHandler);



