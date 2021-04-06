import { focusElements, unfocusElements } from "./utils/focus.js";
import { onClick } from "./utils/onClick.js";

const getInputsContent = () => {
  const fnameElement = document.getElementById("firstname");
  const lnameElement = document.getElementById("lastname");
  const emailElement = document.getElementById("email");
  const messageElement = document.getElementById("message");

  const firstname = fnameElement.value;
  const lastname = lnameElement.value;
  const email = emailElement.value;
  const message = messageElement.value;

  return {
    firstname,
    lastname,
    email,
    message,
  };
};

const removeModal = () => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;
  const modal = document.getElementById("modal-background");

  mainContainer.style.overflow = "initial";
  body.style.overflow = "initial";

  modal.remove();
  focusElements();
};

const sendForm = () => {
  const inputsData = getInputsContent();

  console.log(inputsData);
};

const addEventsModal = (modalBackground) => {
  const sendButton = document.getElementById("send-modal");
  const closeButton = document.getElementById("close-modal");

  onClick(closeButton, () => {
    removeModal();
  });

  onClick(sendButton, () => {
    sendForm();
    removeModal();
  });
};

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
        <h1 class="modal-title">Contactez-moi<br />${photographer.name}</h1>
        <i class="fal fa-times" id="close-modal" tabindex="0" aria-label="Close Contact form"></i>
      </div>
      <div class="form-modal">
        <label for="firstname" class="label-modal">Prénom</label>
        <input id="firstname" name="firstname" type="text" class="input-modal"/>
        <label for="lastname" class="label-modal">Nom</label> 
        <input id="lastname" name="lastname" type="text" class="input-modal"/>
        <label for="email" class="label-modal">Email</label> 
        <input id="email" name="email" type="email" class="input-modal"/>
        <label for="message" class="label-modal label-message">Votre message</label>
        <textarea name="message" id="message" class="textarea-modal"></textarea>
        <button id="send-modal" aria-label="Send">Envoyer</button>
      </div>
    </div>
  `;

  addEventsModal(modalBackground);
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
