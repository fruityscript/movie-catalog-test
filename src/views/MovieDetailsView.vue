<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import BackButton from '../components/BackButton.vue'
import apiConfig from '../configs/movie-db-config'
import HeaderComponent from '../components/HeaderComponent.vue'
import MovieDetailsComponent from '../components/MovieDetailsComponent.vue'

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
            <HeaderComponent />
            <MovieDetailsComponent :movie="movieInfo" />
        </div>
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive :target="['sm', 'md']">
        <div class="container__tablet">
            <HeaderComponent />
            <MovieDetailsComponent :movie="movieInfo" />
            <HistoryComponent />
        </div>
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <div class="container__desktop">
            <HeaderComponent />
            <MovieDetailsComponent :movie="movieInfo" />
            <HistoryComponent />
        </div>
    </MqResponsive>

    <!-- NOT Desktop -->
    <MqResponsive :target="['xs', 'sm', 'md']">
        <BackButton />
    </MqResponsive>
</template>
