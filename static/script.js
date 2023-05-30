const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmY1NTVkYzQ4Mzk3OTdkMzZiODZlNzE5MWZjZjgzMSIsInN1YiI6IjY0NzQ0MjBhOWFlNjEzMDEyNTdjOWRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jEHwM9rbkGkWzt14fojKA5PfuHcpxNxLYiIzB6dJM5U',
  },
};

fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => {
    let movie_list = response['results'];

    document.getElementById('cards-box').innerHTML = '';

    movie_list.forEach((i) => {
      let img_url = 'https://image.tmdb.org/t/p/w500' + i['backdrop_path'];
      let movie_title = i['title'];
      let overview = i['overview'];
      let vote = i['vote_average'];
      let id = i['id'];

      let temp_html = `
      <div class="col">
        <a onclick="info_click(${id})" type="button">
          <img src='${img_url}' alt="">
         <div class="info">
          <div class= wrap>
           <h3>${movie_title}</h3>
            <p>${overview}</p>
            <p>⭐ ${vote}</p>
            </div>
        </div>
       </a>
    </div>;`;

      let cardsBoxId = document.querySelector('#cards-box');
      cardsBoxId.insertAdjacentHTML('beforeend', temp_html);
    });
  });

function info_click(id) {
  alert(`영화 ID:${id}`);
}

// function search_btn(){
//   var txt = document.getElementById().value;
// }
