let link = document.location.href.split('?');
const urlSearchParamsObject = new URLSearchParams(link[1]);
const id = urlSearchParamsObject.get('id');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    let detail_backImg = 'https://image.tmdb.org/t/p/w500' + response.backdrop_path;
    let poster = 'https://image.tmdb.org/t/p/w500' + response.poster_path;
    document.querySelector(
      '#visual'
    ).style.background = `linear-gradient(0deg, rgb(0 0 0), rgb(0 0 0 / 84%)), url(${detail_backImg}) center no-repeat`;
    document.querySelector('#visual').style.backgroundSize = 'cover';
    let detail_title = response.title;
    let detail_tagline = response.tagline;
    let detail_average = Math.round(response.vote_average * 10) / 10;
    let detail_date = response.release_date;
    let lan = response.spoken_languages[0].english_name;
    let detail_genres = response.genres[0].name;
    let detail_runtime = response.runtime;
    let detail_overview = response.overview;
    let movie_poster = document.querySelector('#visual').getElementsByTagName('img')[0];
    movie_poster.setAttribute('src', poster);

    document.getElementsByTagName('h2')[0].innerText = detail_title;
    document.getElementsByClassName('tagline')[0].innerText = detail_tagline;
    document.getElementsByClassName('vote')[0].innerText = '⭐ ' + detail_average;
    document.getElementsByClassName('date')[0].innerText = detail_date;
    document.getElementsByClassName('genre')[0].innerText = detail_genres;
    document.getElementsByClassName('country')[0].innerText = lan;
    document.getElementsByClassName('time')[0].innerText = detail_runtime;
    document.getElementsByClassName('content')[0].innerText = detail_overview;
  })
  .then(response => console.log(response));
// .catch(err => console.error(err));

function openMovie(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
