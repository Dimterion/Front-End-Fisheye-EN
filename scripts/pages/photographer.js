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
}

//Factory for generating content on each page
function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price, name, portrait, city, country, tagline } = data;
  //Checking individual portrait --> console.log(data.portrait);
  
  const picture = `assets/photographers/${portrait}`;
  const pictures = `assets/images/individual/${photographerId}/${image}`;
  const videos = `assets/images/individual/${photographerId}/${video}`;

  //Getting content for the Photograph-header section
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
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    
    const buttonElement = document.querySelector(".contact_button");

    photographCard.appendChild(textBlock);
    photographCard.appendChild(buttonElement);
    photographCard.appendChild(img);

    const fixedRatesBox = document.querySelector("#rates");
    fixedRatesBox.textContent = `${price}€ / day`;

    const modalHeader = document.querySelector("#modal-header");
    modalHeader.textContent = name;

    return (photographCard);
  }

  //Getting content for the pictures section
  function getMediaCardDOM() {
    const container = document.createElement( 'div' );
    let img = document.createElement( 'img' );
    const imgTextBlock = document.createElement( 'div' );
    const titleSpan = document.createElement( 'span' );
    const likesSpan = document.createElement( 'span' );
    const icon = document.createElement( 'i' );

    container.setAttribute("class", "image-container");
    
    if(image !== undefined) {
      img.setAttribute("src", pictures);
      img.setAttribute("alt", `${title}`);
      img.setAttribute("id", `${id}`);
      img.setAttribute("class", "gallery-item");
      img.setAttribute("type", "photo");
    }

    if(video !== undefined) {
      img = document.createElement( 'video' );
      img.setAttribute("src", videos);
      img.setAttribute("type", "video");
      img.setAttribute("id", `${id}`);
      img.setAttribute("class", "gallery-item");
    }

    img.setAttribute("onclick", "displayLightBox()");

    icon.setAttribute("class", "fas fa-heart");
    icon.setAttribute("aria-label", "likes");

    imgTextBlock.setAttribute("class", "image-text-block")
    titleSpan.setAttribute("class", "image-title");
    likesSpan.setAttribute("class", "image-likes");

    titleSpan.textContent = title;
    likesSpan.textContent = likes;
    likesSpan.appendChild(icon);
    
    imgTextBlock.appendChild(titleSpan);
    imgTextBlock.appendChild(likesSpan);

    container.appendChild(img);
    container.appendChild(imgTextBlock);

    return (container);
  }

  return { id, photographerId, title, image, video, likes, date, price, name, portrait, city, country, tagline, getMediaCardDOM, getPhotoCardDOM }
}

//Generating data for each section
async function displayMedia(media, photographers) {
  const mediaSection = document.querySelector(".gallery");
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

  /*  LIGHTBOX-IMAGES-VIEW-START
  let lightBoxItem;
  const lightBox = document.querySelector('.lightbox');
  const galleryItem = document.querySelectorAll('.gallery-item');
  let arr = [];
  
  //console.log(galleryItem);
  //console.log(media);

  for (let j = 0; j < galleryItem.length; j++) {
    for (let i = 0; i < media.length; i++) {
      if (media[i].image !== undefined && galleryItem[j].id == media[i].id) {
        lightBoxItem = document.createElement( 'img' );
        lightBoxItem.setAttribute("src", `assets/images/individual/${media[i].photographerId}/${media[i].image}`);
        lightBoxItem.setAttribute("id", `${media[i].id}`);
        lightBox.appendChild(lightBoxItem);
        arr.push(lightBoxItem);
      } else if (media[i].image == undefined && galleryItem[j].id == media[i].id) {
        lightBoxItem = document.createElement( 'video' );
        lightBoxItem.setAttribute("src", `assets/images/individual/${media[i].photographerId}/${media[i].video}`);
        lightBoxItem.setAttribute("id", `${media[i].id}`);
        lightBox.appendChild(lightBoxItem);
        arr.push(lightBoxItem);
      }
    }
    //console.log(`${galleryItem[j].id} / ${lightBoxItem.id}`);
  }

  galleryItem.forEach((l) => {
    console.log(`${l.id} / ${lightBoxItem.id}`);
    if (l.id == lightBoxItem.id) {
      lightBoxItem.setAttribute("style", "display: block");
    } else {
      lightBoxItem.setAttribute("style", "display: none");
    }
  });

  console.log(arr);
  console.log(lightBox);
  LIGHTBOX-IMAGES-VIEW-END */

};

//Function to sum up previous ones
async function initMedia() {
  const { photographers, media } = await getMedia();
  //Checking photographers array --> console.log(photographers);
  //Checking media array --> console.log(media);

  const filterMedia = media.filter((item) => item.photographerId == idAccess);
  const filterPhoto = photographers.filter((item) => item.id == idAccess);

  displayMedia(filterMedia, filterPhoto);

  //Gallery display
  const galleryItem = document.querySelectorAll('.gallery-item');
  const lightBoxModal = document.querySelector('#modal-lightbox');
  const lightBox = document.querySelector('.lightbox');
  
  let lightBoxPhoto = document.createElement( 'img' );
  let lightBoxVideo = document.createElement( 'video' );

  lightBox.appendChild(lightBoxPhoto);
  lightBox.appendChild(lightBoxVideo);

  window.onload = () => {
    for (let k = 0; k < galleryItem.length; k++) {
      galleryItem[k].onclick = () => {
        //console.log([k]);
        function preview () {
          let selectedImgUrl = galleryItem[k].src;
          lightBoxPhoto.src = selectedImgUrl;
          lightBoxVideo.src = selectedImgUrl;
          //console.log(selectedImgUrl);
          //console.log(galleryItem[k].getAttribute('type'));
          if(galleryItem[k].getAttribute('type') == 'photo') {
            lightBoxPhoto.style.display = "block";
            lightBoxVideo.style.display = "none";
          } else {
            lightBoxVideo.style.display = "block";
            lightBoxPhoto.style.display = "none";
          }
        }
        preview();
        lightBoxModal.style.display = "block";
      }
    }
  }

};

initMedia();