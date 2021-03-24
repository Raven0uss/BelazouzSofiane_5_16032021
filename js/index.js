import { get } from "./utils/ft_lodash.js";

const getJson = async () => {
  const response = await fetch("./ressources/json/fisheye-data.json");
  const json = await response.json();
  return json;
};

const main = async () => {
  const json = await getJson();
  console.log(json);

  const photographers = get(json, "photographers", []);
  const media = get(json, "media", []);

  console.log(photographers);
  console.log(media);
};

main();
