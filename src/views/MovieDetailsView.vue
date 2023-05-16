<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import BackButton from '../components/BackButton.vue'
import apiConfig from '../configs/movie-db-config'
import HeaderComponent from '../components/HeaderComponent.vue'
import MovieDetailsComponent from '../components/MovieDetailsComponent.vue'
import HistoryComponent from '../components/HistoryComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'

const store = useStore()
const isPageLoading = computed(() => store.state.isPageLoading)

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
            <template v-if="isPageLoading">
                <SpinnerComponent />
            </template>
            <template v-else>
                <MovieDetailsComponent :movie="movieInfo" />
            </template>
        </div>
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive :target="['sm', 'md']">
        <div class="container__tablet">
            <HeaderComponent />
            <template v-if="isPageLoading">
                <SpinnerComponent />
            </template>
            <template v-else>
                <MovieDetailsComponent :movie="movieInfo" />
            </template>
            <HistoryComponent />
        </div>
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <div class="container__desktop">
            <HeaderComponent />
            <template v-if="isPageLoading">
                <SpinnerComponent />
            </template>
            <template v-else>
                <MovieDetailsComponent :movie="movieInfo" />
            </template>
            <HistoryComponent />
        </div>
    </MqResponsive>

    <!-- NOT Desktop -->
    <MqResponsive :target="['xs', 'sm', 'md']">
        <BackButton />
    </MqResponsive>
</template>
