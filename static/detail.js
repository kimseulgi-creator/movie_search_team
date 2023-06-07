const YOUTUBE_APIKEY = 'AIzaSyBc0ERVcfLRlK8AkNakLo0BwlfBQmmNVtw';
const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68'
  }
};
const dummyThumbnails = [
  {
    id: '9je8I3t2mRA',
    title: 'Sparkle| Your Name | Hindi Cover | Now Streaming | Bloody tv+',
    url: 'https://i.ytimg.com/vi/9je8I3t2mRA/sddefault.jpg'
  },
  {
    id: 'Rto08gyg_P4',
    title: 'Zen Zen Zense | Your Name | Hindi Cover | Now Streaming | Bloody tv+',
    url: 'https://i.ytimg.com/vi/Rto08gyg_P4/sddefault.jpg'
  },
  {
    id: 'Pp57eD9oRPc',
    title: 'Dream Lantern | Your Name | Hindi Cover | Now Streaming | Bloody tv+',
    url: 'https://i.ytimg.com/vi/Pp57eD9oRPc/sddefault.jpg'
  },
  {
    id: 'EJVfSU9z-64',
    title: 'Nandemonaiya | Your Name | Hindi Cover | Now Streaming | Bloody tv+',
    url: 'https://i.ytimg.com/vi/EJVfSU9z-64/sddefault.jpg'
  },
  {
    id: '_oWzYOwXn-o',
    title: 'Your Name | Official Hindi Trailer | Bloody tv+',
    url: 'https://i.ytimg.com/vi/_oWzYOwXn-o/sddefault.jpg'
  },
  {
    id: 'SlNVu5pnZuc',
    title:
      'How to be an anime voice actor, with Your Name stars Stephanie Sheh and Michael Sinterniklaas | BFI',
    url: 'https://i.ytimg.com/vi/SlNVu5pnZuc/sddefault.jpg'
  },
  {
    id: 'o4-URMnBOPU',
    title: 'Your Name. | Trailer (Dubbed)',
    url: 'https://i.ytimg.com/vi/o4-URMnBOPU/sddefault.jpg'
  },
  {
    id: 'xU47nhruN-Q',
    title: 'Your Name - Trailer [English Subtitled]',
    url: 'https://i.ytimg.com/vi/xU47nhruN-Q/sddefault.jpg'
  }
];
const $videoList = document.querySelector('.videoList');
const $youtubePlayer__container = document.querySelector('#youtubePlayer__container');
const $thumbnailSwiper = document.querySelector('.thumbnailSwiper');
let link = document.location.href.split('?');
const urlSearchParamsObject = new URLSearchParams(link[1]);
const id = urlSearchParamsObject.get('id');

let tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && player) closePlayer();
});

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`, OPTIONS)
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

    return createThumbnailElements(
      response.videos.results.filter(video => video.site === 'YouTube')
    );
  })
  .then(response => console.log(response));
// .catch(err => console.error(err));

function openMovie(evt, cityName) {
  // Declare all variables
  var i, tabContent, tabLinks;

  // Get all elements with class="tabContent" and hide them
  tabContent = document.getElementsByClassName('tabContent');
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }

  // Get all elements with class="tabLinks" and remove the class "active"
  tabLinks = document.getElementsByClassName('tabLinks');
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

async function getThumbnails(movieVideos) {
  if (movieVideos.length === 0) throw new Error('비디오가 없습니다.');
  const requests = movieVideos.map(video => fetchYoutubeVideos(video.key));
  const responses = await Promise.all(requests);
  return responses.filter(x => x);
}

async function fetchYoutubeVideos(id) {
  const res = await fetch(
    `
      https://content-youtube.googleapis.com/youtube/v3/videos?id=${id}&part=id,snippet&key=${YOUTUBE_APIKEY}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  );
  const { items } = await res.json();
  if (!items[0]) return undefined;
  return {
    id: items[0].id,
    title: items[0].snippet.title,
    url: items[0].snippet.thumbnails.standard.url
  };
}

function onPlayerReady(event) {
  event.target.setVolume(0);
  event.target.playVideo();
}

function resetVideo() {
  if (player) {
    player.destroy();
    player = null;
  }
}

function startPlayer(id) {
  resetVideo();
  const width = Math.min(document.documentElement.clientWidth, 1200);
  player = new YT.Player('youtube_player', {
    height: (width * 0.9 * 9) / 16,
    width: width * 0.9,
    videoId: id,
    events: {
      onReady: onPlayerReady
    }
  });
  $youtubePlayer__container.classList.remove('hide');
}

function closePlayer() {
  $youtubePlayer__container.classList.add('hide');
  resetVideo();
}

function createThumbnailSlide(video) {
  const newItem = document.createElement('div');
  const newBtn = document.createElement('button');
  const newTitle = document.createElement('p');
  const newImg = document.createElement('img');
  const newPlayIcon = document.createElement('span');

  newItem.classList.add('swiper-slide');
  newTitle.innerText = video.title;
  newImg.src = video.url;
  newImg.alt = video.title;
  newImg.onerror = e => {
    e.target.src = 'https://placehold.co/640x480?text=No+Image';
  };
  newPlayIcon.classList.add('playIcon');
  newBtn.classList.add('videoThumbnail');
  newBtn.addEventListener('click', () => startPlayer(video.id));
  newBtn.appendChild(newImg);
  newBtn.appendChild(newPlayIcon);
  newItem.appendChild(newBtn);
  newItem.appendChild(newTitle);
  return newItem;
}

async function createThumbnailElements(movieVideos) {
  try {
    const thumbnails = await getThumbnails(movieVideos); // api 사용
    //const thumbnails = dummyThumbnails; // api 사용하지 않는 더미 데이터
    $videoList.innerHTML = '';
    thumbnails.forEach(video => {
      const newItem = createThumbnailSlide(video);
      $videoList.appendChild(newItem);
    });
    document.querySelector('.thumbnailSwiper').insertAdjacentHTML(
      'afterend',
      `
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>`
    );
    const swiper = createThumbnailSwiper('.thumbnailSwiper');
    $youtubePlayer__container.addEventListener('click', closePlayer);
  } catch (error) {
    console.error(error);
  }
}

function createThumbnailSwiper(selector) {
  return new Swiper(selector, {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 50
      }
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}
