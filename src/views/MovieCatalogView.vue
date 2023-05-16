<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import MovieCatalogComponent from "../components/MovieCatalogComponent.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import HistoryComponent from "../components/HistoryComponent.vue";
import PaginationComponent from "../components/PaginationComponent.vue";
import SpinnerComponent from "../components/SpinnerComponent.vue";

const store = useStore();
const isPageLoading = computed(() => store.state.isPageLoading);
watch(isPageLoading, (newVal) => console.log("WATCHER", newVal));

onMounted(() => {
  store.dispatch("getGenres", {});
  store.dispatch("getPopularMovies", 1);
});
</script>

<template>
<main>
  <!-- Mobile -->
  <MqResponsive target="xs">
    <div class="container__mobile">
      <header-component />
      <template v-if="isPageLoading">
        <spinner-component />
      </template>
      <template v-else>
        <movie-catalog-component />
      </template>
    </div>
  </MqResponsive>

  <!-- Tablet -->
  <MqResponsive target="sm">
    <div class="container__tablet">
      <header-component />
      <template v-if="isPageLoading">
        <spinner-component />
      </template>
      <template v-else>
        <movie-catalog-component />
      </template>
    </div>
  </MqResponsive>

  <!-- PC -->
  <MqResponsive :target="['md', 'lg', 'xl']">
    <div class="container__desktop">
      <header-component />
      <template v-if="isPageLoading">
        <spinner-component />
      </template>
      <template v-else>
        <movie-catalog-component />
      </template>
      <history-component />
    </div>
  </MqResponsive>

  <pagination-component />

  <error-message />
</main>
</template>
