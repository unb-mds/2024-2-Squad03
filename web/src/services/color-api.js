import baseAPI from "./base-api";

const BASE_URL = `/colors`;

export const fetchColors = async () => {
  const response = await baseAPI.get(`${BASE_URL}/`);
  return response.data.results;
};

export const fetchOneColor = async (idColor) => {
  const response = await baseAPI.get(`${BASE_URL}/${idColor}`);
  return response.data;
};
