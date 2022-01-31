const sortPopularityBtn = document.querySelector("#popularity-sort");
const sortDatesBtn = document.querySelector("#date-sort");
const sortTitlesBtn = document.querySelector("#title-sort");

//Enter - click functionality
function handleEnter(e){
  let keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode == '13') {
    document.activeElement.click();
  }
}

//Sorting button
function toggleOrderMenu() {
  const btnsSection = document.querySelector(".buttons-section");
  const orderBtn = document.querySelector("#dropdown-head");
  const orderUpArrow = document.querySelector(".fas.fa-angle-up");
  const orderDownArrow = document.querySelector(".fas.fa-angle-down");
  if (btnsSection.style.display === "block") {
    btnsSection.style.display = "none";
    orderBtn.style.borderBottomLeftRadius = "5px";
    orderBtn.style.borderBottomRightRadius = "5px";
    orderUpArrow.style.display = "none";
    orderDownArrow.style.display = "block";
  } else {
    btnsSection.style.display = "block";
    orderBtn.style.borderBottomLeftRadius = "0";
    orderBtn.style.borderBottomRightRadius = "0";
    orderUpArrow.style.display = "block";
    orderDownArrow.style.display = "none";
  }
}

//Sorting by popularity
function sortPopularity() {
  const btnName = document.querySelector("#order-field-name");
  btnName.innerHTML = "Popularity";
  let gallery, i, switching, imageContainer, shouldSwitch;
  gallery = document.querySelector(".gallery");
  switching = true;
  while (switching) {
    switching = false;
    imageContainer = gallery.querySelectorAll(".image-container");
    for (i = 0; i < (imageContainer.length - 1); i++) {
      shouldSwitch = false;
      if (Number(imageContainer[i].firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.innerHTML) > Number(imageContainer[i + 1].firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      imageContainer[i].parentNode.insertBefore(imageContainer[i + 1], imageContainer[i]);
      switching = true;
    }
  }

  toggleOrderMenu();
  
  sortDatesBtn.style.borderBottomLeftRadius = "0";
  sortDatesBtn.style.borderBottomRightRadius = "0";
  sortDatesBtn.style.borderBottom = "1px solid white";
  
}

sortPopularityBtn.onclick = () => {
  sortPopularity();
}

//Sorting by date
function sortDates() {
  const btnName = document.querySelector("#order-field-name");
  btnName.innerHTML = "Date";
  let gallery, i, switching, imageContainer, shouldSwitch;
  gallery = document.querySelector(".gallery");
  switching = true;
  while (switching) {
    switching = false;
    imageContainer = gallery.querySelectorAll(".image-container");
    for (i = 0; i < (imageContainer.length - 1); i++) {
      shouldSwitch = false;
      if (new Date(imageContainer[i].firstChild.nextSibling.firstChild.nextSibling.innerHTML) > new Date(imageContainer[i + 1].firstChild.nextSibling.firstChild.nextSibling.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      imageContainer[i].parentNode.insertBefore(imageContainer[i + 1], imageContainer[i]);
      switching = true;
    }
  }

  toggleOrderMenu();

  sortDatesBtn.style.borderBottomLeftRadius = "0";
  sortDatesBtn.style.borderBottomRightRadius = "0";
  sortDatesBtn.style.borderBottom = "1px solid white";

}

sortDatesBtn.onclick = () => {
  sortDates();
}

//Sorting by title
function sortTitles() {
  const btnName = document.querySelector("#order-field-name");
  btnName.innerHTML = "Title";
  let gallery, i, switching, imageContainer, shouldSwitch;
  gallery = document.querySelector(".gallery");
  switching = true;
  while (switching) {
    switching = false;
    imageContainer = gallery.querySelectorAll(".image-container");
    for (i = 0; i < (imageContainer.length - 1); i++) {
      shouldSwitch = false;
      if (imageContainer[i].firstChild.nextSibling.firstChild.innerHTML.toLowerCase() > imageContainer[i + 1].firstChild.nextSibling.firstChild.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      imageContainer[i].parentNode.insertBefore(imageContainer[i + 1], imageContainer[i]);
      switching = true;
    }
  }
  
  toggleOrderMenu();

  sortDatesBtn.style.borderBottomLeftRadius = "0px";
  sortDatesBtn.style.borderBottomRightRadius = "0px";
  sortDatesBtn.style.borderBottom = "none";
  sortDatesBtn.style.borderBottom = "1px solid white";

}

sortTitlesBtn.onclick = () => {
  sortTitles();
}