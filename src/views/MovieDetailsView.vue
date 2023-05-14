<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import BackButton from '../components/BackButton.vue'
import apiConfig from '../configs/movie-db-config'
import HeaderMobile from '../components/header/HeaderMobile.vue'
import MovieDetailsMobile from '../components/details/MovieDetailsMobile.vue'
import MovieDetailsTablet from '../components/details/MovieDetailsTablet.vue'
import MovieDetailsDesktop from '../components/details/MovieDetailsDesktop.vue'
import HeaderDesktop from '../components/header/HeaderDesktop.vue'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
})

const movieInfo = ref({})

onMounted(() => {
    axios
        .get(
            `https://api.themoviedb.org/3/movie/${props.id}?api_key=${apiConfig.apiKey}&language=en-US`
        )
        .then((response) => {
            movieInfo.value = response.data
        })
})
</script>

<template>
    <!-- Mobile -->
    <MqResponsive target="xs">
        <div class="container__mobile">
            <HeaderMobile />
            <MovieDetailsMobile :movie="movieInfo" />
        </div>
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive target="sm">
        <MovieDetailsTablet :movie="movieInfo" />
    </MqResponsive>

    <!-- Tablet horizontal -->
    <MqResponsive target="md">
        <div>Tablet horizontal content</div>
        <MovieDetailsTablet :movie="movieInfo" />
    </MqResponsive>

    <!-- PC -->
    <MqResponsive :target="['lg', 'xl']">
        <HeaderDesktop />
        <MovieDetailsDesktop :movie="movieInfo" />
    </MqResponsive>

    <BackButton />
</template>
