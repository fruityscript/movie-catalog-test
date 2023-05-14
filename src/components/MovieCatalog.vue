<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import useLocalStorage from '@/useLocalStorage'

defineProps<{
    errorMessage: string
}>()

const store = useStore()
const currentPage = ref(1)
const moviesList = computed(() => store.state.moviesList.results)
const genresList = computed(() => store.state.genresList)
const totalPages = computed(() => store.state.moviesList.total_pages)

watch(currentPage, (newPage: number) => {
    // Update with current search request and all that stuff
    store.dispatch('getPopularMovies', newPage)
})

onMounted(() => {
    getPopularMovies(null, null)
})

const getPopularMovies = (
    searchString: string | null, genresArray: Array<{ name: string, id: number }> | null
) => store.dispatch('getMovies', { searchString: searchString, genresList: genresArray, page: currentPage.value })

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
