<script setup lang="ts">
const props = defineProps({
    movie: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <!-- Mobile -->
    <MqResponsive target="xs">
        <div class="movieDetails__mobile">
            <div
                class="movieDetails__mobile__header"
                :style="{
                    'background-image': `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                }"
            >
                <div class="movieDetails__mobile__header__title">
                    <h2 class="movieDetails__mobile__header__title__main">
                        {{ movie.title }}
                    </h2>
                    <p class="movieDetails__mobile__header__title__sub">
                        Original title: {{ movie.original_title }}
                    </p>
                    <h5>
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
                            {{ movie.budget || '-' }}$
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
                            {{ movie.revenue || '-' }}$
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
                            {{ movie.popularity || '-' }}
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
                            {{ movie.imdb_id || '-' }}
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
    </MqResponsive>

    <!-- Tablet -->
    <MqResponsive :target="['sm', 'md']">
        <div class="movieDetails__mobile">
            <div
                class="movieDetails__mobile__header"
                :style="{
                    color: 'white',
                    'background-size': 'cover',
                    'background-image': `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                }"
            >
                <div class="movieDetails__mobile__header__title">
                    <h2 class="movieDetails__mobile__header__title__main">
                        {{ movie?.title }}
                    </h2>
                    <p class="movieDetails__mobile__header__title__sub">
                        Original title: {{ movie?.original_title }}
                    </p>
                    <h5 class="movieDetails__mobile">
                        <span :style="'font-weight: 100; font-size: 12px'"
                            >Released on
                            {{
                                new Date(movie?.release_date)
                                    .toLocaleString()
                                    .split(',')[0]
                            }}</span
                        >
                    </h5>
                </div>

                <div class="movieDetails__mobile__header__genres">
                    <v-chip
                        v-for="genre in movie?.genres?.map((x) => x.name)"
                        :key="genre"
                    >
                        {{ genre }}
                    </v-chip>
                </div>

                <div class="movieDetails__mobile__header__overview">
                    <div class="movieDetails__mobile">
                        {{ movie?.overview }}
                    </div>
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
                            {{ movie.budget || '-' }}$
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
                            {{ movie.revenue || '-' }}$
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
                            {{ movie.popularity || '-' }}
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
                            {{ movie.imdb_id || '-' }}
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
    </MqResponsive>

    <!-- Desktop -->
    <MqResponsive :target="['lg', 'xl']">
        <v-container class="movieDetails__desktop">
            <v-row no-gutters>
                <v-col cols="12" sm="4">
                    <v-sheet class="ma-2 pa-2">
                        <v-img
                            :style="'margin: auto'"
                            :width="400"
                            aspect-ratio="16/9"
                            cover
                            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
                        ></v-img>
                    </v-sheet>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-row no-gutters>
                        <v-col cols="24" sm="6">
                            <v-sheet class="ma-2 pa-2 centeredText">
                                <v-container class="movieDetails__desktop">
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12">
                                            <h2>
                                                {{ movie?.title }}
                                            </h2>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12">
                                            <h4 class="mt-2">
                                                Original Title:
                                                {{ movie?.original_title }}
                                                <a
                                                    :href="movie.homepage"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <v-icon
                                                        icon="mdi-open-in-new"
                                                    ></v-icon>
                                                </a>
                                            </h4>

                                            <div>
                                                Release date:
                                                {{ movie.release_date }}
                                            </div>

                                            <div>
                                                IMDB ID:
                                                {{ movie.imdb_id }}
                                            </div>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12">
                                            <v-chip
                                                class="mt-2"
                                                :style="'margin-right: 5px'"
                                                v-for="genre in movie.genres?.map(
                                                    (x) => x.name
                                                )"
                                                :key="genre"
                                            >
                                                {{ genre }}
                                            </v-chip>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12">
                                            <div>
                                                <v-rating
                                                    class="mt-2"
                                                    v-model="movie.vote_average"
                                                    length="10"
                                                    readonly
                                                    density="compact"
                                                ></v-rating>
                                            </div>

                                            <h3>
                                                {{
                                                    Math.floor(
                                                        movie.vote_average * 100
                                                    ) / 100
                                                }}
                                            </h3>

                                            <div>
                                                based on
                                                {{ movie.vote_count }} opinions
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-sheet>
                        </v-col>

                        <v-col cols="24" sm="6">
                            <v-sheet
                                class="ma-2 pa-2 centeredText"
                                :style="'height: 90%;'"
                            >
                                <v-container>
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12"
                                            ><h3>Production companies</h3>
                                            <div
                                                class="movieDetails__desktop__chips"
                                            >
                                                <v-chip
                                                    :style="'margin-right: 5px'"
                                                    class="movieDetails__desktop__chips__chip"
                                                    v-for="company in movie.production_companies?.map(
                                                        (x) => x.name
                                                    )"
                                                    :key="company.id"
                                                >
                                                    {{ company }}
                                                </v-chip>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" sm="12"
                                            ><h4>Production countries</h4>
                                            <div
                                                class="movieDetails__desktop__chips"
                                            >
                                                <v-chip
                                                    :style="'margin-right: 5px'"
                                                    class="movieDetails__desktop__chips__chip"
                                                    v-for="country in movie.production_countries?.map(
                                                        (x) => x.name
                                                    )"
                                                    :key="country.id"
                                                >
                                                    {{ country }}
                                                </v-chip>
                                            </div>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="24" sm="6">
                                            <h3>Budget</h3>
                                            <div>
                                                {{ movie.budget || '-' }}$
                                            </div>
                                        </v-col>
                                        <v-col cols="24" sm="6">
                                            <h3>Revenue</h3>
                                            <div>
                                                {{ movie.revenue || '-' }}$
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <v-col cols="24" sm="24">
                            <v-sheet class="ma-2 pa-2">
                                {{ movie.overview }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </MqResponsive>
</template>
