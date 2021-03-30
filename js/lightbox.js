import { onClick } from "./utils/onClick.js";

const unfocusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable.forEach((element) => element.setAttribute("tabindex", "-1"));
};

const focusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex="-1"]'
  );
  focusable.forEach((element) => element.removeAttribute("tabindex", "-1"));
  focusable.forEach((element) => element.setAttribute("tabindex", "0"));
};

const addEventsLightbox = (lightbox) => {
  console.log("wesh");
  document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key === "Escape") {
      removeLightbox();
    }
  });
  //   lightbox.focus();
  //   lightbox.addEventListener("");
  //   lightbox.addEventListener("");
  //   lightbox.addEventListener("");
};

const loadLightbox = (media) => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;

  mainContainer.style.overflow = "hidden";
  body.style.overflow = "hidden";

  unfocusElements();
  const lightbox = document.createElement("div");

  onClick(lightbox, () => {
    removeLightbox();
  });

  lightbox.id = "lightbox-container";

  body.insertBefore(lightbox, mainContainer);
  addEventsLightbox(lightbox);
};

const removeLightbox = () => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;
  const lightbox = document.getElementById("lightbox-container");

  mainContainer.style.overflow = "initial";
  body.style.overflow = "initial";

  lightbox.remove();
  focusElements();
};

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
