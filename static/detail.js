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
    // console.log(response);
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
  // .then(response => console.log(response));
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
  const reviewContainer = document.querySelector(".review-container")
  document.getElementById(cityName).style.display = 'block';
  reviewContainer.style.display = 'block';
  

  evt.currentTarget.className += ' active';

  if(cityName === 'Review') {
     window.scrollTo(0, document.body.scrollHeight)
  }
 

}


// const rgaa = /[a-zA-Z]+[0-9]*/gm
// let ddd = 'sdfsfsfs35353435'

// console.log(ddd.test(rgaa), 'rgaa'
// )


//------------------- 댓글박스 -----------------------

// 폼 제출
const form = document.querySelector("#form");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const textareaComment = document.querySelector("#textareaComment");

// 댓글 붙일 부모요소
const modalReview = document.querySelector(".modalReview");


// 2.
// 폼 제출
// 1. localStorage에 그냥 값을 입력하면 읽어올때 순서를 무시하는 경우가 발생
// 2. 그래서 배열형식으로 객체를 집어넣음
const reviewAction = (e) => {
  e.preventDefault();

  //비밀번호 설정
  if(!id) {
    return alert("새로고침 해주세요")
  }

  

  // 1.키에 값이 없는 경우
  if (!localStorage.getItem(id)) {
    const obj = [
      {
        name: name.value,
        password: password.value,
        textareaComment: textareaComment.value,
      },
    ];

    const objString = JSON.stringify(obj);
    localStorage.setItem(id, objString);
    getReadInfo();
    // 2. 키에 값이 있는 경우
  } else if (localStorage.getItem(id)) {

    //비밀번호 중복 설정
    try{
      JSON.parse(localStorage.getItem(id)).forEach((item) => {
        if(item.password === password.value) {
          return eee
        }     
      })

    //함수 즉시 종료
    }catch(e) {
       return alert("비밀번호가 중복됩니다")
    }
    

    const obj = {
      name: name.value,
      password: password.value,
      textareaComment: textareaComment.value,
    };


    // 키 값을 가져와서 객체로 만든 다음에 push()로 배열에 입력
    const already = JSON.parse(localStorage.getItem(id));
    already.push(obj)
//  [{},{new}]

///////객체 =>  JSON파일로 변환


    // 다시 JSON파일로 변환
    const objString = JSON.stringify(already);
    localStorage.setItem(id, objString);

    // 변환 한 값을 다시 읽어와서 html에 보여줌
    getReadInfo();
  }

  // let rgx = /[a-zA-Z]+[0-9]*/gm;
  // if (obj.name && obj.password && obj.textareaComment) {
  //   console.log(rgx.test(password.value));

  //   if (!rgx.test(password.value)) {
  //     return alert("password: 한 개 이상의 영문을 입략해주세요");
  //   }

  //   getReadInfo();
  // } else {
  //   alert("정보를 입력해주세요");
  // }
};

// 1.
// 폼을 제출할 때 reviewAction() 함수 실행
form.addEventListener("submit", reviewAction);

// 3.
// 로컬스토리지 정보를 html에 보이게 해줌
const getReadInfo = () => {
  // 댓글 붙일 요소들을 아예 없애줌
  document.querySelector(".modalReview").innerHTML = "";

  for (const key in window.localStorage) {
    //문제
    if (window.localStorage.hasOwnProperty(key)) {
      // 로컬스토리지의 키 값과 url id값이 일치하는지 검사
      if (key === id) {
        const value = JSON.parse(localStorage.getItem(key));

     
        // 로컬스토리지 value에 있는 배열을 차례대로 돌아줌
        value.forEach((item) => {
           // 댓글 붙일 요소를 다시 생성
          let nweDiv = document.createElement("div");

          // value값 지정 - 사용자가 입력한 비밀번호로 특정한 값을 만들어줌
          let valueAttr = document.createAttribute("id");
          valueAttr.value = item.password;
          nweDiv.setAttributeNode(valueAttr);

          nweDiv.classList.add("show-reviews");

          nweDiv.innerHTML = `
        <p><div class='textImg'></div><span class='textarea-name'>${item.name}</span> &nbsp; : &nbsp; <span class='textarea-comment'>${item.textareaComment}</span></p> 
        <span class='reviews-btn'>
            <button id='edit' onclick='editInfo(event)'>edit</button>
            <button id='remove' onclick='removeInfo(event)'>remove</button>
        </span>
        `;
      

          modalReview.appendChild(nweDiv);
     
          modalReview.scrollTop = modalReview.scrollHeight;
        });
      }
    }
  }
};


