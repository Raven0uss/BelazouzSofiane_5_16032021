import { isNil } from "../utils/ft_lodash.js";
import { imageExist } from "../utils/checkImageExist.js";
import { onClick } from "../utils/onClick.js";

const Media = function ({
  id,
  photographerId,
  image,
  video,
  tags,
  likes,
  date,
  price,
}) {
  this.id = id;
  this.photographerId = photographerId;
  this.image = image;
  this.video = video;
  this.tags = tags;
  this.likes = likes;
  this.date = date;
  this.price = price;

  this.type = isNil(image) ? "video" : "image";

  const openLightbox = () => {
    console.log(this.tags);
  };

  const closeLightbox = () => {};

  const nextMedia = () => {};

  const prevMedia = () => {};

  const likeMedia = (likeValueNode) => {
    this.likes += 1;
    likeValueNode.innerText = this.likes;
    updateTotalLikeValue(1);
  };

  const createMediaArticle = () => {
    const mediaArticle = document.createElement("article");
    mediaArticle.className = "media-container";

    const mediaPath = `./ressources/images/${
      this.type === "image" ? this.image : this.video
    }`;
    if (!imageExist(mediaPath)) return null;

    const thumbnail = (() => {
      if (this.type === "image") {
        return `
        <img src="${mediaPath}" class="media-thumbnail" tabindex="0" />
        `;
      } else if (this.type === "video") {
        return `
        <video class="media-thumbnail" preload="metadata" tabindex="0">
            <source src="${mediaPath}#t=0.5" type="video/mp4">
        </video>
        `;
      } else {
        return null;
      }
    })();

    if (isNil(thumbnail)) return null;

    mediaArticle.innerHTML = `
        ${thumbnail}
        <div class="media-informations">
        <p class="media-title">${
          this.type === "image" ? this.image : this.video
        }</p>
        <p class="media-price">${this.price}€</p>
        <div class="media-likes">
          <span class="like-value">${
            this.likes
          }</span><i class="fas fa-heart like-button" tabindex="0"></i>
        </div>
      </div>
    `;
    return mediaArticle;
  };

  const addEventsMediaArticle = ({ mediaElement }) => {
    // Add Like
    const likeIcons = mediaElement.getElementsByClassName("like-button");
    const likeValues = mediaElement.getElementsByClassName("like-value");

    if (likeIcons.length > 0 && likeValues.length > 0) {
      const likeIcon = likeIcons[0];
      const likeValue = likeValues[0];

      onClick(likeIcon, () => {
        likeMedia(likeValue);
      });
    }
    // Add Open LightBox
    const image = mediaElement.childNodes[1];
    onClick(image, () => {
      openLightbox();
    });
  };

  const addMediaArticle = () => {
    const mediaList = document.getElementById("media-list-container");
    const mediaArticle = createMediaArticle();
    if (isNil(mediaArticle)) return null;
    mediaList.append(mediaArticle);
    addEventsMediaArticle({ mediaElement: mediaArticle });
  };

  const updateTotalLikeValue = (toAdd) => {
    const totalLikeNode = document.getElementById("total-like-value");
    let totalLikes = parseInt(totalLikeNode.innerText, 10);
    totalLikes += toAdd;
    totalLikeNode.innerText = totalLikes;
  };

  const onCreate = (() => {
    addMediaArticle();
    updateTotalLikeValue(this.likes);
  })();
};

const MediaFactory = (props) => new Media(props);

export { MediaFactory };
