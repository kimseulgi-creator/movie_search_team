const YOUTUBE_API_KEY = 'AIzaSyBc0ERVcfLRlK8AkNakLo0BwlfBQmmNVtw';
const EXPIRATION_DATE = 7 * 24 * 60 * 60 * 1000; // one week
const TMDB_ACCESS_TOKEN = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZmYzQyYzYyY2JhMWJmOGNjZWE3NGIzYzY1ZmIxYiIsInN1YiI6IjY0NTBhNjM3ZDcxMDdlMDE0YzZmZDk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ispHusWEKA3CalXIEK51_NiqFwzActFVSyietRsLH68'
  }
};
const $videoList = document.querySelector('.videoList');
const $youtubePlayer__container = document.querySelector('#youtubePlayer__container');
/////////////////////////////////////////////
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const youtubePlayer = {
  player: null,
  intervalId: null
};
/////////////////////////////////////////////
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && youtubePlayer.player) closePlayer();
});
$youtubePlayer__container.addEventListener('click', () => closePlayer());
const id = new URLSearchParams(location.search).get('id');
const movieVideos = await fetchMovieVideos(id);
createThumbnailElements(movieVideos);

/////////////////////////////////////////////
async function fetchMovieVideos(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    TMDB_ACCESS_TOKEN
  );
  const { results } = await res.json();
  return results.filter(video => video.site === 'YouTube');
}

async function fetchYoutubeVideos(id) {
  const res = await fetch(
    `
      https://content-youtube.googleapis.com/youtube/v3/videos?id=${id}&part=id,snippet&key=${YOUTUBE_API_KEY}`,
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

async function getThumbnails(movieVideos) {
  if (movieVideos.length === 0) throw new Error('비디오가 없습니다.');
  const requests = movieVideos.map(video => fetchYoutubeVideos(video.key));
  const responses = await Promise.all(requests);
  return responses.filter(x => x);
}

function validatePlayerOptions(playerOptions) {
  if (!playerOptions) return false;
  try {
    const { expiration, data } = JSON.parse(playerOptions);
    const { volume } = data;
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

export async function createThumbnailElements(movieVideos) {
  try {
    const thumbnails = await getThumbnails(movieVideos); // api 사용
    //const thumbnails = DUMMY_THUMBNAILS; // api 사용하지 않는 더미 데이터
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
