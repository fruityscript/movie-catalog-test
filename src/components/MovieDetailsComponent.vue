<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  // movie: {
  //   type: String,
  //   required: true,
  // },
});

const currentMovie = ref({});

watch(props, () => {
  currentMovie.value = props.movie;
});
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
          {{ currentMovie.title }}
        </h2>
        <p class="movieDetails__mobile__header__title__sub">
          Original title: {{ currentMovie.original_title }}
        </p>
        <h5>
          <span class="movieDetails__mobile__header__title__release">
            Released on {{ new Date(movie.release_date).toLocaleString().split(',')[0] }}
          </span>
        </h5>
      </div>

      <div class="movieDetails__mobile__header__genres">
        <v-chip
          v-for="genre in currentMovie.genres?.map((x) => x.name)"
          :key="genre"
        >
          {{ genre }}
        </v-chip>
      </div>

      <div class="movieDetails__mobile__header__overview">
        <div class="movieDetails__mobile">
          {{ currentMovie.overview }}
        </div>
      </div>

      <div class="movieDetails__mobile__header__rating">
        <h3 class="movieDetails__mobile__header__rating__head">
          Rating
        </h3>
        <div class="movieDetails__mobile__header__rating__main">
          <v-rating
            v-model="currentMovie.vote_average"
            length="10"
            size="x-small"
          ></v-rating>
          <h3 class="movieDetails__mobile__header__rating__main__number">
            {{ currentMovie.vote_average }}
          </h3>
        </div>
        <div class="movieDetails__mobile__header__rating__sub">
          based on {{ currentMovie.vote_count }} opinions
        </div>
      </div>
    </div>

    <div class="movieDetails__mobile__details">
      <h3 class="movieDetails__mobile__details__header">
        Details
      </h3>
      <div class="movieDetails__mobile__details__budget">
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.budget || '-' }}$
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Budget
          </div>
        </div>
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.revenue || '-' }}$
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Revenue
          </div>
        </div>
      </div>
      <div class="movieDetails__mobile__details__budget">
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.popularity || '-' }}
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Popularity
          </div>
        </div>
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.imdb_id || '-' }}
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            IMDB ID
          </div>
        </div>
      </div>
      <h5 class="movieDetails__mobile__details__header">
        Production Companies
      </h5>
      <div class="movieDetails__mobile__details__budget">
        <v-chip
          v-for="company in currentMovie.production_companies?.map((x) => x.name)"
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
          v-for="country in currentMovie.production_countries?.map((x) => x.name)"
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
        'background-image': `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(https://image.tmdb.org/t/p/original/${currentMovie.poster_path})`,
      }"
    >
      <div class="movieDetails__mobile__header__title">
        <h2 class="movieDetails__mobile__header__title__main">
          {{ currentMovie?.title }}
        </h2>
        <p class="movieDetails__mobile__header__title__sub">
          Original title: {{ currentMovie?.original_title }}
        </p>
        <h5 class="movieDetails__mobile__header__title__release">
          <span>
            Released on {{ new Date(movie?.release_date).toLocaleString().split(',')[0] }}
          </span>
        </h5>
      </div>

      <div class="movieDetails__mobile__header__genres">
        <v-chip
          v-for="genre in currentMovie?.genres?.map((x) => x.name)"
          :key="genre"
        >
          {{ genre }}
        </v-chip>
      </div>

      <div class="movieDetails__mobile__header__overview">
        <div class="movieDetails__mobile">
          {{ currentMovie?.overview }}
        </div>
      </div>

      <div class="movieDetails__mobile__header__rating">
        <h3 class="movieDetails__mobile__header__rating__head">
          Rating
        </h3>
        <div class="movieDetails__mobile__header__rating__main">
          <v-rating
            v-model="currentMovie.vote_average"
            length="10"
            size="x-small"
          ></v-rating>
          <h3 class="movieDetails__mobile__header__rating__main__number">
            {{ currentMovie.vote_average }}
          </h3>
        </div>
        <div class="movieDetails__mobile__header__rating__sub">
          based on {{ currentMovie.vote_count }} opinions
        </div>
      </div>
    </div>

    <div class="movieDetails__mobile__details">
      <h3 class="movieDetails__mobile__details__header">
        Details
      </h3>
      <div class="movieDetails__mobile__details__budget">
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.budget || '-' }}$
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Budget
          </div>
        </div>
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.revenue || '-' }}$
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Revenue
          </div>
        </div>
      </div>
      <div class="movieDetails__mobile__details__budget">
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.popularity || '-' }}
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            Popularity
          </div>
        </div>
        <div class="movieDetails__mobile__details__budget__text">
          <div class="movieDetails__mobile__details__budget__text__main">
            {{ currentMovie.imdb_id || '-' }}
          </div>
          <div class="movieDetails__mobile__details__budget__text__sub">
            IMDB ID
          </div>
        </div>
      </div>
      <h5 class="movieDetails__mobile__details__header">
        Production Companies
      </h5>
      <div class="movieDetails__mobile__details__budget">
        <v-chip
          v-for="company in currentMovie.production_companies?.map((x) => x.name)"
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
          v-for="country in currentMovie.production_countries?.map((x) => x.name)"
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
      <v-col
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2 m-a">
          <v-img
            class="m-a"
            :width="400"
            aspect-ratio="16/9"
            cover
            :src="`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`"
          ></v-img>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <v-row no-gutters>
          <v-col
            cols="24"
            sm="6"
          >
            <v-sheet class="ma-2 pa-2 centeredText">
              <v-container class="movieDetails__desktop">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <h2>
                      {{ currentMovie?.title }}
                    </h2>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <h4 class="mt-2">
                      Original Title:
                      {{ currentMovie?.original_title }}
                      <a
                        :href="currentMovie.homepage"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <v-icon icon="mdi-open-in-new"></v-icon>
                      </a>
                    </h4>

                    <div>
                      Release date:
                      {{ currentMovie.release_date }}
                    </div>

                    <div>
                      IMDB ID:
                      {{ currentMovie.imdb_id }}
                    </div>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <v-chip
                      v-for="genre in currentMovie.genres?.map((x) => x.name)"
                      :key="genre"
                      class="mt-2 mr-5"
                    >
                      {{ genre }}
                    </v-chip>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <div>
                      <v-rating
                        v-model="currentMovie.vote_average"
                        class="mt-2"
                        length="10"
                        readonly
                        density="compact"
                      ></v-rating>
                    </div>

                    <h3>
                      {{ Math.floor(currentMovie.vote_average * 100) / 100 }}
                    </h3>

                    <div>
                      based on
                      {{ currentMovie.vote_count }} opinions
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>

          <v-col
            cols="24"
            sm="6"
          >
            <v-sheet
              class="ma-2 pa-2 centeredText h-90"
            >
              <v-container>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <h3>Production companies</h3>
                    <div class="movieDetails__desktop__chips">
                      <v-chip
                        v-for="company in movie.production_companies?.map((x) => x.name)"
                        :key="company.id"
                        class="movieDetails__desktop__chips__chip mr-5"
                      >
                        {{ company }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="12"
                  >
                    <h4>Production countries</h4>
                    <div class="movieDetails__desktop__chips">
                      <v-chip
                        v-for="country in currentMovie.production_countries?.map(
                          (x) => x.name,
                        )"
                        :key="country.id"
                        class="movieDetails__desktop__chips__chip mr-5"
                      >
                        {{ country }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col
                    cols="24"
                    sm="6"
                  >
                    <h3>Budget</h3>
                    <div>{{ currentMovie.budget || '-' }}$</div>
                  </v-col>
                  <v-col
                    cols="24"
                    sm="6"
                  >
                    <h3>Revenue</h3>
                    <div>{{ currentMovie.revenue || '-' }}$</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            cols="24"
            sm="24"
          >
            <v-sheet class="ma-2 pa-2">
              {{ currentMovie.overview }}
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</MqResponsive>
</template>
