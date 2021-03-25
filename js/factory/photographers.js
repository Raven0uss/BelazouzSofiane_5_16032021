const Photographers = function ({
  name,
  id,
  city,
  country,
  tags,
  tagline,
  price,
  portrait,
}) {
  this.name = name;
  this.id = id;
  this.city = city;
  this.country = country;
  this.tags = tags;
  this.tagline = tagline;
  this.price = price;
  this.portrait = portrait;

  const createPhotographerArticle = () => {
    const photographerArticle = document.createElement("article");
    photographerArticle.className = "photographer-container";
    photographerArticle.innerHTML = `
        <a class="photographer-box" href="./pages/photographer-page.html?id=${this.id}">
            <img
              src="./ressources/images/Photographers\ ID\ Photos/${this.portrait}"
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
        (photographerTagContainer.innerHTML += `<a class="tag"><span class="sr-only">#${tag}</span>#${tag}</a>`)
    );
    photographerArticle.appendChild(photographerTagContainer);
    return photographerArticle;
  };

  const addPhotographerArticle = () => {
    const photographerList = document.getElementById("photographer-list");
    const photographerArticle = createPhotographerArticle();
    photographerList.append(photographerArticle);
  };

  const onCreate = (() => {
    addPhotographerArticle();
  })();
};

const PhotographersFactory = (props) => new Photographers(props);

export { PhotographersFactory };
