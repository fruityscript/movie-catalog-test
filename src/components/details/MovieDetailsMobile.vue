<script setup lang="ts">
const props = defineProps({
    movie: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <h2 class="movieDetails__mobile">
        <span :style="'font-weight: 800;'">{{ movie.title }}</span>
    </h2>
    <h5 class="movieDetails__mobile">
        <span :style="'font-weight: 100; font-size: 12px'"
            >{{ movie.original_title }} [Original]</span
        >
    </h5>
    <div class="movieDetails__mobile">
        Release date: {{ movie.release_date }}
    </div>
    <div class="movieDetails__mobile">Budget: {{ movie.budget }}</div>
    <div class="movieDetails__mobile">
        Genres: {{ movie.genres?.map((x) => x.name) }}
    </div>
    <div class="movieDetails__mobile">Homepage: {{ movie.homepage }}</div>
    <div class="movieDetails__mobile">
        ID: {{ movie.id }} IMDB ID: {{ movie.imdb_id }}
    </div>
    <div class="movieDetails__mobile">Overview: {{ movie.overview }}</div>

    <div class="movieDetails__mobile">Popularity: {{ movie.popularity }}</div>
    <div class="movieDetails__mobile">
        Production companies:
        <v-chip
            v-for="company in movie.production_companies?.map((x) => x.name)"
            :key="company"
        >
            {{ company }}
        </v-chip>
    </div>
    <div class="movieDetails__mobile">
        Production countries:
        <v-chip
            v-for="country in movie.production_countries?.map((x) => x.name)"
            :key="country"
        >
            {{ country }}
        </v-chip>
    </div>
    <div class="movieDetails__mobile">Revenue: {{ movie.revenue }}</div>
    <div class="movieDetails__mobile" :style="'max-width: 100vw;'">
        <v-rating
            v-model="movie.vote_average"
            length="10"
            size="x-small"
        ></v-rating>
    </div>
    <div class="movieDetails__mobile">Average: {{ movie.vote_average }}</div>
    <div class="movieDetails__mobile">Vote count: {{ movie.vote_count }}</div>
</template>
