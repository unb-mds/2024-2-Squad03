import baseAPI from "./base-api";

const BASE_URL = `/brands`;

export const fetchBrands = async () => {
  const response = await baseAPI.get(`${BASE_URL}/`);
  return response.data.results;
};

export const fetchOneBrand = async (idBrand) => {
  const response = await baseAPI.get(`${BASE_URL}/${idBrand}/`);
  return response.data;
};
