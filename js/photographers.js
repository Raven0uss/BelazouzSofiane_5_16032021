import { get, isNil } from "./utils/ft_lodash.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { getJson } from "./utils/getJson.js";
import { PhotographersFactory } from "./factory/photographersFactory.js";
import "./components/select.js";
import { MediaFactory } from "./factory/mediaFactory.js";

const getPhotographerAndMedia = ({ photographersData, mediaData, idProp }) => {
  const id = parseInt(idProp, 10);
  if (id === NaN || isNil(id)) {
    // redirect index page
    return;
  }

  console.log("--- Get Data Function --- ");
  console.log(photographersData);
  console.log(mediaData);
  console.log(id);

  const photographerData = photographersData.find(
    (photographer) => photographer.id === id
  );
  if (isNil(photographerData)) {
    // redirect index page
    return;
  }
  const mediasPhotographer = mediaData.filter((media) => media.photographerId === id);
  if (isNil(mediaData)) {
    // redirect index page
    return;
  }

  const medias = mediasPhotographer.map((media) => {
    return MediaFactory(media);
  })

  return {
    photographer: photographerData,
    medias,
  };
};

const main = async () => {
  const json = await getJson("./ressources/json/fisheye-data.json");
  const queryParams = getQueryParams();

  const photographersData = get(json, "photographers", []);
  const mediaData = get(json, "media", []);

  console.log(queryParams);
  console.log(photographersData);
  console.log(mediaData);

  if ("id" in queryParams) {
    const pageData = getPhotographerAndMedia({
      photographersData,
      mediaData,
      idProp: queryParams.id,
    });
    console.log(pageData);
  } else {
    // redirect index page
    return;
  }
};

main();
