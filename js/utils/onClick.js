import { isNil } from "./ft_lodash.js";

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
