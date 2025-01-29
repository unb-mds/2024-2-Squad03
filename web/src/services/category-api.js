import baseAPI from "./base-api";

const API_BASE_URL = "/categories";

export const fetchCategories = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/`);
    return response.data.results;
  } catch (error) {
    console.log("Erro ao carregar categorias:", error);
  }
};

export const fetchOneCategory = async (idCategory) => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/${idCategory}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar categoria específica:", error);
  }
};
