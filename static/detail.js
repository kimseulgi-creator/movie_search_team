const YOUTUBE_APIKEY = 'AIzaSyBc0ERVcfLRlK8AkNakLo0BwlfBQmmNVtw';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68'
  }
};
const EXPIRATION_DATE = 7 * 24 * 60 * 60 * 1000; // one week

const dummyThumbnails = [
  {
    id: 'as0VuHCf79M',
    title:
      'SpiderMan Across The Spider-Verse SECRETS REVEALED! Shameik Moore, Hailee Steinfeld & Daniel Kaluuya',
    url: 'https://i.ytimg.com/vi/as0VuHCf79M/sddefault.jpg'
  },
  {
    id: 'Tnb9dUA9pIo',
    title:
      'Spider-Man: Across the Spider-Verse - Pushing Past the Limits Vignette - Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/Tnb9dUA9pIo/sddefault.jpg'
  },
  {
    id: '6tYqhRYUu4Y',
    title: 'Spider-Man: Across the Spider-Verse | Cast Unboxing',
    url: 'https://i.ytimg.com/vi/6tYqhRYUu4Y/sddefault.jpg'
  },
  {
    id: 'r1sob-B7rNQ',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Point :06"',
    url: 'https://i.ytimg.com/vi/r1sob-B7rNQ/sddefault.jpg'
  },
  {
    id: '-IpM3YOlpJE',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Join :15"',
    url: 'https://i.ytimg.com/vi/-IpM3YOlpJE/sddefault.jpg'
  },
  {
    id: 'O4r2fdAWI6Y',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Masterpiece :15"',
    url: 'https://i.ytimg.com/vi/O4r2fdAWI6Y/sddefault.jpg'
  },
  {
    id: 'D9ObYKAPlEo',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Let\'s Go :15"',
    url: 'https://i.ytimg.com/vi/D9ObYKAPlEo/sddefault.jpg'
  },
  {
    id: 'SEYKogEkO2c',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Spider Zoo :15"',
    url: 'https://i.ytimg.com/vi/SEYKogEkO2c/sddefault.jpg'
  },
  {
    id: 'NtbkjfvjxV0',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Everything :06"',
    url: 'https://i.ytimg.com/vi/NtbkjfvjxV0/sddefault.jpg'
  },
  {
    id: 'axQMNL8e8pg',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Society :06"',
    url: 'https://i.ytimg.com/vi/axQMNL8e8pg/sddefault.jpg'
  },
  {
    id: 'tPkjZZ7BsAU',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Say It :15"',
    url: 'https://i.ytimg.com/vi/tPkjZZ7BsAU/sddefault.jpg'
  },
  {
    id: 'v4XG6rdT58Y',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Extraordinary :15"',
    url: 'https://i.ytimg.com/vi/v4XG6rdT58Y/sddefault.jpg'
  },
  {
    id: 'dMNeoggTZRY',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Greatest :15"',
    url: 'https://i.ytimg.com/vi/dMNeoggTZRY/sddefault.jpg'
  },
  {
    id: 'mh-KncHB6F4',
    title:
      'Spider-Man: Across the Spider-Verse | "Calling" by Metro Boomin x Nav x A Boogie with Swae Lee',
    url: 'https://i.ytimg.com/vi/mh-KncHB6F4/sddefault.jpg'
  },
  {
    id: 'XHLrJSqZd48',
    title:
      'Across the Spider-Verse cast members discuss it all | How It Happened: Across the Spider-Verse',
    url: 'https://i.ytimg.com/vi/XHLrJSqZd48/sddefault.jpg'
  },
  {
    id: 'm5WgYVNiO1g',
    title: 'Spider-Man: Across the #Spiderverse Now In Cinemas',
    url: 'https://i.ytimg.com/vi/m5WgYVNiO1g/sddefault.jpg'
  },
  {
    id: 'NplDtSWMZqs',
    title: 'Spider-Man: Across the #Spiderverse Now In Cinemas',
    url: 'https://i.ytimg.com/vi/NplDtSWMZqs/sddefault.jpg'
  },
  {
    id: 'ocu84jAOUnQ',
    title: 'Spider-Man: Across the #Spiderverse Now In Cinemas',
    url: 'https://i.ytimg.com/vi/ocu84jAOUnQ/sddefault.jpg'
  },
  {
    id: 'PiRQKcD5EJg',
    title: 'Spider-Man: Across the #Spiderverse Now In Cinemas',
    url: 'https://i.ytimg.com/vi/PiRQKcD5EJg/sddefault.jpg'
  },
  {
    id: 'rdyoLs85dO0',
    title: 'Spider-Man: Across the #Spiderverse Now In Cinemas',
    url: 'https://i.ytimg.com/vi/rdyoLs85dO0/sddefault.jpg'
  },
  {
    id: 'vUyC3ohm1pI',
    title: 'Across the Spider-Verse | PlayStation Exclusive Clip',
    url: 'https://i.ytimg.com/vi/vUyC3ohm1pI/sddefault.jpg'
  },
  {
    id: 'fJjTCHqS2TE',
    title:
      'SPIDER-MAN: ACROSS THE SPIDER-VERSE - Spider-Center ft. Ashley Brewer & George Kittle (ESPN)',
    url: 'https://i.ytimg.com/vi/fJjTCHqS2TE/sddefault.jpg'
  },
  {
    id: 'h-TE0A_xDxw',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - Spider-Stan ft. Stan Verrett (ESPN)',
    url: 'https://i.ytimg.com/vi/h-TE0A_xDxw/sddefault.jpg'
  },
  {
    id: 'JDr9U-Fyuqo',
    title: 'Spider-Man: Across the Spider-Verse - Hanging With Gwen - Only In Cinemas June 2',
    url: 'https://i.ytimg.com/vi/JDr9U-Fyuqo/sddefault.jpg'
  },
  {
    id: 'GPitD0-mkYA',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE Clip - Stop Spider-Man',
    url: 'https://i.ytimg.com/vi/GPitD0-mkYA/sddefault.jpg'
  },
  {
    id: 'RGMKe3Zbo98',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Blue Panther"',
    url: 'https://i.ytimg.com/vi/RGMKe3Zbo98/sddefault.jpg'
  },
  {
    id: 'yFrxzaBLDQM',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE – Stronger (In Theaters June 2)',
    url: 'https://i.ytimg.com/vi/yFrxzaBLDQM/sddefault.jpg'
  },
  {
    id: 'Jb7weNjC2k4',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE: Self Love - Song Teaser',
    url: 'https://i.ytimg.com/vi/Jb7weNjC2k4/sddefault.jpg'
  },
  {
    id: 'XGayDJEqbQA',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - New Guy (In Theaters June 2)',
    url: 'https://i.ytimg.com/vi/XGayDJEqbQA/sddefault.jpg'
  },
  {
    id: '_AaUrQKBuhU',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Funny Kids"',
    url: 'https://i.ytimg.com/vi/_AaUrQKBuhU/sddefault.jpg'
  },
  {
    id: 'xDwgLEXO6w0',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Grounded"',
    url: 'https://i.ytimg.com/vi/xDwgLEXO6w0/sddefault.jpg'
  },
  {
    id: 'zRBNWipKHb4',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Different Sides"',
    url: 'https://i.ytimg.com/vi/zRBNWipKHb4/sddefault.jpg'
  },
  {
    id: 'pREAYWiHGyQ',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - "Sacrifice My Bad"',
    url: 'https://i.ytimg.com/vi/pREAYWiHGyQ/sddefault.jpg'
  },
  {
    id: 'MokxwHbscQ8',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE Clip - Gwen & Miles',
    url: 'https://i.ytimg.com/vi/MokxwHbscQ8/sddefault.jpg'
  },
  {
    id: 'nVaAQhSZQpc',
    title: 'Spider-Man: Across the Spider-Verse - Pavitr Prabhakar -  Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/nVaAQhSZQpc/sddefault.jpg'
  },
  {
    id: 'wt5HZ7CXCFM',
    title: 'Spider-Man: Across the Spider-Verse - Jessica Drew -  Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/wt5HZ7CXCFM/sddefault.jpg'
  },
  {
    id: 'qtEjwTAkLl8',
    title: 'Spider-Man: Across the Spider-Verse - Spider-Punk  -  Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/qtEjwTAkLl8/sddefault.jpg'
  },
  {
    id: 'QJLg2cS-Zsw',
    title: 'Spider-Man: Across the Spider-Verse | Official Clip | "Missing Class"',
    url: 'https://i.ytimg.com/vi/QJLg2cS-Zsw/sddefault.jpg'
  },
  {
    id: 'Siq1MNKJDG8',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/Siq1MNKJDG8/sddefault.jpg'
  },
  {
    id: 'P9yp6z_5W9g',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/P9yp6z_5W9g/sddefault.jpg'
  },
  {
    id: 'rjiyRxTIZHQ',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/rjiyRxTIZHQ/sddefault.jpg'
  },
  {
    id: 'EI0NTMdUVBE',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/EI0NTMdUVBE/sddefault.jpg'
  },
  {
    id: 'WRI9KGrRKLI',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/WRI9KGrRKLI/sddefault.jpg'
  },
  {
    id: 'qcPgdj1sjNg',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/qcPgdj1sjNg/sddefault.jpg'
  },
  {
    id: 'CO9eqvuaaG0',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/CO9eqvuaaG0/sddefault.jpg'
  },
  {
    id: 'JMI28YKqOUo',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/JMI28YKqOUo/sddefault.jpg'
  },
  {
    id: 'NhAS_-IRj2s',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/NhAS_-IRj2s/sddefault.jpg'
  },
  {
    id: 'pBtymkdElK0',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/pBtymkdElK0/sddefault.jpg'
  },
  {
    id: 'ltrOzSBlSuE',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/ltrOzSBlSuE/sddefault.jpg'
  },
  {
    id: 'bOvIS6ayNvE',
    title: 'SPIDER-MAN: ACROSS THE #SPIDERVERSE - in cinemas May 31',
    url: 'https://i.ytimg.com/vi/bOvIS6ayNvE/sddefault.jpg'
  },
  {
    id: 'Etv-L2JKCWk',
    title: 'Spider-Man: Across the Spider-Verse - Trailer #3 -  Only In Cinemas June 2',
    url: 'https://i.ytimg.com/vi/Etv-L2JKCWk/sddefault.jpg'
  },
  {
    id: 'XFZJ3pHK5Vk',
    title: 'Spider-Man: Across the Spider-Verse - Legacy 30" - Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/XFZJ3pHK5Vk/sddefault.jpg'
  },
  {
    id: 'bk0ck-g_rPk',
    title: 'Spider-Man: Across the Spider-Verse - Welcome 30" - Only In Cinemas Now',
    url: 'https://i.ytimg.com/vi/bk0ck-g_rPk/sddefault.jpg'
  },
  {
    id: 'shW9i6k8cB0',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - Official Trailer #2 (HD)',
    url: 'https://i.ytimg.com/vi/shW9i6k8cB0/sddefault.jpg'
  },
  {
    id: 'cfUpAOknDRI',
    title: 'The Spider-Verse will never be the same. New trailer arrives April 4. 🕷 | #SpiderVerse',
    url: 'https://i.ytimg.com/vi/cfUpAOknDRI/sddefault.jpg'
  },
  {
    id: 'cqGjhVJWtEg',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE - Official Trailer (HD)',
    url: 'https://i.ytimg.com/vi/cqGjhVJWtEg/sddefault.jpg'
  },
  {
    id: 'BbXJ3_AQE_o',
    title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE – First Look',
    url: 'https://i.ytimg.com/vi/BbXJ3_AQE_o/sddefault.jpg'
  }
];

