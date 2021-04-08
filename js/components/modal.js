import { focusElements, unfocusElements } from "../utils/focus.js";
import { onClick } from "../utils/onClick.js";

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

const escapeKeydownModal = (e) => {
  if (e.key === "Escape") {
    removeModal();
  }
};

// Remove modal from DOM and enable back the accessibility for the page
const removeModal = () => {
  const mainContainer = document.getElementById("photographer-page");
  const body = document.body;
  const modal = document.getElementById("modal-background");
  const button = document.getElementById("contact-btn");

  mainContainer.style.overflow = "initial";
  body.style.overflow = "initial";

  document.removeEventListener("keydown", escapeKeydownModal);

  modal.remove();
  focusElements();
  button.focus();
};

const sendForm = () => {
  const inputsData = getInputsContent();

  console.log(inputsData);
};

const addEventsModal = () => {
  const sendButton = document.getElementById("send-modal");
  const closeButton = document.getElementById("close-modal");

  onClick(closeButton, () => {
    removeModal();
  });

  onClick(sendButton, () => {
    sendForm();
    removeModal();
  });

  document.addEventListener("keydown", escapeKeydownModal);
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
    <div class="modal" aria-label="Contact me Mimi Keel" aria-labelledby="contact-title">
      <div class="head-modal">
        <h1 class="modal-title" id="contact-title">Contactez-moi<br />${photographer.name}</h1>
        <span class="fal fa-times" id="close-modal" tabindex="0" aria-label="Close Contact form"></span>
      </div>
      <div class="form-modal">
        <label for="firstname" class="label-modal" id="firstname-label" aria-label="First name">Prénom</label>
        <input id="firstname" name="firstname" type="text" class="input-modal" aria-labelledby="firstname-label"/>
        <label for="lastname" class="label-modal" id="lastname-label" aria-label="Last name">Nom</label> 
        <input id="lastname" name="lastname" type="text" class="input-modal" aria-labelledby="lastname-label" />
        <label for="email" class="label-modal" id="email-label" aria-label="Email">Email</label> 
        <input id="email" name="email" type="email" class="input-modal" aria-labelledby="email-label" />
        <label for="message" class="label-modal label-message" id="messsage-label" aria-label="Your message">Votre message</label>
        <textarea name="message" id="message" class="textarea-modal" aria-labelledby="message-label"></textarea>
        <button id="send-modal" aria-label="Send">Envoyer</button>
      </div>
    </div>
  `;

  addEventsModal(modalBackground);
};

// Add the event onclick and onfocus for the contact button to open modal
const addEventContactButton = (photographer) => {
  const contactButton = document.getElementById("contact-btn");

  contactButton.addEventListener("click", () => {
    document.activeElement.blur();
    unfocusElements();
    createModal(photographer);
  });

  // contactButton.click();
};

export { addEventContactButton };
