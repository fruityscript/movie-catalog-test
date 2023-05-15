<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CardComponent from './CardComponent.vue'

const store = useStore()
const moviesList = computed(() => store.state.moviesList.results)

onMounted(() => {
    store.dispatch('getPopularMovies', 1)
})
</script>

<template>
    <!-- Mobile -->
    <MqResponsive target="xs">
        <v-container class="movieCatalog__mobile__content">
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
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive :target="['sm', 'md']">
        <v-container class="movieCatalog__tablet__content">
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
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <div class="movieCatalog__desktop__content">
            <v-container fluid class="movieCatalog__desktop__content__cards">
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
    </MqResponsive>
</template>
