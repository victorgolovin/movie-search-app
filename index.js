const MOVIE_SEARCH_TEXT_NOT_FOUND = "Фильм не найден";
const MOVIE_SEARCH_TEXT_FILMS_NOT_FOUND = "movie-search-validation";

const movieSearchInputNode = document.getElementById("movie-search-app-input");
const movieSearchButtonNode = document.getElementById("movie-search-app-button");
const movieSearchValidationNode = document.getElementById("movie-search-validation");
const movieSearchListNode = document.getElementById("movie-search-list");
const moviesSearchCardNode = document.getElementById("movie-search-card");
const movieSearchHideNode = document.getElementById("movie-search-app-hide");

const movieSearchHandler = () => {
  const searchMovie = movieSearchInputNode.value.trim();
  if (!searchMovie) {
    movieSearchValidationNode.classList.add(MOVIE_SEARCH_TEXT_FILMS_NOT_FOUND);
    return (movieSearchValidationNode.innerText = MOVIE_SEARCH_TEXT_NOT_FOUND);
  }

  if (searchMovie) {
    movieSearchGetMovies(searchMovie);
    movieSearchValidationNode.innerText = "";
  }

  clearSearchInput();
};

const clearSearchInput = () => {
    movieSearchInputNode.value = "";
};

const movieSearchGetMovies = (searchMovie) => {
  fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=8a6b6056`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response) {
        renderMoviesList(data);
      }
      if (!data.Response) {
        outputNode.classList.add(MOVIE_SEARCH_TEXT_FILMS_NOT_FOUND);
        return (outputNode.innerText = MOVIE_SEARCH_TEXT_NOT_FOUND);
      }
    });
};

const renderMoviesList = (data) => {

  movieSearchListNode.innerHTML = "";

  data.Search.forEach((movie) => {

    const movieFeatures = document.createElement("li");

    movieFeatures.classList.add("movie-item");
    movieFeatures.setAttribute("id", `${movie.imdbID}`);

    if (movie.Poster !== "N/A") {
      moviePoster = movie.Poster;
    }
    if (movie.Poster == "N/A") {
      moviePoster = "resources/movie-not-found.webp";
    }

    movieFeatures.innerHTML = `
      
      <img
      class="movie-features-img"
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
};

const searchMovieLoad = () => {

  const searchMovieItem = movieSearchListNode.querySelectorAll("li");

  searchMovieItem.forEach((movie) => {
    movie.addEventListener("click", function () {
      fetch(
        `https://www.omdbapi.com/?i=${movie.getAttribute("id")}&apikey=8a6b6056`
      )
        .then((response) => response.json())
        .then((dataCard) => {
          movieSearchRenderCard(dataCard);
          movieSearchHideNode.classList.add("movie-search-app-hide");
          moviesSearchCardNode.classList.remove("movie-search-card");
        });
    });
  });
};

const movieSearchRenderCard = (dataCard) => {
  const movieSearchElement = document.createElement("div");
  movieSearchElement.classList.add("movie-card");

  if (dataCard.Poster !== "N/A") {
    dataCardPoster = dataCard.Poster;
  }

  if (dataCard.Poster == "N/A") {
    dataCardPoster = "resources/movie-not-found.webp";
  }

  movieSearchElement.innerHTML = `
  
<a class="card-link" onclick="movieSearchAddCard()">←</a>
  <div class="movie-search-card-wrapper">
    <div class="movie-search-card-list">
      <img
        src="${dataCardPoster}"
        alt=""
        class="movie-search-card-img"
      />
      <div class="movie-search-card-description">
        <h1 class="movie-search-card-title">${dataCard.Title}</h1>
        <ul class="movie-search-card-list-inner">
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
};

const movieSearchAddCard = () => {
  moviesSearchCardNode.classList.add("movie-search-card");
  movieSearchHideNode.classList.remove("movie-search-app-hide");
  moviesSearchCardNode.innerHTML = "";
};

movieSearchButtonNode.addEventListener("click", movieSearchHandler);
