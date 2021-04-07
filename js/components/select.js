import { chainingMedias } from "../utils/chainingMedias.js";
import { onClick } from "../utils/onClick.js";

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

    return (aDate > bDate ? -1 : 1)
  });
  chainingMedias(medias);
  reloadMedias(medias);
};

const sortMedias = (medias, sortBy) => {
  let list = document.querySelector("#media-list-container");

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

const openSelectMenu = ({ selectButton, selectMenu, wrapper }) => {
  selectButton.className = "select-button-open";
  selectMenu.className = "select-menu-open";
  wrapper.className = "select-wrapper-open";
};

const closeSelectMenu = ({ selectButton, selectMenu, wrapper }) => {
  selectButton.className = "select-button-close";
  selectMenu.className = "select-menu-close";
  wrapper.className = "select-wrapper-close";
};

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

const selectElement = (element, button, medias) => {
  const textValue = element.innerText;

  element.innerText = button.innerText;
  button.innerHTML = `${textValue}<i class="fas fa-chevron-up select-up"></i>
  <i class="fas fa-chevron-down select-down"></i>`;
  toggleSelectMenu();

  sortMedias(medias, textValue);
};

const selectButtonEvent = (medias) => {
  const button = document.getElementById("select-button");
  const elements = document.getElementsByClassName("select-element");

  button.addEventListener("click", toggleSelectMenu);

  Array.from(elements).forEach((element) => {
    onClick(element, () => selectElement(element, button, medias));
  });
};

export { selectButtonEvent };
