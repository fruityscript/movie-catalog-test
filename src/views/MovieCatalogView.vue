<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import HeaderMobile from '../components/header/HeaderMobile.vue'
import HeaderTablet from '../components/header/HeaderTablet.vue'
import MovieCatalogMobile from '../components/catalog/MovieCatalogMobile.vue'
import MovieCatalogTablet from '../components/catalog/MovieCatalogTablet.vue'
import MovieCatalogDesktop from '../components/catalog/MovieCatalogDesktop.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import HeaderDesktop from '../components/header/HeaderDesktop.vue'

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
                <HeaderMobile />
                <MovieCatalogMobile />
            </div>
        </MqResponsive>

        <!-- Tablet -->
        <MqResponsive target="sm">
            <div class="container__tablet">
                <HeaderTablet />
                <MovieCatalogTablet />
            </div>
        </MqResponsive>

        <!-- PC -->
        <MqResponsive :target="['md', 'lg', 'xl']">
            <div class="container__desktop">
                <HeaderDesktop />
                <MovieCatalogDesktop />
            </div>
        </MqResponsive>

        <ErrorMessage />
    </main>
</template>
