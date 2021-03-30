import { isNil } from "./ft_lodash.js";

// Function to manage the keypress and click directly
const onClick = (element, callback) => {
  if (isNil(element)) return;
  try {
    element.addEventListener("click", () => {
      callback();
    });
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") callback();
    });
  } catch (err) {
    return;
  }
};

export { onClick };
