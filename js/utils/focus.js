// Function to unfocus the elements when lightbox or modal is open
const unfocusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable.forEach((element) => element.setAttribute("tabindex", "-1"));
};

// Function to focus again the elements when lightbox or modal is closed
const focusElements = () => {
  const focusable = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex="-1"]'
  );
  focusable.forEach((element) => element.removeAttribute("tabindex", "-1"));
  focusable.forEach((element) => element.setAttribute("tabindex", "0"));
};

export { unfocusElements, focusElements };
