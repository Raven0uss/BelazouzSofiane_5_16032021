import { onClick } from "./utils/onClick.js";

// EventListner function to detect input on lightbox
const eventKeydownLightbox = (e) => {
  console.log(e);
  if (e.key === "Escape") {
    removeLightbox();
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
const removeEventsLightbox = () => {
  document.removeEventListener("keydown", eventKeydownLightbox);
};

// Function to add the events when lightbox is open
const addEventsLightbox = (lightbox) => {
  document.addEventListener("keydown", eventKeydownLightbox);
};

// Function to load the lightbox and display the media inside
const loadLightbox = (media) => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;

  mainContainer.style.overflow = "hidden";
  body.style.overflow = "hidden";

  unfocusElements();
  const lightbox = document.createElement("div");

//   onClick(lightbox, () => {
//     removeLightbox();
//   });

  lightbox.id = "lightbox-container";

  body.insertBefore(lightbox, mainContainer);
  addEventsLightbox(lightbox);
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
    <div id="prev-arrow">Previous</div>
        <img src="./ressources/images/${media.image}" class="media-image" />
        <div id="next-arrow">Next</div>

        `;
  } else if (media.type === "video") {
  }
};

export { removeLightbox, loadLightbox, loadMedia };
