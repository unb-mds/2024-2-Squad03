<template>
  <div class="min-h-screen">
    <div class="fixed w-full top-0 z-10">
      <SearchHeader />
    </div>

    <div class="pt-24 pb-8">
      <SubMenu />
    </div>

    <div
      class="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] justify-items-center align-items-center lg:px-3 gap-y-3 pb-10"
    >
      <ItemCard
        v-for="item in lostItems"
        :key="item.id"
        :name="item.name"
        :location="item.location_name"
        :time="formatTime(item.created_at)"
        :image="item.image_urls[0] || NotAvailableImage"
        :id="item.id"
      />
    </div>

    <div class="flex w-full justify-start sm:justify-center gap-x-6 pb-[120px] px-10">
      <img
        src="../assets/icons/arrow-left.svg"
        alt="Anterior"
        class="w-[30px] h-[30px] cursor-pointer"
        @click="goToPreviousPage"
      />
      <img
        src="../assets/icons/arrow-right.svg"
        alt="Próximo"
        class="w-[30px] h-[30px] cursor-pointer"
        @click="goToNextPage"
      />
    </div>

    <ButtonAdd />
    <div class="fixed bottom-0 w-full">
      <MainMenu activeIcon="search" />
    </div>
  </div>
</template>

<script setup>
import MainMenu from "../components/Main-Menu.vue";
import ItemCard from "../components/Item-Card.vue";
import ButtonAdd from "../components/Button-Add-Lost.vue";
import SearchHeader from "../components/Search-Header.vue";
import SubMenu from "../components/Sub-Menu-Lost.vue";
import { ref, watch, onMounted } from "vue";
import { fetchLostItems } from "@/services/apiItems";
import { formatTime } from "@/utils/dateUtils";
import NotAvailableImage from "@/assets/images/not-available.png";
import { filtersState } from "@/store/filters";

// Estado para os itens perdidos e controle de paginação
const lostItems = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

// Função para buscar itens perdidos com base na página
const fetchItems = async (page = 1) => {
  const { searchQuery, activeCategory, activeLocation } = filtersState;

  const response = await fetchLostItems({
    page,
    search: searchQuery,
    category_name: activeCategory,
    location_name: activeLocation,
  });

  lostItems.value = response.results;
  totalPages.value = Math.ceil(response.count / 27);
};

// Navegação de páginas
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchItems(currentPage.value);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchItems(currentPage.value);
  }
};

watch(
  () => [filtersState.searchQuery, filtersState.activeCategory, filtersState.activeLocation],
  () => {
    currentPage.value = 1; // Reseta para a primeira página ao mudar os filtros
    fetchItems(); // Atualiza os itens na tela
  },
);

onMounted(() => fetchItems(currentPage.value));
</script>

<style scoped></style>
