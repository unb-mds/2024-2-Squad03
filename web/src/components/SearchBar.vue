<template>
  <form
    class="absolute flex items-center"
    :class="{
      'fixed w-full top-6 pr-8 z-50': isActive && !isMediumOrLarger, 
      'relative w-auto': !isActive || isMediumOrLarger, 
    }"
  >
    <!-- Botão de filtro -->
    <button
      @click="toggleFilters(); toggleActive()"
      class="absolute left-3 text-gray-500 hover:text-gray-700 transition-colors z-50"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    </button>
    <input
      class="input bg-gray-200 rounded-full px-10 py-2 my-1 border-2 border-transparent focus:outline-none focus:border-laranja placeholder-gray-500 text-gray-700 transition-all duration-300 shadow-md pr-10 w-full z-40"
      placeholder="Pesquise seu item"
      required
      type="text"
      @focus="isActive = true"
      @blur="isActive = false; showFilters = false"
    />
    <!-- Botão da lupa -->
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-50"
      :class="{
        'pr-8': isActive && !isMediumOrLarger, // Somente para telas pequenas
      }"
      type="submit"
    >
      <svg
        width="17"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="search"
        class="w-5 h-5"
      >
        <path
          d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
          stroke="currentColor"
          stroke-width="1.333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>

    <!-- Menu de Filtros -->
    <div
      v-if="showFilters"
      class="absolute left-0 bg-gray-200 shadow-lg rounded-xl p-4 z-30"
      :class="{
        'w-fit mr-8': isActive && !isMediumOrLarger, // Estilo para telas pequenas
        'w-full': isMediumOrLarger, // Estilo para telas maiores
      }"
      style="top: calc(50% - 4px);"
    >
      <div class="flex gap-2 flex-wrap mt-4">
        <!-- Botões de filtros -->
        <button
          v-for="(filter, index) in filters"
          :key="index"
          @click="toggleFilter(index)"
          :class="[
            'px-4 py-2 rounded-full border text-sm',
            filter.active ? 'bg-laranja text-azul border-black' : 'bg-gray-200 text-azul border-black',
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
      showFilters: false,
      isActive: false,
      filters: [
        { label: "Animais", active: false },
        { label: "Eletrônicos", active: false },
        { label: "Mochilas e Bolsas", active: false },
        { label: "Chaves", active: false },
        { label: "Livros e Materiais Acadêmicos", active: false },
        { label: "Documentos e Cartões", active: false },
        { label: "Equipamentos Esportivos", active: false },
        { label: "Roupas e Acessórios", active: false },
        { label: "Itens Pessoais", active: false },
        { label: "Outros", active: false },
      ],
    };
  },
  computed: {
    isMediumOrLarger() {
      return window.innerWidth >= 768; // Breakpoint para telas médias ou maiores
    },
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    toggleFilter(index) {
      this.filters[index].active = !this.filters[index].active;
    },
  },
};
</script>

<style scoped></style>
