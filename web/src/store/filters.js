import { reactive, ref } from "vue";

export const filtersState = reactive({
  searchQuery: "",
  activeCategory: null,
  activeLocation: null,
});

export const setSearchQuery = (query) => {
  filtersState.searchQuery = query;
};

export const setActiveCategory = (category) => {
  if (filtersState.activeCategory == category) {
    filtersState.activeCategory = null;
  } else {
    filtersState.activeCategory = category;
  }
};

export const setActiveLocation = (location) => {
  if (filtersState.activeLocation == location) {
    filtersState.activeLocation = null;
  } else {
    filtersState.activeLocation = location;
  }
};
