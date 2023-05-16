<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import RenameComponent from "./RenameComponent.vue";
import RenameButtonFunctional from "./RenameButtonFuctional.vue";
import ViewButtonFunctional from "./ViewButtonFunctional.vue";

const store = useStore();
const genresList = computed(() => store.state.genresList);
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const propsCopy = ref({});

onMounted(() => {
  propsCopy.value = props;
});

const revealDescription = ref(false);
const showRenameDialog = ref(false);

const registerHistory = (movie) => {
  const oldHistory = localStorage.getItem("history");
  if (oldHistory) {
    const historyArray = oldHistory.split("/");
    if (historyArray?.length === 10) {
      historyArray.shift();
    }
    historyArray.push(`${movie.id};${movie.title}`);
    localStorage.setItem("history", historyArray.join("/"));
  } else {
    localStorage.setItem("history", `${movie.id};${movie.title}`);
  }
};

const renameMovie = (evnt) => store.dispatch("renameMovie", evnt);
</script>

<template>
<v-card class="mx-auto">
  <v-img
    :src="`https://image.tmdb.org/t/p/original/${movie?.poster_path}`"
    class="align-end"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    height="200px"
    cover
  >
    <v-card-title
      class="text-white"
      v-text="movie?.title"
    ></v-card-title>
  </v-img>

  <v-card-actions>
    <v-btn
      variant="text"
      color="surface-variant"
      @click="revealDescription = true"
    >
      View Genres
    </v-btn>

    <v-spacer></v-spacer>

    <rename-button-functional @show-rename-dialog="() => (showRenameDialog = true)" />

    <rename-component
      :editable-id="movie.id"
      :is-opened="showRenameDialog"
      :editable-name="movie.title"
      @rename-movie="(evnt) => renameMovie(evnt)"
      @close="() => (showRenameDialog = false)"
    />

    <view-button-functional
      :editable-id="movie.id"
      @register-history="registerHistory(movie)"
    />
  </v-card-actions>

  <v-expand-transition>
    <v-card
      v-if="revealDescription"
      class="v-card--reveal h-fc"
    >
      <v-card-text class="pb-0">
        <p class="text-h4 text--primary">
          Genres
        </p>
        <p>
          {{
            movie.genre_ids
              .map((x) => genresList.filter((genreItem) => genreItem.id === x)[0].name)
              .join(', ')
          }}
        </p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
          variant="text"
          color="surface-variant"
          @click="revealDescription = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-expand-transition>
</v-card>
</template>
