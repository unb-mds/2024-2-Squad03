<template>
  <div class="flex flex-col items-center px-6 pt-10">
    <!-- Foto do Usuário -->
    <div class="w-24 h-24 rounded-full flex items-center justify-center border-4 border-laranja overflow-hidden">
      <img
        v-if="user.foto"
        :src="user.foto"
        alt="Foto do Usuário"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full bg-cinza2 flex items-center justify-center text-cinza3 text-sm">
        Foto Padrão
      </div>
    </div>

    <!-- Nome e Email do Usuário -->
    <h1 class="text-xl font-bold text-azul mt-4">
      {{ (user.first_name || user.last_name) ? (user.first_name + ' ' + user.last_name) : user.username }}
    </h1>
    <p class="text-sm text-cinza3">
      {{ user.email || "Email não disponível" }}
    </p>

    <!-- Matrícula (se existir) -->
    <p v-if="user.matricula" class="text-sm text-cinza3">
      Matrícula: {{ user.matricula }}
    </p>

    <!-- Botões de Ação -->
    <div class="pt-[20px] flex flex-col w-full mt-6 space-y-3">
      <router-link to="/user-items-lost">
        <button class="bg-verde text-white w-full font-medium py-3 rounded-lg">
          Meus itens ativos
        </button>
      </router-link>
      <a href="mailto:acheiunb2024@gmail.com" class="w-full">
        <button class="bg-verde text-white w-full font-medium py-3 rounded-lg">
          Reportar um problema
        </button>
      </a>
      <router-link to="/">
        <button class="bg-verde text-white w-full font-medium py-3 rounded-lg">
          Sair da Conta
        </button>
      </router-link>
    </div>

    <!-- Menu Fixo -->
    <div class="fixed bottom-0 w-full">
      <MainMenu activeIcon="user" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import MainMenu from "../components/Main-Menu.vue";

// Dados do Usuário
const user = ref({
  foto: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  matricula: null,
});

// Função para buscar os dados do usuário logado
async function fetchUserData() {
  try {
    console.log("Buscando dados do usuário logado...");
    const response = await api.get("/auth/user/");
    console.log("Dados do usuário recebidos:", response.data);

    // Atualizar os dados do usuário com base na resposta da API
    user.value = {
      foto: response.data.foto || null,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email,
      username: response.data.username,
      matricula: response.data.matricula,
    };
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  }
}

// Buscar os dados ao montar o componente
onMounted(fetchUserData);
</script>

<style scoped></style>
