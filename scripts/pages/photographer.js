//Add JavaScript code linked to the photographer.html page
async function getMedia() {
  let url = 'data/photographers.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
  return ({
    media: [...media, ...media, ...media]})
}

