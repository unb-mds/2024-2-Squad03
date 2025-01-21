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
        v-for="item in lostItems"
        :key="item.id"
        :name="item.name"
        :location="item.location"
        :time="formatTime(item.created_at)"

        :image="item.image_urls[0] || NotAvailableImage"
      />
    </div>

    <div
      class="flex w-full justify-start sm:justify-center gap-x-6 pb-[120px] px-10"
    >
      <img
        src="../assets/icons/arrow-left.svg"
        alt=""
        class="w-[30px] h-[30px]"
      />
      <img
        src="../assets/icons/arrow-right.svg"
        alt=""
        class="w-[30px] h-[30px]"
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
import { ref, onMounted, computed } from 'vue';
import { fetchAllItems } from '@/services/apiItems';
import { formatTime } from '@/utils/dateUtils';
import NotAvailableImage from '../assets/not-available.png';

const allItems = ref([]);
const lostItems = computed(() =>
  allItems.value.filter((item) => item.status === 'found')
);

const fetchItems = async () => {
  allItems.value = await fetchAllItems(); // Chama a função centralizada
};

// Buscar os itens quando o componente for montado
onMounted(fetchItems);
</script>

<style scoped></style>
