import baseAPI from "./base-api";

const API_BASE_URL = "/brands";

export const fetchBrands = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/`);
    return response.data.results;
  } catch (error) {
    console.log("Erro ao carregar marcas:", error);
  }
};

export const fetchOneBrand = async (idBrand) => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/${idBrand}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar marca específica:", error);
  }
};
