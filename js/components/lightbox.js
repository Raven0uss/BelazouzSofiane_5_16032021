import { onClick } from "../utils/onClick.js";
import { focusElements, unfocusElements } from "../utils/focus.js";

let nextMedia = () => {};
let prevMedia = () => {};

// EventListner function to detect input on lightbox
const eventKeydownLightbox = (e) => {
  if (e.key === "Escape") {
    removeLightbox();
  }
  if (e.key === "ArrowRight") {
    nextMedia();
  }
  if (e.key === "ArrowLeft") {
    prevMedia();
  }
};

// Function to remove the events when lightbox is closed
const removeEventsLightbox = () => {
  document.removeEventListener("keydown", eventKeydownLightbox);
};

// Function to add the events when lightbox is open
const addEventsLightbox = (lightbox, media) => {
  nextMedia = () => {
    loadMedia(media.nextMedia);
  };
  prevMedia = () => {
    loadMedia(media.prevMedia);
  };
  document.addEventListener("keydown", eventKeydownLightbox);

  const prevArrow = document.getElementById("prev-arrow");
  const nextArrow = document.getElementById("next-arrow");
  const closeLightbox = document.getElementById("close-lightbox");

  onClick(prevArrow, () => prevMedia());
  onClick(nextArrow, () => nextMedia());
  onClick(closeLightbox, () => removeLightbox());

  document.activeElement.blur();
};

// Function to load the lightbox and display the media inside
const loadLightbox = () => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;

  mainContainer.style.overflow = "hidden";
  body.style.overflow = "hidden";

  unfocusElements();
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox-container";
  lightbox.setAttribute("aria-label", "image closeup view");

  body.insertBefore(lightbox, mainContainer);
};

// Function to delete on DOM the lightbox component
const removeLightbox = () => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;
  const lightbox = document.getElementById("lightbox-container");

  mainContainer.style.overflow = "initial";
  body.style.overflow = "initial";

  lightbox.remove();
  focusElements();
  removeEventsLightbox();
};

// Function which insert the DOM for the lightbox
const loadMedia = (media) => {
  const lightbox = document.getElementById("lightbox-container");
  if (media.type === "image") {
    lightbox.innerHTML = `
      <span class="fas fa-chevron-left" id="prev-arrow" tabindex="0" aria-label="Previous image"></span>
        <img src="./ressources/images/${media.image}" class="media-image" alt="${media.description}" />
        <div class="lightbox-right-control">
        <span class="fas fa-chevron-right" id="next-arrow" tabindex="0" aria-label="Next image"></span>
        <span class="fal fa-times" id="close-lightbox" tabindex="0" aria-label="Close dialog"></span>
        </div>
        `;
  } else if (media.type === "video") {
    lightbox.innerHTML = `
      <span class="fas fa-chevron-left" id="prev-arrow" tabindex="0" aria-label="Previous image"></span>
      <video class="media-image" controls autoplay alt="${media.description}">
        <source src="./ressources/images/${media.video}" type="video/mp4">
      </video>
      <div class="lightbox-right-control">
        <span class="fas fa-chevron-right" id="next-arrow" tabindex="0" aria-label="Next image"></span>
        <span class="fal fa-times" id="close-lightbox" tabindex="0" aria-label="Close dialog"></span>
      </div>
      `;
  }
  addEventsLightbox(lightbox, media);
};

export { removeLightbox, loadLightbox, loadMedia };
