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
    const searchMovieItem = searchListNode.querySelectorAll('li');

  searchMovieItem.forEach(movie => {
    movie.addEventListener('click', function () {
      fetch(`https://www.omdbapi.com/?i=${movie.getAttribute('id')}&apikey=8a6b6056`)
        .then(response => response.json())
        .then((dataCard) => {
          renderMovieCard(dataCard);
          hideListNode.classList.add('hide-list')
          cardDetailsNode.classList.remove('card-details')
        });
    });
  });
}

const movieSearchRenderCard = () => {
    const movieSearchElement = document.createElement('div');
    movieSearchElement.classList.add('movie-card');

  if (dataCard.Poster !== 'N/A') {
    dataCardPoster = dataCard.Poster;
  } 

  if (dataCard.Poster == 'N/A')  {
    dataCardPoster = 'resources/movie-not-found.webp'
  };

  movieSearchElement.innerHTML = `
  
  <a class="card_link" onclick="hideCard()">Back</a>
  <div class="movie-search-card-wrapper">
    <div class="movie-search-list">
      <img
        src="${dataCardPoster}"
        alt=""
        class="movie-search-card-img"
      />
      <div class="movie-search-card-description">
        <h1 class="movie-search-card-title">${dataCard.Title}</h1>
        <ul class="movie-search-card-list">
          <li class="movie-search-card-item">
            Year:<span class="color">${dataCard.Year}</span>
          </li>
          <li class="movie-search-card-item">
            Rated:<span class="color">${dataCard.Rated}</span>
          </li>
          <li class="movie-search-card-item">
            Released:<span class="color">${dataCard.Released}</span>
          </li>
          <li class="movie-search-card-item">
            Runtime:<span class="color">${dataCard.Runtime}</span>
          </li>
          <li class="movie-search-card-item">
            Genre:<span class="color">${dataCard.Genre}</span>
          </li>
          <li class="movie-search-card-item">
            Director:<span class="color">${dataCard.Director}</span>
          </li>
          <li class="movie-search-card-item">
            Writer:<span class="color">${dataCard.Writer}</span>
          </li>
          <li class="movie-search-card-item">
            Actors:<span class="color">${dataCard.Actors}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <p class="movie-description">
  ${dataCard.Plot}
  </p>
        `;
    moviesSearchCardNode.appendChild(movieSearchElement);
}





movieSearchButtonNode.addEventListener("click", movieSearchHandler);



