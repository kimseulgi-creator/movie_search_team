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
    </div>`;

      let cardsBoxId = document.querySelector('#cards-box');
      cardsBoxId.insertAdjacentHTML('beforeend', temp_html); //Map, innerHTML
    });
  });

// 카드 클릭시 Id값 alert창에 표시
function info_click(id) {
  alert(`영화 ID:${id}`);
}

// 검색기능   // filter, forEach
function search_btn() {
  const name = document.getElementById('movie_name_input').value;

  const card_arr = document.getElementsByClassName('col');

  const card_name_tag = [];
  const card_name_arr = [];
  for (let i = 0; i < card_arr.length; i++) {
    card_name_tag[i] = card_arr[i].getElementsByTagName('h3');
    card_name_arr[i] = card_name_tag[i][0].innerText;
  }

  const movie_filter = (query) => {
    return card_name_arr.filter(
      (el) => el.toUpperCase().indexOf(query.toUpperCase()) > -1
    );
  };

  for (let i = 0; i < card_name_arr.length; i++) {
    card_arr[i].style = 'display:none';
  }

  let a = '';
  for (let i = 0; i < card_name_arr.length; i++) {
    a = movie_filter(name)[i];
    //console.log(a);
    for (let i = 0; i < card_name_arr.length; i++) {
      if (a === card_name_arr[i]) {
        //console.log(card_name_arr[i], i);
        card_arr[i].style = 'display:inline-block';
      }
    }
  }
}
