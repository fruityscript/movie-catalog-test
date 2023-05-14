<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import HeaderMobile from '../components/header/HeaderMobile.vue'
import MovieCatalog from '../components/MovieCatalog.vue'
import ErrorMessage from '../components/ErrorMessage.vue';

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
                <MovieCatalog />
            </div>
        </MqResponsive>

        <!-- Tablet -->
        <MqResponsive target="sm">
            <div>Tablet vertical / Phone horizontal content</div>
        </MqResponsive>

        <!-- Tablet horizontal -->
        <MqResponsive target="md">
            <div>Tablet horizontal content</div>
        </MqResponsive>

        <!-- PC -->
        <MqResponsive :target="['lg', 'xl']">
            <div>PC content</div>
        </MqResponsive>

        <ErrorMessage />
    </main>
</template>