// 수정하기-html에 사용자가 입력할 수 있는 인풋창을 보여줌
const editInfo = (e) => {
  // e.currentTarget이 <span> 태그로 감싸져 있기때문에 parentNode를 두번 써줌


{/* <input class='editpassword'  type='password' ></input> */}
  //댓글 수정할때 덮어 쓰여질 배경색상
  e.currentTarget.parentNode.parentNode.classList.add("edit-background");
  e.currentTarget.parentNode.parentNode.innerHTML = `          
    <input class='editName' type='text' > : 
    <input class='editComment'  type='text' >
    <button id='clear' onclick='submitEditInfo(event)'>
      clear
    </button>
    `;
};

// ==>

// <div class='show-reviews'  id='password' >
//   <input class='editName' type='text' > :  <input class='editComment'  type='text' >
//   <button id='clear' onclick='submitEditInfo(event)'>
//      clear
//   </button>
// </div>








// 댓글수정 완료버튼 클릭
const submitEditInfo = (e) => {
  let compartPassword = e.currentTarget.parentNode.getAttribute("id");
  // e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>

       // edit input editName의 value
      let prcapracName = document.querySelector(`#${compartPassword}
        > .editName`
      ).value;

      // edit input editComment value
      let prcapractextareaComment = document.querySelector(
        `#${compartPassword} > .editComment`
      ).value;


    // switch (prcapracName && prcapractextareaComment) {
    //   case value1:
    //     statement1;
    //     break;
    //   case value2:
    //     statement2;
    //     break;
    //   default:
    //     statement3;
    // }


  // let promptObj = prompt('비밀번호를 입력하세요');
  // edit인풋에 사용자가 입력한 비밀번호 값
  // let prcapracPassword = document.querySelector(
  //   `#${compartPassword} > .editName`
  // ).value;


  // 로컬스토리지의 value값의 배열에 반복문
  JSON.parse(localStorage.getItem(id)).forEach((item, i) => {
    if (item.password === compartPassword) {
 



      const obj = {
        name: prcapracName,
        password: compartPassword,
        textareaComment: prcapractextareaComment,
      };

      if (obj.name && obj.password && obj.textareaComment) {
        const already = JSON.parse(localStorage.getItem(id));


        already.splice(i, 1, obj)
        const objString = JSON.stringify(already);
        window.localStorage.setItem(id, objString);

        putEditInfo(e, compartPassword);
      } else {
        return alert("입력해주세요");
      }
    }
  });
};


// 댓글 수정한 결과를 다시 브라우저에 보여줌
const putEditInfo = (e, compartPassword) => {
  console.log(e.currentTarget.parentNode, 'putEditInfo')
  const value = JSON.parse(localStorage.getItem(id));

  value.forEach((item) => {
    if (item.password === compartPassword) {
      //e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>

      e.currentTarget.parentNode.classList.remove("edit-background");
      e.currentTarget.parentNode.innerHTML = `
       
      <p><div class='textImg'></div><span class='textarea-name'>${item.name}</span> : <span class='textarea-comment'>${item.textareaComment}</span></p> 
      <span class='reviews-btn'>
          <button id='edit' onclick='editInfo(event)'>edit</button>
          <button id='remove' onclick='removeInfo(event)'>remove</button>
      </span>
       `;
    }
  });
};

// 댓글 제거
const removeInfo = (e) => {
  //e.currentTarget.parentNode ==> <div id="user-password" class="show-reviews"></div>

  console.log(e.currentTarget.parentNode.parentNode, 'removeInfo.parentNode.parentNode')
  let nodePassword = e.currentTarget.parentNode.parentNode.getAttribute("id");


  let localArr = JSON.parse(localStorage.getItem(id));

  JSON.parse(localStorage.getItem(id)).forEach((item, i) => {
    if (item.password === nodePassword) {
      localArr.splice(i, 1);
      const objString = JSON.stringify(localArr);
      window.localStorage.setItem(id, objString);
      ///로컬스토리지 삭제 완료
      getReadInfo();
      
    }
  });
};




getReadInfo();
