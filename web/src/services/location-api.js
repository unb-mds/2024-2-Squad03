import baseAPI from "./base-api";

const API_BASE_URL = "/locations";

export const fetchLocations = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/`);
    return response.data.results;
  } catch (error) {
    console.log("Erro ao carregar locais:", error);
  }
};

export const fetchOneLocation = async (idLocation) => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/${idLocation}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar local específico:", error);
  }
};
