import { get, isNil } from "./utils/ft_lodash.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { getJson } from "./utils/getJson.js";
import { PhotographersFactory } from "./factory/photographersFactory.js";
import "./components/select.js";
import { MediaFactory } from "./factory/mediaFactory.js";
import { selectButtonEvent } from "./components/select.js";

// Function which return the data filtered for the DOM
const getPhotographerAndMedia = ({ photographersData, mediaData, idProp }) => {
  const id = parseInt(idProp, 10);
  if (id === NaN || isNil(id)) {
    // redirect index page
    return;
  }

  const photographerData = photographersData.find(
    (photographer) => photographer.id === id
  );
  if (isNil(photographerData)) {
    // redirect index page
    return;
  }
  const medias = mediaData.filter((media) => media.photographerId === id);
  if (isNil(mediaData)) {
    // redirect index page
    return;
  }

  return {
    photographer: photographerData,
    medias,
  };
};

const main = async () => {
  // Get the JSON and Query Params
  const json = await getJson("./ressources/json/fisheye-data.json");
  const queryParams = getQueryParams();

  const photographersData = get(json, "photographers", []);
  const mediaData = get(json, "media", []);

  // Check if photographerId is set in URL
  if ("id" in queryParams) {
    const pageData = getPhotographerAndMedia({
      photographersData,
      mediaData,
      idProp: queryParams.id,
    });

    const photographer = PhotographersFactory({
      ...pageData.photographer,
      page: "photographer",
    });

    let rawMedias = pageData.medias;
    // If tag is set, filter the medias contain the tag
    if ("tag" in queryParams) {
      const { tag } = queryParams;
      rawMedias = rawMedias.filter((media) => {
        return media.tags.includes(tag);
      });
    }

    // Get the mediasFactory in an array
    const medias = rawMedias
      .map((media, index, mediaList) => {
        return MediaFactory({ ...media, mediaList, mediaIndex: index });
      })
      .filter((media) => media !== null);

    const mediasLength = medias.length;

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

    selectButtonEvent();
  } else {
    // redirect index page
    return;
  }
};

main();
