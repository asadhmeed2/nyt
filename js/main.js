const apiKey = '2naGSGPVsBVx6hqXfADxO5PWpRWywMxC'
const mostPopularUrl = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=2naGSGPVsBVx6hqXfADxO5PWpRWywMxC`;
const moviesReviewUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=2naGSGPVsBVx6hqXfADxO5PWpRWywMxC`
async function getMostPopularArticle() {
    let data = await (await (fetch(mostPopularUrl))).json();
    showMostPopularArticles(data.results);
}

async function getMovieReviews() {
    let data = await (await (fetch(moviesReviewUrl))).json();
    showMovieReviews(data.results);
}
async function getSearchArticleResults(e) {
    let text = document.querySelector('.search-input')
    let data = await (await (fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text.value}&api-key=2naGSGPVsBVx6hqXfADxO5PWpRWywMxC`))).json();
    showSearchedArticles(data.response.docs);
}


function showMostPopularArticles(articles) {

    articles = [...articles];
    document.querySelector('.movies-reviews').style.display = 'none';
    document.querySelector('.mostPopular').style.display = 'flex';
    const articlesScreen = document.querySelector('.mostPopular');
    articlesScreen.innerHTML = "";
    articles.map((el, i) => {
        let media = "";
        if (el.media[0]) {
            media = el.media[0]['media-metadata'][0].url;
        }
        str = ` <div class="article article${i}">
                <img class="article-img" src="${media}" alt="">
                <div class="item article-title">
                    ${el.title}
                </div>
                <div class="item article-description">
                ${el.abstract}
                </div>
                <div class="item article-published-date">
                ${el.published_date}
                </div>
                <div class="item article-updated">
                ${el.updated}
                </div>
                <a class="item article-link" target="_blank" href="${el.url}">article website</a>
            </div>`
        articlesScreen.innerHTML += str;
    })
}
function showSearchedArticles(articles) {

    articles = [...articles];
    document.querySelector('.movies-reviews').style.display = 'none';
    document.querySelector('.mostPopular').style.display = 'flex';
    const articlesScreen = document.querySelector('.mostPopular');
    articlesScreen.innerHTML = "";
    articles.map((el) => {
        str = ` <div class="article">
                <img src="" alt="">
                <div class="article-title">
                    ${el.headline.main}
                </div>
                <div class="article-description">
                ${el.lead_paragraph}
                </div>
                <a class="article-link"  target="_blank" href="${el.web_url}">article website</a>
            </div>`
        articlesScreen.innerHTML += str;
    })
}
function showMovieReviews(results) {
    results = [...results];
    console.log(results);
    document.querySelector('.movies-reviews').style.display = 'flex';
    document.querySelector('.mostPopular').style.display = 'none';
    const moviesScreen = document.querySelector('.movies-reviews');
    results.map((el, i) => {
        
        str = `<div class="movie movie${i}">
            <div class="movie-title">
                ${el.display_title}
            </div>
            <div class="movie-description">
                ${el.summary_short}
            </div>
            <a class="" href="${el.url}">The Review</a>
        </div>`
        moviesScreen.innerHTML += str;
        if (el.multimedia) {
            document.querySelector(`.movie${i}`).style.background=`url(${el.multimedia.src})no-reapet center center/cover`;
        }
    })
   
}
function addEventListenerToElements() {
    document.querySelector('.popular-article').addEventListener('click', getMostPopularArticle)
    document.querySelector('.movie-reviews').addEventListener('click', getMovieReviews)
    document.querySelector('.btn').addEventListener('click', getSearchArticleResults)
}
window.onload = function () {
    getMostPopularArticle();
    addEventListenerToElements();
}