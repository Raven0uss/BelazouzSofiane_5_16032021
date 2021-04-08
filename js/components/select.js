import { chainingMedias } from "../utils/chainingMedias.js";
import { onClick } from "../utils/onClick.js";


// Re-write the DOM with medias sorted
const reloadMedias = (medias) => {
  const mediaList = document.getElementById("media-list-container");
  mediaList.innerHTML = "";

  medias.forEach((media) => media.createMedia());
};

const sortByTitle = (medias) => {
  medias.sort((a, b) => (a.title > b.title ? 1 : -1));
  chainingMedias(medias);
  reloadMedias(medias);
};

const sortByPopularity = (medias) => {
  medias.sort((a, b) => b.likes - a.likes);
  chainingMedias(medias);
  reloadMedias(medias);
};

const sortByDate = (medias) => {
  medias.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return aDate > bDate ? -1 : 1;
  });
  chainingMedias(medias);
  reloadMedias(medias);
};

const sortMedias = (medias, sortBy) => {
  switch (sortBy) {
    case "Popularité":
      sortByPopularity(medias);
      break;
    case "Date":
      sortByDate(medias);
      break;
    case "Titre":
      sortByTitle(medias);
      break;
    default:
      break;
  }
};

// Open the select
const openSelectMenu = ({ selectButton, selectMenu, wrapper }) => {
  selectButton.className = "select-button-open";
  selectMenu.className = "select-menu-open";
  wrapper.className = "select-wrapper-open";

  selectButton.setAttribute("aria-expanded", "true");
};

// Close the select
const closeSelectMenu = ({ selectButton, selectMenu, wrapper }) => {
  selectButton.className = "select-button-close";
  selectMenu.className = "select-menu-close";
  wrapper.className = "select-wrapper-close";

  selectButton.setAttribute("aria-expanded", "false");
};

// Toggle which target the Nodes elements
const toggleSelectMenu = () => {
  const wrapper = document.getElementById("select-wrapper");
  const selectButton = document.getElementById("select-button");
  const selectMenu = document.getElementById("select-menu");

  const open = wrapper.className === "select-wrapper-open";

  if (open) {
    closeSelectMenu({
      selectButton,
      selectMenu,
      wrapper,
    });
  } else {
    openSelectMenu({
      selectMenu,
      selectButton,
      wrapper,
    });
  }
};

// Function which select the value selected and make the properties updates 
const selectElement = (element, button, medias) => {
  const textValue = element.innerText;

  const selectMenu = document.getElementById("select-menu");

  const active = document.getElementById(
    selectMenu.getAttribute("aria-activedescendant")
  );
  const activeSeparator = document.getElementById(
    `${selectMenu.getAttribute("aria-activedescendant")}-separator`
  );

  active.className = "select-element";
  activeSeparator.className = "select-separator";

  button.innerHTML = `${textValue}<span class="fas fa-chevron-up select-up"></span>
  <span class="fas fa-chevron-down select-down"></span>`;

  const elementId = element.id;
  selectMenu.setAttribute("aria-activedescendant", elementId);
  element.className = "select-element element-selected";

  const separator = document.getElementById(`${elementId}-separator`);
  separator.className = "select-separator element-selected";

  toggleSelectMenu();

  sortMedias(medias, textValue);
};

// Target the button to toggle the dropdown
const selectButtonEvent = (medias) => {
  const button = document.getElementById("select-button");
  const elements = document.getElementsByClassName("select-element");

  button.addEventListener("click", toggleSelectMenu);

  Array.from(elements).forEach((element) => {
    onClick(element, () => selectElement(element, button, medias));
  });
};

export { selectButtonEvent };
