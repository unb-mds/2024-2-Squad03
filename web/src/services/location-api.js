import baseAPI from "./base-api";

const BASE_URL = `/locations`;

export const fetchLocations = async () => {
  const response = await baseAPI.get(`${BASE_URL}/`);
  return response.data.results;
};

export const fetchOneLocation = async (idLocation) => {
  const response = await baseAPI.get(`${BASE_URL}/${idLocation}`);
  return response.data;
};
