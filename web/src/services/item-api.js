import baseAPI from "./base-api";
import { filtersState } from "@/store/filters";

const API_BASE_URL = "/items";

export const fetchLostItems = async ({ page = 1 }) => {
  const params = {
    page,
    ...(filtersState.searchQuery && { search: filtersState.searchQuery }),
    ...(filtersState.activeCategory && {
      category_name: filtersState.activeCategory,
    }),
    ...(filtersState.activeLocation && {
      location_name: filtersState.activeLocation,
    }),
  };

  const response = await baseAPI.get(`${API_BASE_URL}/lost/`, { params });
  return response.data;
};

export const fetchFoundItems = async ({ page = 1 }) => {
  const params = {
    page,
    ...(filtersState.searchQuery && { search: filtersState.searchQuery }),
    ...(filtersState.activeCategory && {
      category_name: filtersState.activeCategory,
    }),
    ...(filtersState.activeLocation && {
      location_name: filtersState.activeLocation,
    }),
  };

  const response = await baseAPI.get(`${API_BASE_URL}/found/`, { params });
  return response.data;
};

export const fetchMyItemsFound = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/found/my-items/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens encontrados:", error);
    throw error;
  }
};

export const fetchMyItemsLost = async () => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/lost/my-items/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens encontrados:", error);
    throw error;
  }
};

export const fetchOneItem = async (idItem) => {
  try {
    const response = await baseAPI.get(`${API_BASE_URL}/${idItem}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar item específico:", error);
    throw error;
  }
};

export const saveItem = async (formData) => {
  try {
    await baseAPI.post(`${API_BASE_URL}/`, formData);
  } catch (error) {
    console.error("Erro ao savar o item:", error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    await baseAPI.delete(`${API_BASE_URL}/${itemId}/`);
  } catch (error) {
    console.error("Erro ao deletar o item:", error);
    throw error;
  }
};
