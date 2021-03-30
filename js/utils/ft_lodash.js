// Function to detect if an element is null or undefined
const isNil = (element) => element === null || element === undefined;

// Function to safely get properties of an object
const get = (element, properties, safeValue = undefined) => {
  try {
    const propertiesReparsed = properties
      .replace(/\[.+?\]/, ".$&")
      .replace(/\[|\]/g, "");
    const path = propertiesReparsed.split(".");
    let value = element;
    path.forEach((key) => {
      value = value[key];
    });
    return value === undefined ? safeValue : value;
  } catch (err) {
    return safeValue;
  }
};

export { isNil, get };
