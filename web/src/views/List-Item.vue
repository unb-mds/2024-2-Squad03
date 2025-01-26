<template>
  <!-- Header fixo no topo -->
  <div class="fixed w-full top-0" style="z-index: 1">
    <ItemHeader
      :title="itemStatus === 'found' ? 'Item Achado' : 'Item Perdido'"
    />
  </div>

  <!-- Conteúdo principal -->
  <div class="px-6 py-[120px] flex flex-col items-center gap-6" v-if="item">
    <!-- Imagem do Item -->
    <img
      :src="item.image"
      alt="Imagem do Item"
      class="w-full max-w-md h-64 md:h-80 object-cover rounded-lg"
    />

    <!-- Título, local e tags -->
    <div class="text-center">
      <h1 class="text-lg md:text-2xl font-bold">{{ item.name }}</h1>
      <p class="text-sm md:text-base text-gray-500">
        {{ itemStatus === "found" ? "Achado em:" : "Perdido em:" }}
        {{ locationName || "Não especificado" }}
      </p>

      <!-- Labels dinâmicas -->
      <div class="flex flex-wrap gap-2 justify-center mt-2">
        <span
          v-for="(label, index) in labels"
          :key="index"
          :class="
            label.type === 'category'
              ? 'bg-blue-500'
              : label.type === 'brand'
                ? 'bg-laranja'
                : 'bg-gray-500'
          "
          class="px-4 py-2 rounded-full text-sm font-medium text-white"
        >
          {{
            label.type === "category"
              ? "Categoria: "
              : label.type === "brand"
                ? "Marca: "
                : "Cor: "
          }}{{ label.name }}
        </span>
      </div>
    </div>

    <!-- Descrição -->
    <p class="text-sm md:text-base text-gray-700 text-center">
      {{ item.description }}
    </p>

    <button
      class="w-full md:w-1/3 py-3 text-center text-white font-semibold rounded-lg bg-laranja hover:bg-laranja active:bg-laranja focus:ring-2 focus:ring-laranja"
      @click="navigateToChat"
    >
      {{ itemStatus === "found" ? "É meu item" : "Confirmar que é meu item" }}
    </button>
  </div>

  <div v-else class="py-6 text-center">
    <p class="text-gray-600">Carregando informações do item...</p>
  </div>

  <div class="fixed bottom-0 w-full">
    <MainMenu :activeIcon="itemStatus === 'found' ? 'found' : 'lost'" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ItemHeader from "../components/Item-Header.vue";
import MainMenu from "../components/Main-Menu.vue";
import { useRouter } from "vue-router";
import { fetchOneLocation } from "@/services/location-api";
import { fetchOneColor } from "@/services/color-api";

const item = ref(null);
const itemStatus = ref("");
const locationName = ref("");
const labels = ref([]);
const router = useRouter();

async function fetchItem() {
  try {
    // Busca o item pelo ID
    const response = await fetchItem(1);
    item.value = response.data;

    // Determina o status do item (achado ou perdido)
    itemStatus.value = item.value.status === "found" ? "found" : "lost";

    // Busca o nome do local
    if (item.value.location) {
      const locationResponse = await fetchOneLocation(item.value.location);
      locationName.value = locationResponse.data.name;
    } else {
      locationName.value = "Não especificado";
    }

    // Adiciona as labels dinamicamente
    labels.value = [];

    // Categoria
    if (item.value.category) {
      const categoryIds = Array.isArray(item.value.category)
        ? item.value.category
        : [item.value.category];
      const categoryPromises = categoryIds.map((id) =>
        api
          .get(`/categories/${id}`)
          .then((res) => ({ name: res.data.name, type: "category" }))
      );
      const categories = await Promise.all(categoryPromises);
      labels.value.push(...categories);
    }

    // Cor
    if (item.value.color) {
      const colorResponse = await fetchOneColor(item.value.color);
      labels.value.push({ name: colorResponse.data.name, type: "color" });
    }

    // Marca
    if (item.value.brand) {
      const brandResponse = await fetchOneBrand(item.value.brand);
      labels.value.push({ name: brandResponse.data.name, type: "brand" });
    }
  } catch (error) {
    console.error("Erro ao carregar item:", error);
  }
}

function viewMatches() {
  alert(
    itemStatus.value === "found"
      ? "Exibindo possíveis matches!"
      : "Reportando possível match!"
  );
}

function navigateToChat() {
  if (item.value && item.value.id) {
    router.push(`/chatroom=${item.value.id}`);
  } else {
    console.error("ID do item não encontrado.");
  }
}

// Carrega os dados do item e os detalhes relacionados quando o componente é montado
onMounted(fetchItem);
</script>

<style scoped></style>
