const getQueryParams = () => {
  const url = window.location.search.substring(1);
  const params = url.split("&");
  const queryParams = {};
  params.forEach((param) => {
    const splitParam = param.split("=");
    if (splitParam.length !== 2) return;
    queryParams[splitParam[0]] = splitParam[1];
  });
  return queryParams;
};

export { getQueryParams };
