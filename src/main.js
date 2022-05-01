// const api_key ç= API_KEY;
// const urlTrendingMovies = `https://api.themoviedb.org/3/trending/movies/day?api_key=${api_key}&language=es-ES`;
// const urlCategories = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=es-ES`;


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: API_KEY,
        language: 'es-ES'
    }
});

//helpers 
const createMovies = (movies, container) => {
    container.innerHTML = '';
    movies.forEach(movie => {
        const { id, title, poster_path } = movie;
       
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImage = document.createElement('img');
        movieImage.classList.add('movie-img');

        poster_path 
            ? movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}` 
            : movieImage.src = './src/img/error-img.png';

        movieImage.alt = title;
        movieImage.id = id;

        movieImage.addEventListener('click', () => {
            location.hash = `movie=${id}`;
        });

        const releasedate = document.createElement('p');
        releasedate.classList.add('releasedate');
        releasedate.innerText = `Fecha de estreno: ${movie.release_date}`;
        movieContainer.appendChild(movieImage);
        container.appendChild(movieContainer);
    });

}

const createCategories = (categories, container) => {
    container.innerHTML = '';
    categories.forEach(category => {
        const { id, name } = category;
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = name;
        categoryTitle.id = `id${id}`;

        categoryTitle.addEventListener('click', () => {
            location.hash = `category=${id}`;
        });

        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });

}

const getTrendingMovies = async () => {
    // const response = await fetch(urlTrendingMovies);
    const { data } = await api('trending/movie/day');
    // const data = await response.json();

    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

const getUpcomingMovies = async () => {
    // const response = await fetch(urlUpcomingMovies);
    const { data } = await api('movie/upcoming');
    // const data = await response.json();

    const movies = data.results;
    movies.forEach(movie => {
        const { id, title, poster_path } = movie;
       
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImage = document.createElement('img');
        movieImage.classList.add('movie-img');

        poster_path 
            ? movieImage.src = `https://image.tmdb.org/t/p/w500/${poster_path}` 
            : movieImage.src = './src/img/error-img.png';

        movieImage.alt = title;
        movieImage.id = id;

        movieImage.addEventListener('click', () => {
            location.hash = `movie=${id}`;
        });

        const releasedate = document.createElement('p');
        releasedate.classList.add('releasedate');
        releasedate.innerText = `Fecha de estreno: ${movie.release_date}`;

        movieContainer.appendChild(movieImage);
        movieContainer.appendChild(releasedate);
        genericSection.appendChild(movieContainer);
    });
    

}

const getCategories = async () => {
    // const response = await fetch(urlCategories);
    // const data = await response.json();

    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

const getMoviesByCategory = async (category) => {
    // const response = await fetch(`${urlCategories}/${category}/movies`);
    // const data = await response.json();

    const { data } = await api(`/discover/movie?with_genres=${category}`);
    const movies = data.results;

    createMovies(movies, genericSection);
}

const getCategoriesById = async (id_genre) => {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach(category => {
        const { id, name } = category;
        if (id == id_genre) {
            headerCategoryTitle.innerText = name;
        }
    });
}

const getMovieByName = async (name) => {
    const { data } = await api(`/search/movie?query=${name}`);
    const movies = data.results;

    createMovies(movies, genericSection);
}

const getMovieReviews = async (id) => {
    const { data } = await api(`/movie/${id}/reviews`);
    const reviews = data.results;
}

const getMovieDetails = async (id) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    if (month < 10 || day < 10) {
        date = `${year}-0${month}-0${day}`;
    } 

    const { data } = await api(`/movie/${id}`);
    const movie = data;

    console.log(movie);
   
    headerSection.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

    movie.release_date < date
        ? movieDetailTitle.innerHTML = `<a href="${movie.homepage}" target="_blank">${movie.title} (${movie.release_date.substring(0, 4)})</a>`
        : movieDetailTitle.innerHTML = `${movie.title} (En cines el ${movie.release_date})`;
    movieDetailDescription.innerText = movie.overview;
    movieDetailScore.innerText = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
}

const getRelatedMovies = async (id) => {
    const { data } = await api(`/movie/${id}/similar`);
    const movies = data.results;

    createMovies(movies, relatedMoviesContainer);
}

axios.all([getTrendingMovies(), getCategories()])
