<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import useLocalStorage from '@/useLocalStorage'

const store = useStore()
const currentPage = ref(1)
const moviesList = computed(() => store.state.moviesList.results)
const genresList = computed(() => store.state.genresList)
const totalPages = computed(() => store.state.moviesList.total_pages)

const searchString = computed(() => store.state.movieSearchName)
const searchGenres = computed(() => store.state.movieSearchGenres)

watch(currentPage, (newPage: number) => {
    if (searchString.value.length > 0) {
        getFilteredMovies(searchString.value.length > 0 ? searchString.value : null, null, newPage)
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
    searchString: string | null, genresArray: Array<{ name: string, id: number }> | null, page: number
) => {
    if (searchString?.length && searchString.length > 0) {
        store.dispatch('getMovies', { searchString: searchString, genresList: genresArray, page: currentPage.value })
    }
    if (genresArray?.length && genresArray.length > 0) {
        store.dispatch('getMovies', { searchString: searchString, genresList: genresArray, page: currentPage.value })
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
    <MqResponsive target="xs">
        <div class="movieCatalog__content">
            <div class="movieCatalog__content__cards">
                <v-card v-for="movie in moviesList" :key="movie.id" class="movieCatalog__content__cards__card">
                    <template v-slot:title>
                        {{ movie.title }}
                    </template>
                    <template #subtitle>
                        {{ movie.genre_ids.map((genreId: number) => genresList.filter((x: Record<string, number | string>) => x.id === genreId)[0]?.name).join(', ') }}
                    </template>
                    <template v-if="movie.overview" v-slot:text>
                        {{ movie.overview }}
                    </template>
                    <template v-slot:actions>
                        <RouterLink :to="`movie/${movie.id}`" @click="registerHistory(movie)">
                            <v-btn> Details </v-btn>
                        </RouterLink>
                    </template>
                </v-card>
            </div>
        </div>
        <v-pagination class="movieCatalog__pagination" :length="totalPages" v-model="currentPage"></v-pagination>
    </MqResponsive>

    <MqResponsive target="sm">
        <div class="movieCatalog__tablet">
            Tablet catalog (mobile horizontal)
        </div>
    </MqResponsive>

    <MqResponsive :target="['md', 'lg', 'xl']">
        <div class="movieCatalog__pc">PC catalog (tablet horizontal)</div>
    </MqResponsive>
</template>
