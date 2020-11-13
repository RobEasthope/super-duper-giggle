export const fetchApiData = async (path, request) => {
  const response = await fetch(path, request);
  const payload = await response.json();

  return payload;
};
