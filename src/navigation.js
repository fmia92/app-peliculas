const navigator = () => {
    console.log({location})

    window.scrollTo(0, 0);

    location.hash.startsWith("#upcoming") 
        ? upcomingPage()
        : location.hash.startsWith("#search=") 
            ? searchPage() 
        : location.hash.startsWith("#movie=") 
            ? moviePage()
        : location.hash.startsWith("#category=") 
            ? categoriesPage() 
        : homePage();
    
    location.hash;
}

const upcomingPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.backgroundImage = "";
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = "Próximos Estrenos";
    getUpcomingMovies();
}

const searchPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.backgroundImage = "";
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [movieId, movieName] = location.hash.split("=");
    
    getMovieByName(movieName);
}

const moviePage = () => {
    headerSection.classList.add("header-container--long");
    // headerSection.style.backgroundImage = "";
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [tag, movieId] = location.hash.split("=");

    getMovieDetails(movieId);
    getMovieReviews(movieId);
    getRelatedMovies(movieId);
   
}

const categoriesPage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.backgroundImage = "";
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    const [categoryName, categoryId ] = location.hash.split("=");

    getMoviesByCategory(categoryId);
    getCategoriesById(categoryId);
}

const homePage = () => {
    headerSection.classList.remove("header-container--long");
    headerSection.style.backgroundImage = "";
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
}


window.addEventListener('load', navigator);
window.addEventListener('hashchange', navigator);

searchFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = "#upcoming";
});

arrowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
    // location.hash = '#home';
});