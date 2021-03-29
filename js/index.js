import { get } from "./utils/ft_lodash.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { getJson } from "./utils/getJson.js";
import { PhotographersFactory } from "./factory/photographersFactory.js";
/*
  When we click on tag, it add a query param to the page with tag selected.
  If there is a query param the filter part keep only profile with the tag
*/

const main = async () => {
  const json = await getJson("./ressources/json/fisheye-data.json");
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
