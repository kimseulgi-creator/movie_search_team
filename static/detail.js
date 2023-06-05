let link = document.location.href.split('?');
const urlSearchParamsObject = new URLSearchParams(link[1]);
const urlSearchParamsObject.get('id'));

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68',
  },
};

fetch('https://api.themoviedb.org/3/movie/569094?language=en-US', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
