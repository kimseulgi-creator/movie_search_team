const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmY1NTVkYzQ4Mzk3OTdkMzZiODZlNzE5MWZjZjgzMSIsInN1YiI6IjY0NzQ0MjBhOWFlNjEzMDEyNTdjOWRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jEHwM9rbkGkWzt14fojKA5PfuHcpxNxLYiIzB6dJM5U'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    let movie_list = response['results'];

    let temp_html = ``;
    movie_list.forEach(i => {
      let img_url = 'https://image.tmdb.org/t/p/w500' + i['backdrop_path'];
      let movie_title = i['title'];
      let overview = i['overview'];
      let vote = i['vote_average'];
      let id = i['id'];

      temp_html += `
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
    </div>`;

      document.getElementById('cards-box').innerHTML = temp_html;
    });
  });

// 카드 클릭시 Id값 alert창에 표시
function info_click(id) {
  alert(`영화 ID:${id}`);
}

function info_click(id) {
  location.replace('movie_detail.html?id=' + id);
}

// 검색기능
function search_btn() {
  const movie_name_input = document.getElementById('movie_name_input').value;
  const card_arr = document.getElementsByClassName('col');

  const card_name_arr = [];
  for (let i = 0; i < card_arr.length; i++) {
    card_name_arr[i] = card_arr[i].getElementsByTagName('h3')[0].innerText;
    card_arr[i].style = 'display:none';
  }

  let movie_name = '';
  for (let i = 0; i < card_name_arr.length; i++) {
    movie_name = card_name_arr.filter(
      el => el.toUpperCase().indexOf(movie_name_input.toUpperCase()) > -1
    )[i];
    for (let i = 0; i < card_name_arr.length; i++) {
      if (movie_name === card_name_arr[i]) {
        card_arr[i].style = 'display:inline-block';
      }
    }
  }
}

// 버튼 스크롤
function scroll_move() {
  const homeBtn = document.querySelector('.home_btn');
  const moviesBtn = document.querySelector('.movies_btn');

  const location = document.querySelector('#movie_search_cards').offsetTop;

  homeBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  moviesBtn.addEventListener('click', () => window.scrollTo({ top: location, behavior: 'smooth' }));
}

scroll_move();
