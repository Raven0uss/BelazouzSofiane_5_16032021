// Function which fetch JSON and return it
const getJson = async (path) => {
  const response = await fetch(path);
  const json = await response.json();
  return json;
};

export { getJson };
