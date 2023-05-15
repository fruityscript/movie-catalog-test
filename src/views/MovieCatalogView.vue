<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MovieCatalogComponent from '../components/MovieCatalogComponent.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import HistoryComponent from '../components/HistoryComponent.vue'
import PaginationComponent from '../components/PaginationComponent.vue'

const store = useStore()

onMounted(() => {
    store.dispatch('getGenres', {})
    store.dispatch('getPopularMovies', 1)
})
</script>

<template>
    <main>
        <!-- Mobile -->
        <MqResponsive target="xs">
            <div class="container__mobile">
                <HeaderComponent />
                <MovieCatalogComponent />
            </div>
        </MqResponsive>

        <!-- Tablet -->
        <MqResponsive target="sm">
            <div class="container__tablet">
                <HeaderComponent />
                <MovieCatalogComponent />
            </div>
        </MqResponsive>

        <!-- PC -->
        <MqResponsive :target="['md', 'lg', 'xl']">
            <div class="container__desktop">
                <HeaderComponent />
                <MovieCatalogComponent />
                <HistoryComponent />
            </div>
        </MqResponsive>

        <PaginationComponent />

        <ErrorMessage />
    </main>
</template>
