import baseAPI from "./base-api";

const API_BASE_URL = "/colors";

export const fetchColors = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/`);
    return response.data.results;
  } catch (error) {
    console.log("Erro ao carregar cores:", error);
  }
};

export const fetchOneColor = async (idColor) => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/${idColor}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar cor específica:", error);
  }
};
