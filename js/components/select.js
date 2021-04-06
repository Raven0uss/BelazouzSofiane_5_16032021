import { onClick } from "../utils/onClick.js";

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

const selectButtonEvent = () => {
  const button = document.getElementById("select-button");

  button.addEventListener("click", toggleSelectMenu);
};

export { selectButtonEvent };
