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
import HistoryDesktop from '@/components/history/HistoryDesktop.vue'
import HistoryTablet from '@/components/history/HistoryTablet.vue'

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
    <MqResponsive :target="['sm', 'md']">
        <div class="container__tablet">
            <HeaderMobile />
            <MovieDetailsMobile :movie="movieInfo" />
            <HistoryTablet />
        </div>
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <div class="container__desktop">
            <HeaderDesktop />
            <MovieDetailsDesktop :movie="movieInfo" />
            <HistoryDesktop />
        </div>
    </MqResponsive>

    <!-- NOT Desktop -->
    <MqResponsive :target="['xs', 'sm', 'md']">
        <BackButton />
    </MqResponsive>
</template>
