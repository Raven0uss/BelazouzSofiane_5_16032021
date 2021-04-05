import { get, isNil } from "./utils/ft_lodash.js";
import { getQueryParams } from "./utils/getQueryParams.js";
import { getJson } from "./utils/getJson.js";
import { PhotographersFactory } from "./factory/photographersFactory.js";

// Remove button (link) to scroll top to DOM
const removeButtonScrollTop = (button) => {
  button.remove();
};

// Add button to scroll top to DOM
const addButtonScrollTop = () => {
  const button = document.createElement("a");
  button.id = "scrollTopButton";
  button.setAttribute("href", "#index-page");
  button.innerText = "Passer au contenu"
  
  const main = document.body;
  
  main.prepend(button);
};


// Function which add the event listener to detect if the user has scrolled the page
const scrollListener = () => {
  window.addEventListener("scroll", () => {
    const button = document.getElementById("scrollTopButton");
    if (window.scrollY !== 0) {
      if (isNil(button)) addButtonScrollTop();
    } else {
      if (isNil(button) === false) removeButtonScrollTop(button);
    }
  });
};

const main = async () => {
  // Get the JSON and Query Params
  const json = await getJson("./ressources/json/fisheye-data.json");
  /*
    When we click on tag, it add a query param to the page with tag selected.
    If there is a query param the filter part keep only profile with the tag
  */
  const queryParams = getQueryParams();

  const photographersData = get(json, "photographers", []);
  const mediaData = get(json, "media", []);

  const photographers = photographersData
    .filter((photographer) => {
      // Filter Data if a tag has been selected
      if ("tag" in queryParams && "tags" in photographer) {
        const { tag } = queryParams;
        return photographer.tags.includes(tag);
      }
      return true;
    })
    .map((photographer) => {
      // Return the photographersFactory of each element
      return PhotographersFactory({ ...photographer, page: "index" });
    });

  scrollListener(queryParams);
};

main();
