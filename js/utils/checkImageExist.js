// Function to check if the path of an image is valid. (Useful to check if we can render a component based on image or not)
const imageExist = (image) => {
  const http = new XMLHttpRequest();
  http.open("HEAD", image, false);
  http.send();
  return http.status !== 404;
};

export { imageExist };
