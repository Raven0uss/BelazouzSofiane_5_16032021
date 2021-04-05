import { onClick } from "./utils/onClick.js";

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

// Function to unfocus the elements when lightbox is open
const unfocusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable.forEach((element) => element.setAttribute("tabindex", "-1"));
};

// Function to focus again the elements when lightbox is closed
const focusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex="-1"]'
  );
  focusable.forEach((element) => element.removeAttribute("tabindex", "-1"));
  focusable.forEach((element) => element.setAttribute("tabindex", "0"));
};

// Function to remove the events when lightbox is closed
const removeEventsLightbox = (media) => {
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
const loadLightbox = (media) => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;

  mainContainer.style.overflow = "hidden";
  body.style.overflow = "hidden";

  unfocusElements();
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox-container";

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
      <i class="fas fa-chevron-left" id="prev-arrow" tabindex="0"></i>
        <img src="./ressources/images/${media.image}" class="media-image" />
        <div class="lightbox-right-control">
        <i class="fas fa-chevron-right" id="next-arrow" tabindex="0"></i>
        <i class="fal fa-times" id="close-lightbox" tabindex="0"></i>
        </div>
        `;
  } else if (media.type === "video") {
    lightbox.innerHTML = `
      <i class="fas fa-chevron-left" id="prev-arrow" tabindex="0"></i>
      <video class="media-image" controls autoplay>
        <source src="./ressources/images/${media.video}" type="video/mp4">
      </video>
      <div class="lightbox-right-control">
        <i class="fas fa-chevron-right" id="next-arrow" tabindex="0"></i>
        <i class="fal fa-times" id="close-lightbox" tabindex="0"></i>
      </div>
      `;
  }
  addEventsLightbox(lightbox, media);
};

export { removeLightbox, loadLightbox, loadMedia };
