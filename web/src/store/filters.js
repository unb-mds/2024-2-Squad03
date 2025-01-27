import { reactive, ref } from "vue";

export const filtersState = reactive({
  searchQuery: "",
  activeCategory: null,
  activeLocation: null,
});

export const setSearchQuery = (query) => {
  console.log("Definindo searchQuery:", query);
  filtersState.searchQuery = query;
};

export const setActiveCategory = (category) => {
  console.log("Definindo activeCategory:", category);
  filtersState.activeCategory = category;
};

export const setActiveLocation = (location) => {
  console.log("Definindo activeLocation:", location);
  filtersState.activeLocation = location;
};
