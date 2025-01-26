import baseAPI from "./base-api";

const BASE_URL = `/items`;

export const fetchLostItems = async (page = 1) => {
  const response = await baseAPI.get(`${BASE_URL}/lost/`, {
    params: { page },
  });
  return response.data;
};

export const fetchFoundItems = async (page = 1) => {
  const response = await baseAPI.get(`${BASE_URL}/found/`, {
    params: { page },
  });
  return response.data;
};

export const fetchItem = async (idItem) => {
  const response = await baseAPI.get(`${BASE_URL}/${idItem}/`);
  return response.data;
};

export const saveItem = async (formData) => {
  const response = await baseAPI.post(`${BASE_URL}/`, formData);
  return response.data;
};
