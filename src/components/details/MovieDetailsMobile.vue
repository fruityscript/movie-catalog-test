<script setup lang="ts">
const props = defineProps({
    movie: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="movieDetails__mobile">
        <div class="movieDetails__mobile__header">
            <div class="movieDetails__mobile__header__title">
                <h2 class="movieDetails__mobile__header__title__main">
                    {{ movie.title }}
                </h2>
                <p class="movieDetails__mobile__header__title__sub">
                    Original title: {{ movie.original_title }}
                </p>
                <h5 class="movieDetails__mobile">
                    <span :style="'font-weight: 100; font-size: 12px'"
                        >Released on
                        {{
                            new Date(movie.release_date)
                                .toLocaleString()
                                .split(',')[0]
                        }}</span
                    >
                </h5>
            </div>

            <div class="movieDetails__mobile__header__genres">
                <v-chip
                    v-for="genre in movie.genres?.map((x) => x.name)"
                    :key="genre"
                >
                    {{ genre }}
                </v-chip>
            </div>

            <div class="movieDetails__mobile__header__overview">
                <div class="movieDetails__mobile">{{ movie.overview }}</div>
            </div>

            <div class="movieDetails__mobile__header__rating">
                <h3 class="movieDetails__mobile__header__rating__head">
                    Rating
                </h3>
                <div class="movieDetails__mobile__header__rating__main">
                    <v-rating
                        v-model="movie.vote_average"
                        length="10"
                        size="x-small"
                    ></v-rating>
                    <h3
                        class="movieDetails__mobile__header__rating__main__number"
                    >
                        {{ movie.vote_average }}
                    </h3>
                </div>
                <div class="movieDetails__mobile__header__rating__sub">
                    based on {{ movie.vote_count }} opinions
                </div>
            </div>
        </div>

        <div class="movieDetails__mobile__details">
            <h3 class="movieDetails__mobile__details__header">Details</h3>
            <div class="movieDetails__mobile__details__budget">
                <div class="movieDetails__mobile__details__budget__text">
                    <div
                        class="movieDetails__mobile__details__budget__text__main"
                    >
                        {{ movie.budget }}$
                    </div>
                    <div
                        class="movieDetails__mobile__details__budget__text__sub"
                    >
                        Budget
                    </div>
                </div>
                <div class="movieDetails__mobile__details__budget__text">
                    <div
                        class="movieDetails__mobile__details__budget__text__main"
                    >
                        {{ movie.revenue }}$
                    </div>
                    <div
                        class="movieDetails__mobile__details__budget__text__sub"
                    >
                        Revenue
                    </div>
                </div>
            </div>
            <div class="movieDetails__mobile__details__budget">
                <div class="movieDetails__mobile__details__budget__text">
                    <div
                        class="movieDetails__mobile__details__budget__text__main"
                    >
                        {{ movie.popularity }}$
                    </div>
                    <div
                        class="movieDetails__mobile__details__budget__text__sub"
                    >
                        Popularity
                    </div>
                </div>
                <div class="movieDetails__mobile__details__budget__text">
                    <div
                        class="movieDetails__mobile__details__budget__text__main"
                    >
                        {{ movie.imdb_id }}$
                    </div>
                    <div
                        class="movieDetails__mobile__details__budget__text__sub"
                    >
                        IMDB ID
                    </div>
                </div>
            </div>
            <h5 class="movieDetails__mobile__details__header">
                Production Companies
            </h5>
            <div class="movieDetails__mobile__details__budget">
                <v-chip
                    v-for="company in movie.production_companies?.map(
                        (x) => x.name
                    )"
                    :key="company"
                >
                    {{ company }}
                </v-chip>
            </div>
            <h5 class="movieDetails__mobile__details__header">
                Production Countries
            </h5>
            <div class="movieDetails__mobile__details__budget">
                <v-chip
                    v-for="country in movie.production_countries?.map(
                        (x) => x.name
                    )"
                    :key="country"
                >
                    {{ country }}
                </v-chip>
            </div>
        </div>
    </div>
</template>
