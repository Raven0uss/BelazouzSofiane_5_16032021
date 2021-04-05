import { focusElements, unfocusElements } from "./utils/focus.js";
import { onClick } from "./utils/onClick.js";

const createModal = (photographer) => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;

  mainContainer.style.overflow = "hidden";
  body.style.overflow = "hidden";

  const modalBackground = document.createElement("div");
  modalBackground.id = "modal-background";

  body.insertBefore(modalBackground, mainContainer);

  modalBackground.innerHTML = `
  <div class="modal">
  <div class="head-modal">
        <h1 class="modal-title">Contactez-moi ${photographer.name}</h1>
        <i class="fal fa-times" id="close-modal" tabindex="0"></i>
    </div>
    <form id="modal-form">
        <label for="firstname" class="label-modal">Prénom</label>
        <input id="firstname" name="firstname" type="text" class="input-modal"/>
        <label for="lastname" class="label-modal">Nom</label> 
        <input id="lastname" name="lastname" type="text" class="input-modal"/>
        <label for="email" class="label-modal">Email</label> 
        <input id="email" name="email" type="email" class="input-modal"/>
        <label for="message" class="label-modal">Votre message</label>
        <textarea name="message" id="message" class="textarea-modal"></textarea>
        <button id="send-modal">Envoyer</button>
    </form>
  </div>
  `;
};

// Remove modal from DOM and enable back the accessibility for the page
const closeModal = () => {
  focusElements();
};

// Add the event onclick and onfocus for the contact button to open modal
const addEventContactButton = (photographer) => {
  const contactButton = document.getElementById("contact-btn");

  onClick(contactButton, () => {
    unfocusElements();
    createModal(photographer);
  });

  contactButton.click();
};

export { addEventContactButton };
