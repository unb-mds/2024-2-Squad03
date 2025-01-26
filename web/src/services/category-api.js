import baseAPI from "./base-api";

const BASE_URL = `/categories`;

export const fetchCategories = async () => {
  const response = await baseAPI.get(`${BASE_URL}/`);
  return response.data.results;
};
