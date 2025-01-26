import baseAPI from "./base-api";

const BASE_URL = `/auth`;

export const validateToken = async () => {
  const response = await baseAPI.get(`${BASE_URL}/validate`);
  return response.data;
};
