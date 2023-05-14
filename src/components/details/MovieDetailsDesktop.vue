<script setup lang="ts">
const props = defineProps({
    movie: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div>
        <div class="movieDetails__desktop">Title (EN): {{ movie.title }}</div>
        <div class="movieDetails__desktop">
            Release date: {{ movie.release_date }}
        </div>
        <div class="movieDetails__desktop">
            Original Title: {{ movie.original_title }}
        </div>
        <div class="movieDetails__desktop">Budget: {{ movie.budget }}</div>
        <div class="movieDetails__desktop">Genres: {{ movie.genres }}</div>
        <div class="movieDetails__desktop">Homepage: {{ movie.homepage }}</div>
        <div class="movieDetails__desktop">ID: {{ movie.id }}</div>
        <div class="movieDetails__desktop">IMDB ID: {{ movie.imdb_id }}</div>
        <div class="movieDetails__desktop">Overview: {{ movie.overview }}</div>

        <div class="movieDetails__desktop">
            Popularity: {{ movie.popularity }}
        </div>
        <div class="movieDetails__desktop">
            Production companies: {{ movie.production_companies }}
        </div>
        <div class="movieDetails__desktop">
            Production countries: {{ movie.production_countries }}
        </div>
        <div class="movieDetails__desktop">Revenue: {{ movie.revenue }}</div>
        <div class="movieDetails__desktop">
            Vote average: {{ movie.vote_average }}
        </div>
        <div class="movieDetails__desktop">
            Vote count: {{ movie.vote_count }}
        </div>
    </div>
</template>
