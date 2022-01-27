//Enter - click functionality
function handleEnter(e){
  let keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode == '13') {
    document.activeElement.click();
  }
};

//Sorting by title
function sortList() {
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
}

const sortBtn = document.querySelector("#title-sort");
sortBtn.onclick = () => {
  sortList();
}