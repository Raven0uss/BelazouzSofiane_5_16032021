import { formatTagToText } from "../utils/formatTagToText.js";
import { getQueryParams } from "../utils/getQueryParams.js";
import { addEventContactButton } from "../components/modal.js";

const Photographers = function ({
  name,
  id,
  city,
  country,
  tags,
  tagline,
  price,
  portrait,
  page,
}) {
  this.name = name;
  this.id = id;
  this.city = city;
  this.country = country;
  this.tags = tags;
  this.tagline = tagline;
  this.price = price;
  this.portrait = portrait;

  // Create DOM of a Photographer
  const createPhotographerArticle = () => {
    const photographerArticle = document.createElement("article");
    photographerArticle.className = "photographer-container";
    photographerArticle.innerHTML = `
        <a class="photographer-box" href="./photographer.html?id=${this.id}">
            <img
              src="./ressources/images/Photographers ID Photos/${this.portrait}"
              alt="${this.name}"
              class="photographer-portrait"
            />
            <h2 class="photographer-name">${this.name}</h2>
        </a>
        <p class="photographer-location">${this.city}, ${this.country}</p>
        <p class="photographer-citation">${this.tagline}</p>
        <p class="photographer-price">${this.price}€/jour</p>
      `;
    const photographerTagContainer = document.createElement("div");
    photographerTagContainer.className = "tag-container";
    this.tags.forEach(
      (tag) =>
        (photographerTagContainer.innerHTML += `<a class="tag" aria-label="Tag"><span class="sr-only">#${tag}</span>#${tag}</a>`)
    );
    photographerArticle.appendChild(photographerTagContainer);
    return photographerArticle;
  };

  // Add the photographer node to the DOM
  const addPhotographerArticle = () => {
    const photographerList = document.getElementById("photographer-list");
    const photographerArticle = createPhotographerArticle();
    photographerList.append(photographerArticle);
  };

  // Add the link for the tags on <a> element tag on photographer.html
  const addLinksTagsPhotographer = () => {
    const queryParams = getQueryParams();
    const { id } = queryParams;

    const tagsElements = document.getElementsByClassName("tag");
    Array.from(tagsElements).forEach((tagElement) => {
      const tag = formatTagToText(tagElement.textContent);
      tagElement.setAttribute("href", `photographer.html?id=${id}&tag=${tag}`);
    });
  };

  // Create DOM of a Photographer for photographer.html
  const createPhotographerHead = () => {
    const photographerHead = document.createElement("div");
    photographerHead.id = "photographer-main-head-container";

    let photographerHeadTags = '<div class="photographer-tags-container">';
    for (let index = 0; index < this.tags.length; index++) {
      const element = this.tags[index];

      photographerHeadTags += `<a class="tag" tabindex="0" aria-label="Tag"><span class="sr-only">#${element}</span>#${element}</a>`;
    }
    photographerHeadTags += "</div>";
    photographerHead.innerHTML = `
        <div class="photographer-informations">
          <h1 class="photographer-name">${this.name}</h1>
          <p class="photographer-location">${this.city}, ${this.country}</p>
          <p class="photographer-quote">${this.tagline}</p>
          ${photographerHeadTags}
        </div>
      <button id="contact-btn" aria-label="Contact Me">
        Contactez-moi
      </button>
      <img
        src="ressources/images/Photographers ID Photos/${this.portrait}"
        class="photographer-image"
        alt=""
      />
      <div class="total-likes-and-price-container">
        <div class="total-likes"><span id="total-like-value">0</span><span class="fas fa-heart"></span></div>
        <p class="photographer-price">${this.price}€ / jour</p>
      </div>
    `;
    return photographerHead;
  };

  // Add the photographer node to the DOM for photographer.html
  const addHeadPhotographer = () => {
    const photographerMain = document.getElementById("photographer-main");
    const photographerHeadContainer = createPhotographerHead();
    photographerMain.prepend(photographerHeadContainer);

    addLinksTagsPhotographer();
    addEventContactButton(this);
  };

  // Function called when the instance is set
  (() => {
    if (page === "index") {
      addPhotographerArticle();
    }
    if (page === "photographer") addHeadPhotographer();
  })();
};

const PhotographersFactory = (props) => new Photographers(props);

export { PhotographersFactory };
