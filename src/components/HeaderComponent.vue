<script setup lang="ts">
import {
  ref, watch, computed, onMounted,
} from "vue";
import { useStore } from "vuex";
import debounce from "lodash.debounce";
import { useRouter } from "vue-router";
import BackButton from "./BackButton.vue";

const store = useStore();

const searchString = ref("");
const searchMode = ref("genre");
const controlsSwitch = ref("fixed");
const genresList = computed(() => store.state.genresList);
const routeName = computed(() => useRouter().currentRoute.value.name);
const selectedGenres = ref([]);

onMounted(() => {
  controlsSwitch.value = store.state.controlTypeDesktop;
});

const searchByGenre = (genresListValue) => {
  store.dispatch("setSearchString", "");
  store.dispatch("setSearchGenres", [...genresListValue]);
  store.dispatch("getMoviesByGenre", {
    genresListValue,
    page: 1,
  });
};

const searchByName = (searchStringValue) => {
  store.dispatch("setSearchGenres", []);
  store.dispatch("setSearchString", searchStringValue);
  store.dispatch("getMoviesByName", {
    searchStringValue,
    page: 1,
  });
};

watch(controlsSwitch, (newValue) => store.dispatch("setDesktopControlType", newValue));

watch(
  searchString,
  debounce(() => {
    searchByName(searchString.value.trim().toLowerCase());
  }, 1000),
);

watch(
  selectedGenres,
  debounce(() => {
    searchByGenre(
      selectedGenres.value.map((genreName) => genresList.value.filter((item) => item.name === genreName)[0].id),
    );
  }, 1700),
);
</script>

<template>
<MqResponsive target="xs">
  <div class="headerComponent__mobile">
    <v-expansion-panels class="headerComponent__mobile__panel">
      <v-expansion-panel>
        <template #title>
          <span v-if="routeName === 'movie-catalog'">Menu</span>
          <span v-else>Movie Details</span>
        </template>
        <template #text>
          <v-expansion-panels class="headerComponent__mobile__panel">
            <v-expansion-panel v-if="routeName === 'movie-catalog'">
              <template #title>
                Search
              </template>
              <template #text>
                <v-text-field
                  v-if="searchMode === 'name'"
                  v-model="searchString"
                  label="Search by name..."
                ></v-text-field>
                <v-select
                  v-if="searchMode === 'genre'"
                  v-model="selectedGenres"
                  class="headerComponent__mobile__panel__input"
                  clearable
                  label="Select genre..."
                  :items="genresList.map(x => x.name)"
                  multiple
                ></v-select>
                <v-btn
                  @click="
                    () => {
                      searchMode = searchMode === 'genre' ? 'name' : 'genre'
                    }
                  "
                >
                  {{ `Switch to ${searchMode === 'genre' ? 'title' : 'genre'} search` }}
                </v-btn>
              </template>
            </v-expansion-panel>

            <v-expansion-panel>
              <template #title>
                History
              </template>
              <template #text>
                <HistoryComponent />
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</MqResponsive>

<MqResponsive :target="['xs', 'sm', 'md']">
  <div class="headerComponent__mobile">
    <v-expansion-panels class="headerComponent__mobile__panel">
      <v-expansion-panel>
        <template #title>
          <span v-if="routeName === 'movie-catalog'">Menu</span>
          <span v-else>Movie Details</span>
        </template>
        <template #text>
          <v-expansion-panels class="headerComponent__mobile__panel">
            <v-expansion-panel v-if="routeName === 'movie-catalog'">
              <template #title>
                Search
              </template>
              <template #text>
                <v-text-field
                  v-if="searchMode === 'name'"
                  v-model="searchString"
                  label="Search by name..."
                ></v-text-field>
                <v-select
                  v-if="searchMode === 'genre'"
                  v-model="selectedGenres"
                  class="headerComponent__mobile__panel__input"
                  clearable
                  label="Select genre..."
                  :items="genresList.map(x => x.name)"
                  multiple
                ></v-select>
                <v-btn
                  @click="
                    () => {
                      searchMode = searchMode === 'genre' ? 'name' : 'genre'
                    }
                  "
                >
                  {{ `Switch to ${searchMode === 'genre' ? 'title' : 'genre'} search` }}
                </v-btn>
              </template>
            </v-expansion-panel>

            <v-expansion-panel>
              <template #title>
                History
              </template>
              <template #text>
                <HistoryComponent />
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</MqResponsive>

<MqResponsive :target="['lg', 'xl']">
  <div class="headerComponent__desktop">
    <div
      v-if="routeName === 'movie-details'"
      class="headerComponent__desktop__search__input"
    >
      <back-button />
    </div>

    <div class="headerComponent__desktop__controls">
      <v-switch
        v-model="controlsSwitch"
        hide-details
        true-value="floaty"
        false-value="fixed"
        label="Floaty history"
      ></v-switch>
    </div>

    <div
      v-if="routeName !== 'movie-details'"
      class="headerComponent__desktop__search"
    >
      <div
        v-if="searchMode === 'name'"
        class="headerComponent__desktop__search__input"
      >
        <v-text-field
          v-model="searchString"
          clearable
          class="headerComponent__desktop__search__input__inner"
          label="Search for the movie title..."
          @click:clear="() => store.dispatch('getPopularMovies', 1)"
        ></v-text-field>
      </div>

      <div
        v-if="searchMode === 'genre'"
        class="headerComponent__desktop__search__input"
      >
        <v-select
          v-model="selectedGenres"
          class="headerComponent__desktop__search__input__inner"
          clearable
          chips
          label="Select movie genre..."
          :items="genresList.map(x => x.name)"
          multiple
          @click:clear="() => store.dispatch('getPopularMovies', 1)"
        ></v-select>
      </div>

      <div class="headerComponent__desktop__search__text">
        Search movie by
        <span
          :class="
            searchMode === 'name' ? 'headerComponent__desktop__search__text__option__active' : 'headerComponent__desktop__search__text__option__inactive'
          "
          @click="() => (searchMode = 'name')"
        >NAME</span>
        <span class="headerComponent__desktop__search__text__separator">|</span>
        <span
          :class="
            searchMode === 'genre' ? 'headerComponent__desktop__search__text__option__active' : 'headerComponent__desktop__search__text__option__inactive'
          "
          @click="() => (searchMode = 'genre')"
        >GENRE</span>
      </div>
    </div>
  </div>
</MqResponsive>
</template>
