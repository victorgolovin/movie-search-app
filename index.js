const MOVIE_SEARCH_TEXT_NOT_FOUND = 'Films not found';
const MOVIE_SEARCH_TEXT_NOT_FOUND_FILMS = "movie-search-output";


const movieSearchInputNode = document.getElementById("movie-search-app-input")
const movieSearchButtonNode = document.getElementById("movie-search-app-button")
const movieSearchOutputNode = document.getElementById("movie-search-output")
const movieSearchListNode = document.getElementById("movie-search-list")
const moviesSearchCardNode = document.getElementById("movie-search-card")



const getMovieFromUser = () => {
    const searchMovie = (movieSearchInputNode.value).trim();
    if (!searchMovie) {
        clearSearchInput(movieSearchInputNode);
        movieSearchOutputNode.classList.add(MOVIE_SEARCH_TEXT_NOT_FOUND_FILMS);
      return movieSearchOutputNode.innerText = MOVIE_SEARCH_TEXT_NOT_FOUND;
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

const movieSearchGetMovies = (searchMovie) => {
    fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=8a6b6056`)
      .then(response => response.json())
      .then((data) => {
        if (data.Response) {
          renderMoviesList(data);
        }
        if  (!data.Response) {
          outputNode.classList.add(MOVIE_SEARCH_TEXT_NOT_FOUND_FILMS);
          return outputNode.innerText = MOVIE_SEARCH_TEXT_NOT_FOUND;
        }
      })
  };

const renderMoviesList = (data) => {
    movieSearchListNode.innerHTML = '';
    data.Search.forEach((movie) => {
  
      const movieFeatures = document.createElement('li');
      movieFeatures.classList.add('movie-item');
      movieFeatures.setAttribute('id', `${movie.imdbID} `);
  
      if (movie.Poster !== 'N/A') {
        moviePoster = movie.Poster;
      } 
      if (movie.Poster == 'N/A') {
        moviePoster = 'resources/movie-not-found.webp'
      }
  
      movieFeatures.innerHTML = `
      
      <img
      class="movie-features_img"
      src="${moviePoster}"
      alt="Превью фильма"
    />
      <div class="movie-features-wrapper">
        <h2 class="movie-features-title">${movie.Title}</h2>
        <p class="movie-features-year">${movie.Year}</p>
        <p class="movie-features-category">${movie.Type}</p>
      </div>
     
    `;
  
    movieSearchListNode.appendChild(movieFeatures);
    });
    
    searchMovieLoad();
  }

const searchMovieLoad = () => {

}





movieSearchButtonNode.addEventListener("click", movieSearchHandler);



