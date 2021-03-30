const imageExist = (image) => {
  const http = new XMLHttpRequest();
  http.open("HEAD", image, false);
  http.send();
  return http.status !== 404;
};

export { imageExist };
