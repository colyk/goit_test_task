const API_KEY = '22266127-db302679df0bdd8047c8ab7f9';
const API_URL = 'https://pixabay.com/api/';
const IMAGES_PP = 20;

let last_query;
let current_page = 0;

var imagesContainer = document.getElementsByTagName('ul')[0];
var searchInput = document.getElementById('search-form').getElementsByTagName('input')[0];

const observer = new IntersectionObserver(onIntersection);

searchInput.addEventListener('input', onSearchInput);

function onSearchInput() {
  current_page = 0;
  imagesContainer.innerHTML = '';

  let query = searchInput.value;
  if (query) {
    last_query = query;
    fetchImages(query).then(data => insertImages(data.hits));
  }
}

function fetchImages(query) {
  current_page++;

  return fetch(API_URL + '?' + new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: IMAGES_PP,
    page: current_page
  })).then(res => res.json());
}

function onIntersection([entry]) {
  if (entry.isIntersecting) {
    fetchImages(last_query).then(data => insertImages(data.hits));
  }
}

function insertImages(data) {
  observer.disconnect();

  let imageCard;
  for (let i = 0; i < data.length; i++) {
    imageCard = createImageCard(data[i]);
    imagesContainer.append(imageCard);
  }
  if (imageCard) {
    observer.observe(imageCard);
  }
}

function createImageCard(imageData) {
  const li = document.createElement('li');
  li.addEventListener('click', onImageCardClick);

  const a = document.createElement('a');
  a.href = imageData.largeImageURL;

  const img = document.createElement('img');
  img.src = imageData.webformatURL.replace('_640', '_340');
  img.alt = imageData.tags;

  a.append(img);
  li.append(a);
  return li;
}

function onImageCardClick(e) {
  e.preventDefault();
  let img = e.target;
  let a = img.parentElement;
  basicLightbox.create(`<img src="${a.href}" alt="img.alt">`).show();
}

