const loader = document.getElementById("loader");

const count = 10;
const query = "dogs";
const apiKey = "AUG9ywS4bLCkVJzwODqyWcbZhIYRYme31wgliTw_Vtg";

const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    document.getElementById("loader").style.display = "none";
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const imageContainer = document.getElementById("image-container");
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    const text = document.createElement("p");
    text.textContent = photo.alt_description;

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
    imageContainer.appendChild(text);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    ready = false;
    getPhotos();
  }
});
