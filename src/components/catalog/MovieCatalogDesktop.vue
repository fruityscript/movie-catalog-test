<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import useLocalStorage from '@/useLocalStorage'
import CardComponent from '../CardComponent.vue'

defineProps<{
    errorMessage: string
}>()

const store = useStore()
const currentPage = ref(1)
const moviesList = computed(() => store.state.moviesList.results)
const genresList = computed(() => store.state.genresList)
const totalPages = computed(() => store.state.moviesList.total_pages)

const searchString = computed(() => store.state.movieSearchName)
const searchGenres = computed(() => store.state.movieSearchGenres)

watch(currentPage, (newPage: number) => {
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

onMounted(() => {
    store.dispatch('getPopularMovies', 1)
})

const getFilteredMovies = (
    searchString: string | null,
    genresArray: Array<{ name: string; id: number }> | null,
    page: number
) => {
    if (searchString?.length && searchString.length > 0) {
        store.dispatch('getMovies', {
            searchString: searchString,
            genresList: genresArray,
            page: currentPage.value,
        })
    }
    if (genresArray?.length && genresArray.length > 0) {
        store.dispatch('getMovies', {
            searchString: searchString,
            genresList: genresArray,
            page: currentPage.value,
        })
    }
}

const registerHistory = (movie: Record<string, any>) => {
    const oldHistory = localStorage.getItem('history')
    if (oldHistory) {
        const historyArray = oldHistory.split('/')
        if (historyArray?.length === 10) {
            historyArray.shift()
        }
        historyArray.push(`${movie.id};${movie.title}`)
        localStorage.setItem('history', historyArray.join('/'))
    } else {
        localStorage.setItem('history', `${movie.id};${movie.title}`)
    }
}
</script>

<template>
    <div class="movieCatalog__content__desktop">
        <v-container fluid class="movieCatalog__content__desktop__cards">
            <v-row dense>
                <v-col
                    v-for="movie in moviesList"
                    :key="movie.id"
                    :cols="movie.flex"
                >
                    <CardComponent :movie="movie" />
                </v-col>
            </v-row>
        </v-container>
    </div>
    <v-pagination
        class="movieCatalog__pagination__desktop"
        :length="totalPages"
        v-model="currentPage"
    ></v-pagination>
</template>
