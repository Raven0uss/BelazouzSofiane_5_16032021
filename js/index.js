import { get } from "./utils/ft_lodash.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { PhotographersFactory } from "./photographers.js";

const getJson = async () => {
  const response = await fetch("./ressources/json/fisheye-data.json");
  const json = await response.json();
  return json;
};

/*
  When we click on tag, it add a query param to the page with tag selected.
  If there is a query param the filter part keep only profile with the tag
*/

const main = async () => {
  const json = await getJson();
  const queryParams = getQueryParams();

  const photographersData = get(json, "photographers", []);
  const mediaData = get(json, "media", []);

  const photographers = photographersData
    .filter((photographer) => {
      if ("tag" in queryParams && "tags" in photographer) {
        const { tag } = queryParams;
        return photographer.tags.includes(tag);
      }
      return true;
    })
    .map((photographer) => {
      return PhotographersFactory(photographer);
    });
};

main();
