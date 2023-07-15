


const movieSearchInputNode = document.getElementById("movie-search-app-input")
const movieSearchButtonNode = document.getElementById("movie-search-app-button")
const movieSearchOutputNode = document.getElementById("movie-search-output")
const movieSearchListNode = document.getElementById("movie-search-list")
const moviesSearchCardNode = document.getElementById("movie-search-card")



const getMovieFromUser = () => {
    const searchMovie = (movieSearchInputNode.value).trim();
    if (!searchMovie) {
        clearSearchInput(movieSearchInputNode);
        movieSearchOutputNode.classList.add(TEXT_NOT_FOUND_FILMS_CLASSNAME);
      return movieSearchOutputNode.innerText = TEXT_NOT_FOUND_FILMS;
    } 
    
    if (searchMovie) {
      loadMovies(searchMovie);
      movieSearchOutputNode.innerText = '';
      clearSearchInput(movieSearchInputNode);
    };
  };

const clearSearchInput = (element) => {
    element.value = '';
};



movieSearchButtonNode.addEventListener("click", movieSearchHandler);



