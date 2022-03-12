// the movie project
const imdbKey = 'ffd182b0d38bdd855bfadafd68978834';

let searchElement = document.getElementById('searchInput');
let searchBtn = document.getElementsByClassName('btn-search')[0];
let resultWrapper = document.getElementById('result-wrapper');
let resultPre = document.getElementById('result-pre');
let resultPost = document.getElementById('result-post');

const movieDetail = (detail) => {
  console.log('MovieDetail:', detail);
};

const createList = (data, query) => {
  // result
  document.getElementById('myList').innerHTML = '';
  resultWrapper.classList.remove('hideItem');
  resultPre.innerHTML = '';
  let preText = document.createTextNode(data.length);
  resultPre.appendChild(preText);

  let postText = document.createTextNode(`'${query}'`);
  resultPost.innerHTML = '';
  resultPost.appendChild(postText);
  resultPost.classList.add('text-italics');

  data.forEach((element) => {
    var x = document.createElement('li');
    x.classList.add('list-item');
    // x.setAttribute('data-toggle', 'modal');
    // x.setAttribute('data-target', '#exampleModal');
    var t = document.createTextNode(element.original_title);
    x.appendChild(t);
    x.addEventListener('click', () => {
      movieDetail(element);
    });
    document.getElementById('myList').appendChild(x);
  });
};

const fetchData = (query) => {
  let res = fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${imdbKey}&language=en-US&query=${query}&page=1&include_adult=true`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      createList(data.results, query);
    });
};

const findMovie = (e) => {
  let query = e.target.value;
  if (e.key === 'Enter' && query.length >= 3) {
    fetchData(query);
  }
};

searchElement.addEventListener('keypress', findMovie);

searchBtn.addEventListener('click', () => {
  if (searchElement.value.length >= 3) {
    fetchData(searchElement.value);
  }
});
