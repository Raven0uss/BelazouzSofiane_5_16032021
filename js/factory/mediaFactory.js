import { isNil } from "../utils/ft_lodash.js";
import { imageExist } from "../utils/checkImageExist.js";
import { onClick } from "../utils/onClick.js";
import { loadLightbox, loadMedia } from "../components/lightbox.js";

const Media = function ({
  id,
  photographerId,
  image,
  video,
  tags,
  likes,
  date,
  price,
  mediaIndex,
  description
}) {
  this.id = id;
  this.photographerId = photographerId;
  this.image = image;
  this.video = video;
  this.tags = tags;
  this.likes = likes;
  this.date = date;
  this.price = price;
  this.description = description;

  this.nextMedia = null;
  this.prevMedia = null;

  this.mediaIndex = mediaIndex;

  // Determine type of media enum video or image
  this.type = isNil(image) ? "video" : "image";
  this.title = this.type === "image" ? image : video;

  // If true, don't return the media factory
  // (Reason are for exemple a media path incorrect)
  this.toRemove = false;

  // Function to open the lightbox
  const openLightbox = () => {
    loadLightbox(this);
    loadMedia(this);
  };

  // Function to update like
  const likeMedia = (likeValueNode) => {
    this.likes += 1;
    likeValueNode.innerText = this.likes;
    updateTotalLikeValue(1);
  };

  // Create the Node of a Media
  const createMediaArticle = () => {
    const mediaArticle = document.createElement("article");
    mediaArticle.className = "media-container";

    const mediaPath = `./ressources/images/${
      this.type === "image" ? this.image : this.video
    }`;
    if (!imageExist(mediaPath)) return null;

    // Generate HTML for an image or video
    const thumbnail = (() => {
      if (this.type === "image") {
        return `
        <img src="${mediaPath}" class="media-thumbnail" tabindex="0" alt="${this.description}" />
        `;
      } else if (this.type === "video") {
        return `
        <video class="media-thumbnail" preload="metadata" tabindex="0" alt="${this.description}">
            <source src="${mediaPath}#t=0.5" type="video/mp4">
        </video>
        `;
      } else {
        return null;
      }
    })();

    if (isNil(thumbnail)) return null;

    // Generate HTML informations of media
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
          }</span><span class="fas fa-heart like-button" tabindex="0" aria-label="likes"></span>
        </div>
      </div>
    `;
    return mediaArticle;
  };

  // Add the events of a photography
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

  // Add the Node of a media to DOM
  const addMediaArticle = () => {
    const mediaList = document.getElementById("media-list-container");
    const mediaArticle = createMediaArticle();
    if (isNil(mediaArticle)) {
      this.toRemove = true;
      return null;
    }
    mediaList.append(mediaArticle);
    addEventsMediaArticle({ mediaElement: mediaArticle });
  };

  // Update the total likes
  const updateTotalLikeValue = (toAdd) => {
    const totalLikeNode = document.getElementById("total-like-value");
    let totalLikes = parseInt(totalLikeNode.innerText, 10);
    totalLikes += toAdd;
    totalLikeNode.innerText = totalLikes;
  };

  this.createMedia = function () {
    addMediaArticle();
    updateTotalLikeValue(this.likes);
  };

  // Function called when the instance is set
  (() => {
    addMediaArticle();
    updateTotalLikeValue(this.likes);
  })();
};

const MediaFactory = (props) => {
  const media = new Media(props);
  if (media.toRemove) return null;
  return media;
};

export { MediaFactory };
