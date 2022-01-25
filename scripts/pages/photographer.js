//Add JavaScript code linked to the photographer.html page

//Getting access to page ID
const urlAccess = new URLSearchParams(document.location.search);
const idAccess = urlAccess.get('id');

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
  const picture = `assets/photographers/${portrait}`;
  const pictures = `assets/images/individual/${photographerId}/${image}`;
  const videos = `assets/images/individual/${photographerId}/${video}`;

  //Getting content for the Photograph-header section
  function getPhotoCardDOM() {
    const photographCard = document.createElement( 'div' );
    const h1 = document.createElement( 'h1' );
    const h2 = document.createElement( 'h2' );
    const p = document.createElement( 'p' );
    const textBlock = document.createElement( 'div' );
    const img = document.createElement( 'img' );
    const buttonElement = document.querySelector(".contact_button");
    const fixedRatesBox = document.querySelector("#rates");
    const modalHeader = document.querySelector("#modal-header");

    h1.textContent = name;   
    h2.textContent = `${city}, ${country}`;
    p.textContent = tagline;
    fixedRatesBox.textContent = `${price}€ / day`;
    modalHeader.textContent = name;

    photographCard.setAttribute("class", "photograph-card");
    textBlock.setAttribute("class", "photograph-card-text");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    
    textBlock.appendChild(h1);
    textBlock.appendChild(h2);
    textBlock.appendChild(p);
    photographCard.appendChild(textBlock);
    photographCard.appendChild(buttonElement);
    photographCard.appendChild(img);

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

    container.setAttribute("class", "image-container");
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
};

//Function to sum up previous ones
async function initMedia() {
  const { photographers, media } = await getMedia();
  const filterMedia = media.filter((item) => item.photographerId == idAccess);
  const filterPhoto = photographers.filter((item) => item.id == idAccess);

  displayMedia(filterMedia, filterPhoto);

  //Gallery preview display
  const galleryItem = document.querySelectorAll('.gallery-item');
  const lightBoxModal = document.querySelector('#modal-lightbox');
  const lightBox = document.querySelector('.lightbox');
  const imgContainer = document.querySelectorAll('.image-title');
  const closeIcon = document.querySelector("#closeIcon");
  const titleForCloseView = document.createElement( 'span' );
  const lightBoxPhoto = document.createElement( 'img' );
  const lightBoxVideo = document.createElement( 'video' );

  titleForCloseView.setAttribute("class", "image-title-preview");

  lightBox.appendChild(lightBoxPhoto);
  lightBox.appendChild(lightBoxVideo);
  lightBox.appendChild(titleForCloseView);

  window.onload = () => {
    for (let i = 0; i < galleryItem.length; i++) {
      let currentIndex = i;

      galleryItem[currentIndex].onclick = () => {
        lightBoxModal.style.display = "block";

        function preview () {
          let selectedImgUrl = galleryItem[currentIndex].src;
          lightBoxPhoto.src = selectedImgUrl;
          lightBoxVideo.src = selectedImgUrl;
          
          if(galleryItem[currentIndex].getAttribute('type') == 'photo') {
            lightBoxPhoto.style.display = "block";
            lightBoxVideo.style.display = "none";
          } else {
            lightBoxVideo.style.display = "block";
            lightBoxPhoto.style.display = "none";
          }

        }
        preview();

        lightBoxModal.style.display = "block";
        
        let elementTitle = imgContainer[currentIndex].innerHTML;
        
        titleForCloseView.innerHTML = elementTitle;

        //Previous and next buttons
        const prevBtn = document.querySelector("#leftArr");
        const nextBtn = document.querySelector("#rightArr");

        if (currentIndex == 0) {
          prevBtn.style.display = "none";
        }

        if (currentIndex >= galleryItem.length - 1) {
          nextBtn.style.display = "none";
        }
        
        nextBtn.onclick = () => {
          currentIndex++;
          if (currentIndex >= galleryItem.length - 1) {
            preview();
            nextBtn.style.display = "none";
          } else {
            preview();
            prevBtn.style.display = "block";
          }
        }

        prevBtn.onclick = () => {
          currentIndex--;
          if (currentIndex == 0) {
            preview();
            prevBtn.style.display = "none";
          } else {
            preview();
            nextBtn.style.display = "block";
          }
        }

        closeIcon.onclick = () => {
          lightBoxModal.style.display = "none";
          prevBtn.style.display = "block";
          nextBtn.style.display = "block";
          currentIndex = i;
        }

      }
    }
  }

};

initMedia();