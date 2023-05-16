<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentPage = ref(1);
const totalPages = computed(() => store.state.moviesList.total_pages);
const searchString = computed(() => store.state.movieSearchName);
const searchGenres = computed(() => store.state.movieSearchGenres);

const getFilteredMovies = (searchStringValue, genresArrayValue) => {
  if (searchStringValue?.length && searchStringValue.length > 0) {
    store.dispatch("getMoviesByName", {
      searchStringValue,
      genresList: genresArrayValue,
      page: currentPage.value,
    });
  }
  if (genresArrayValue?.length && genresArrayValue.length > 0) {
    store.dispatch("getMoviesByGenre", {
      searchStringValue,
      genresList: genresArrayValue,
      page: currentPage.value,
    });
  }
};

watch(currentPage, (newPage) => {
  if (searchString.value.length > 0) {
    getFilteredMovies(searchString.value.length > 0 ? searchString.value : null, null, newPage);
  } else if (searchGenres.value.length > 0) {
    getFilteredMovies(null, searchGenres.value, newPage);
  } else {
    store.dispatch("getPopularMovies", newPage);
  }
});
</script>

<template>
<MqResponsive target="xs">
  <v-pagination
    v-model="currentPage"
    class="movieCatalog__mobile__pagination"
    :length="totalPages"
  ></v-pagination>
</MqResponsive>

<MqResponsive :target="['sm', 'md']">
  <v-pagination
    v-model="currentPage"
    class="movieCatalog__tablet__pagination"
    :length="totalPages"
  ></v-pagination>
</MqResponsive>

<MqResponsive :target="['lg', 'xl']">
  <v-pagination
    v-model="currentPage"
    class="movieCatalog__desktop__pagination"
    :length="totalPages"
    :total-visible="7"
  ></v-pagination>
</MqResponsive>
</template>
