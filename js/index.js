import { get } from "./utils/ft_lodash.js";
import { PhotographersFactory } from "./photographers.js";

const getJson = async () => {
  const response = await fetch("./ressources/json/fisheye-data.json");
  const json = await response.json();
  return json;
};

const main = async () => {
  const json = await getJson();
  // console.log(json);

  const photographersData = get(json, "photographers", []);
  const mediaData = get(json, "media", []);

  const photographers = photographersData.map((photographer) => {
    return PhotographersFactory(photographer);
  });
  // console.log(photographers);
  // console.log(media);
};

main();
