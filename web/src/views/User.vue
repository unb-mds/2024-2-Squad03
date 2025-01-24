<template>
    <div class="flex flex-col items-center px-6 pt-10">
        <div class="relative">
            <div class="w-24 h-24 rounded-full flex items-center justify-center border-4 border-laranja">
            </div>
        </div>

        <h1 class="text-xl font-bold text-azul mt-4">Nome de Usuário</h1>
        <p class="text-sm text-cinza3">231111111@aluno.unb.br</p>

        <div class="pt-[20px] flex flex-col w-full mt-6 space-y-3">
            <router-link to="/user-items">
                <button class="bg-verde text-white w-full font-medium py-3 rounded-lg">
                    Meus itens ativos
                </button>
            </router-link>
            <button class="bg-verde text-white font-medium py-3 rounded-lg">
                Reportar um problema
            </button>
            <router-link to="/">
                <button class="bg-verde text-white w-full font-medium py-3 rounded-lg">
                    Sair da Conta
                </button>
            </router-link>
        </div>
        <ButtonAdd />
        <div class="fixed bottom-0 w-full">
            <MainMenu activeIcon="user" />
        </div>
    </div>
</template>

<script setup>
import MainMenu from "../components/Main-Menu.vue";
</script>

<style scoped></style>