const $videoList = document.querySelector('.videoList');
const $youtubePlayer__container = document.querySelector('#youtubePlayer__container');
let link = document.location.href.split('?');
const urlSearchParamsObject = new URLSearchParams(link[1]);
const id = urlSearchParamsObject.get('id');

let tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const youtubePlayer = {
  player: null,
  intervalId: null
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && youtubePlayer.player) closePlayer();
});

fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`, options)
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

// tab menu 부분
function openMovie(evt, tabName) {
  let tabcontent = document.getElementsByClassName('tabcontent');
  let tablinks = document.getElementsByClassName('tablinks');

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
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

function validatePlayerOptions(playerOptions) {
  if (!playerOptions) return false;
  try {
    const { expiration, data } = JSON.parse(playerOptions);
    const { volume, muted } = data;
    if (expiration < new Date().getTime() || volume < 0 || volume > 100) {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

function onPlayerReady(event) {
  const playerOptions = localStorage.getItem('youtube-iframe-player-options');

  if (validatePlayerOptions(playerOptions)) {
    const { data } = JSON.parse(playerOptions);
    const { volume, muted } = data;
    event.target.setVolume(volume);
    if (muted) event.target.mute();
    else event.target.unMute();
  } else {
    event.target.setVolume(0);
    event.target.mute();
    updatePlayerOptions();
  }

  event.target.playVideo();
  startVolumeObserver();
}

function resetPlayer() {
  if (youtubePlayer.intervalId) {
    clearInterval(youtubePlayer.intervalId);
    youtubePlayer.intervalId = null;
  }
  if (youtubePlayer.player) {
    youtubePlayer.player.stopVideo();
    youtubePlayer.player.destroy();
    youtubePlayer.player = null;
  }
}

function startPlayer(id) {
  resetPlayer();
  const width = Math.min(document.documentElement.clientWidth, 1200);
  youtubePlayer.player = new YT.Player('youtubePlayer', {
    height: (width * 0.9 * 9) / 16,
    width: width * 0.9,
    videoId: id,
    events: {
      onReady: onPlayerReady
    }
  });
  $youtubePlayer__container.classList.remove('hide');
}

function updatePlayerOptions(muted = true, volume = 0) {
  const currentDate = new Date().getTime();
  const newOptions = {
    data: {
      volume,
      muted
    },
    expiration: currentDate + EXPIRATION_DATE,
    creation: currentDate
  };
  localStorage.setItem('youtube-iframe-player-options', JSON.stringify(newOptions));
}

function startVolumeObserver() {
  youtubePlayer.intervalId = setInterval(() => {
    const isMute = youtubePlayer.player.isMuted();
    const volume = youtubePlayer.player.getVolume();

    updatePlayerOptions(isMute, volume);
  }, 500);
}

function closePlayer() {
  $youtubePlayer__container.classList.add('hide');
  resetPlayer();
}

function createThumbnailItem(video) {
  const newItem = document.createElement('li');
  const newBtn = document.createElement('button');
  const newTitle = document.createElement('p');
  const newImg = document.createElement('img');
  const newPlayIcon = document.createElement('span');

  newItem.classList.add('videoList__video');
  newTitle.classList.add('videoThumbnail__title');
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

function appendThumbnailItem(thumbnails) {
  thumbnails.forEach(thumbnail => {
    const newItem = createThumbnailItem(thumbnail);
    $videoList.appendChild(newItem);
  });
}

async function createThumbnailElements(movieVideos) {
  try {
    const thumbnails = await getThumbnails(movieVideos); // api 사용
    //const thumbnails = dummyThumbnails; // api 사용하지 않는 더미 데이터
    $videoList.innerHTML = '';
    if (thumbnails.length > 8) {
      appendThumbnailItem(thumbnails.slice(0, 8));

      const moreBtn = document.createElement('button');
      moreBtn.classList.add('videos__moreBtn');
      moreBtn.innerHTML = `더 보기<span class='arrowDownIcon'></span>`;

      let count = 8;
      moreBtn.addEventListener('click', e => {
        const slicedThumbnails = thumbnails.slice(count, Math.min(count + 8, thumbnails.length));
        appendThumbnailItem(slicedThumbnails);
        count += 8;
        if (count >= thumbnails.length) e.target.remove();
      });

      $videoList.parentNode.appendChild(moreBtn);
    } else {
      appendThumbnailItem(thumbnails);
    }

    $youtubePlayer__container.addEventListener('click', closePlayer);
  } catch (error) {
    console.error(error);
  }
}
