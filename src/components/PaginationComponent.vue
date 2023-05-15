<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentPage = ref(1)
const totalPages = computed(() => store.state.moviesList.total_pages)
const searchString = computed(() => store.state.movieSearchName)
const searchGenres = computed(() => store.state.movieSearchGenres)

const getFilteredMovies = (searchString, genresArray, page) => {
    if (searchString?.length && searchString.length > 0) {
        store.dispatch('getMoviesByName', {
            searchString,
            genresList: genresArray,
            page: currentPage.value,
        })
    }
    if (genresArray?.length && genresArray.length > 0) {
        store.dispatch('getMoviesByGenre', {
            searchString,
            genresList: genresArray,
            page: currentPage.value,
        })
    }
}

watch(currentPage, (newPage) => {
    if (searchString.value.length > 0) {
        getFilteredMovies(
            searchString.value.length > 0 ? searchString.value : null,
            null,
            newPage
        )
    } else if (searchGenres.value.length > 0) {
        getFilteredMovies(null, searchGenres.value, newPage)
    } else {
        store.dispatch('getPopularMovies', newPage)
    }
})
</script>

<template>
    <!-- Mobile -->
    <MqResponsive target="xs">
        <v-pagination
            class="movieCatalog__mobile__pagination"
            :length="totalPages"
            v-model="currentPage"
        ></v-pagination>
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive :target="['sm', 'md']">
        <v-pagination
            class="movieCatalog__tablet__pagination"
            :length="totalPages"
            v-model="currentPage"
        ></v-pagination>
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <v-pagination
            class="movieCatalog__desktop__pagination"
            :length="totalPages"
            v-model="currentPage"
            :total-visible="7"
        ></v-pagination>
    </MqResponsive>
</template>
