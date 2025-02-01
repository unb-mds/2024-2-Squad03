<template>
  <!-- Header fixo no topo -->
  <div class="fixed w-full top-0" style="z-index: 1">
    <ItemHeader :title="itemStatus === 'found' ? 'Item Achado' : 'Item Perdido'" />
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

    <!-- Botão para iniciar o chat -->
    <button
      class="w-full md:w-1/3 py-3 text-center text-white font-semibold rounded-lg bg-laranja hover:bg-laranja active:bg-laranja focus:ring-2 focus:ring-laranja"
      @click="startChat"
    >
      {{ itemStatus === "found" ? "É meu item" : "Este item é meu" }}
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
import api from "../services/api"; // Importa o arquivo api.js
import ItemHeader from "../components/Item-Header.vue";
import MainMenu from "../components/Main-Menu.vue";
import { useRoute, useRouter } from "vue-router";

const item = ref(null);
const itemStatus = ref("");
const locationName = ref("");
const labels = ref([]);
const route = useRoute();
const router = useRouter();
const idItem = route.query.idItem;
const participant_2 = ref(null);
const currentUser = ref({ id: null });

// 🔍 Busca os detalhes do item para obter o usuário correto (`participant_2`)
async function fetchItem() {
  try {
    console.log(`🔍 Buscando detalhes do item ID ${idItem}...`);
    const response = await api.get(`/items/${idItem}/`);
    item.value = response.data;

    // Determina o status do item (achado ou perdido)
    itemStatus.value = item.value.status === "found" ? "found" : "lost";

    // ✅ Define `participant_2` corretamente baseado no status do item
    if (itemStatus.value === "found") {
      participant_2.value = response.data.user_id; // Quem encontrou o item
    } else {
      participant_2.value = currentUser.value.id; // Quem perdeu o item
    }

    if (!participant_2.value) {
      console.error("❌ Erro: Não foi possível obter o participant_2.");
    } else {
      console.log(`✅ participant_2 encontrado: ${participant_2.value}`);
    }

    // Busca o nome do local
    if (item.value.location) {
      const locationResponse = await api.get(`/locations/${item.value.location}`);
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
        api.get(`/categories/${id}`).then((res) => ({ name: res.data.name, type: "category" })),
      );
      const categories = await Promise.all(categoryPromises);
      labels.value.push(...categories);
    }

    // Cor
    if (item.value.color) {
      const colorResponse = await api.get(`/colors/${item.value.color}`);
      labels.value.push({ name: colorResponse.data.name, type: "color" });
    }

    // Marca
    if (item.value.brand) {
      const brandResponse = await api.get(`/brands/${item.value.brand}`);
      labels.value.push({ name: brandResponse.data.name, type: "brand" });
    }
  } catch (error) {
    console.error("Erro ao carregar item:", error);
  }
}

// 🔍 Busca os dados do usuário logado (`participant_1`)
async function fetchCurrentUser() {
  try {
    console.log("🔍 Buscando usuário logado...");
    const response = await api.get(`/auth/user/`);
    currentUser.value.id = response.data.id;
    console.log("✅ Usuário logado:", response.data);
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
  }
}

// 🚀 Criar o chatroom automaticamente e redirecionar
async function startChat() {
  try {
    if (!participant_2.value || !currentUser.value.id) {
      console.error("❌ Erro: participant_2 ou currentUser.id não definido.");
      return;
    }

    console.log(
      `🛠 Criando chatroom entre usuário ${currentUser.value.id} e ${participant_2.value}...`,
    );
    const chatResponse = await api.post("/chat/chatrooms/", {
      participant_1: currentUser.value.id,
      participant_2: participant_2.value,
      item_id: idItem,
    });

    console.log("✅ Chatroom criado:", chatResponse.data);

    // 🔀 Redireciona para o chat correto
    router.push(`/chat/${chatResponse.data.id}`);
  } catch (error) {
    console.error("Erro ao criar chatroom:", error);
  }
}

// ⏳ Carrega os dados quando o componente é montado
onMounted(async () => {
  await fetchCurrentUser();
  await fetchItem();
});
</script>

<style scoped></style>
