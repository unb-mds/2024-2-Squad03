<template>
  <div class="min-h-screen">
    <div class="fixed w-full top-0">
      <SearchHeader />
    </div>

    <div class="pt-20 pb-8">
      <SubMenu />
    </div>

    <div
      class="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] justify-items-center align-items-center lg:px-3 gap-y-3 pb-10"
    >
      <ItemCard
        v-for="item in foundItems"
        :key="item.id"
        :name="item.name"
        :location="item.location_name"
        :time="formatTime(item.created_at)"
        :image="item.image_urls[0] || NotAvailableImage"
      />
    </div>

    <div
      class="flex w-full justify-start sm:justify-center gap-x-6 pb-[120px] px-10"
    >
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
import ButtonAdd from "../components/Button-Add-Found.vue";
import SearchHeader from "../components/Search-Header.vue";
import SubMenu from "../components/Sub-Menu-Found.vue";
import { ref, onMounted } from 'vue';
import { fetchFoundItems } from '@/services/item-api';
import { formatTime } from '@/utils/dateUtils';
import NotAvailableImage from '@/assets/images/not-available.png';

// Estado para os itens achados e controle de paginação
const foundItems = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

// Função para buscar itens achados com base na página
const fetchItems = async (page = 1) => {
  const response = await fetchFoundItems(page);
  foundItems.value = response.results;
  totalPages.value = Math.ceil(response.count / 27); // 20 itens por página
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

onMounted(() => fetchItems(currentPage.value));
</script>

<style scoped></style>
