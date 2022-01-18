//Add JavaScript code linked to the photographer.html page

//Getting access to page ID
const urlAccess = new URLSearchParams(document.location.search);
const idAccess = urlAccess.get('id');
//Checking page ID --> console.log(idAccess);

//Fetching data from json
async function getMedia() {
  let url = 'data/photographers.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
  /* return ({
    photographers: [...photographers, ...photographers, ...photographers],
    media: [...media, ...media, ...media]}); */
}

//Factory for generating content on each page
function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price, name, portrait, city, country, tagline } = data;
  //Checking individual photographerID --> console.log(data.photographerId);
  //Checking individual portrait --> console.log(data.portrait);
  const picture = `assets/photographers/${portrait}`;
  const pictures = `assets/images/${name}/${image}`;

  function getMediaCardDOM() {
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    img.setAttribute("alt", "");
    article.appendChild(img);
    return (article);
  }

  function getPhotoCardDOM() {
    const photographCard = document.createElement( 'div' );
    photographCard.setAttribute("class", "photograph-card");

    const h1 = document.createElement( 'h1' );
    h1.textContent = name;

    const h2 = document.createElement( 'h2' );
    h2.textContent = `${city}, ${country}`;

    const p = document.createElement( 'p' );
    p.textContent = tagline;

    const textBlock = document.createElement( 'div' );
    textBlock.setAttribute("class", "photograph-card-text");

    textBlock.appendChild(h1);
    textBlock.appendChild(h2);
    textBlock.appendChild(p);

    const img = document.createElement( 'img' );
    img.setAttribute("alt", name);
    img.setAttribute("src", picture);
    
    const buttonElement = document.querySelector(".contact_button");

    photographCard.appendChild(textBlock);
    photographCard.appendChild(buttonElement);
    photographCard.appendChild(img);

    return (photographCard);
  }

  return { id, photographerId, title, image, likes, date, price, name, portrait, city, country, tagline, getMediaCardDOM, getPhotoCardDOM }
}

//Generating data for each section

async function displayMedia(media, photographers) {
  const mediaSection = document.querySelector("main");
  const headerSection = document.querySelector(".photograph-header");
  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  photographers.forEach((photographer) => {
    const photoModel = mediaFactory(photographer);
    const photoCardDOM = photoModel.getPhotoCardDOM();
    headerSection.appendChild(photoCardDOM);
  });
};

//Function to sum up previous ones

async function initMedia() {
  const { photographers, media } = await getMedia();
  //Checking photographers array --> console.log(photographers);
  //Checking media array --> console.log(media);

  const filterMedia = media.filter((item) => item.photographerId == idAccess);
  const filterPhoto = photographers.filter((item) => item.id == idAccess);

  displayMedia(filterMedia, filterPhoto);
};

initMedia();