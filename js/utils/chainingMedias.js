import { isNil } from "./ft_lodash.js";

const chainingMedias = (medias) => {
  const mediasLength = medias.length;

  medias.forEach((media) => {
    media.prevMedia = null;
    media.nextMedia = null;
  });

  medias.forEach((media, index) => {
    if (index === 0) {
      media.prevMedia = medias[mediasLength - 1];
    }
    if (index === mediasLength - 1) {
      media.nextMedia = medias[0];
    }
    if (isNil(media.nextMedia)) {
      media.nextMedia = medias[index + 1];
    }
    if (isNil(media.prevMedia)) {
      media.prevMedia = medias[index - 1];
    }
  });
};

export { chainingMedias };
