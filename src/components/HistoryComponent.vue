<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const draggableContainer = ref(null);
const store = useStore();
const router = useRouter();
const history = ref("");
const historyMode = computed(() => store.state.controlTypeDesktop);

onMounted(() => {
  history.value = localStorage.getItem("history") || "";
});

const clearHistory = () => {
  localStorage.setItem("history", "");
  history.value = "";
};

const viewMovie = (movie) => {
  const oldHistory = localStorage.getItem("history");
  if (oldHistory) {
    const historyArray = oldHistory.split("/");
    if (historyArray?.length === 10) {
      historyArray.shift();
    }
    historyArray.push(movie);
    localStorage.setItem("history", historyArray.join("/"));
  } else {
    localStorage.setItem("history", movie);
  }
  router.push(`/movie/${movie.split(";")[0]}`).then(() => {
    router.go(0);
  });
};

const dragMouseDown = (e) => {
  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(evnt) {
    const newX = prevX - evnt.clientX;
    const newY = prevY - evnt.clientY;

    const rect = draggableContainer.value.getBoundingClientRect();
    draggableContainer.value.style.left = `${rect.left - newX}px`;
    draggableContainer.value.style.top = `${rect.top - newY}px`;

    prevX = evnt.clientX;
    prevY = evnt.clientY;
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);
};
</script>

<template>
<!-- Mobile -->
<MqResponsive target="xs">
  <template v-if="history.length > 0">
    <v-table class="historyComponent__mobile__table">
      <tbody>
        <tr
          v-for="movie in history.split('/').reverse()"
          :key="movie.split(';')[0]"
        >
          <td>{{ movie.split(';')[1] }}</td>
          <td v-if="movie.split(';')[0]">
            <v-btn @click="viewMovie(movie)">
              View
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-btn
      class="historyComponent__mobile__clear"
      @click="(clearHistory)"
    >
      Clear History
    </v-btn>
  </template>
  <template v-else>
    No history yet
  </template>
</MqResponsive>

<!-- Tablet -->
<MqResponsive :target="['sm', 'md']">
  <v-expansion-panels
    v-if="historyMode === 'fixed'"
    class="historyComponent__tablet"
  >
    <v-expansion-panel>
      <template #title>
        History
      </template>
      <template #text>
        <template v-if="history?.length > 0">
          <v-table class="historyComponent__tablet__table">
            <tbody>
              <tr
                v-for="movie in history.split('/').reverse()"
                :key="movie.split(';')[0]"
              >
                <td>{{ movie.split(';')[1] }}</td>
                <td v-if="movie.split(';')[0]">
                  <v-btn @click="viewMovie(movie)">
                    View
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div
            v-if="history?.length > 0"
            class="historyComponent__desktop__tablet__actions"
          >
            <v-btn
              size="small"
              @click="(clearHistory)"
            >
              Clear
            </v-btn>
          </div>
        </template>

        <template v-else>
          <p>No history yet</p>
        </template>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</MqResponsive>

<!-- Desktop -->
<MqResponsive :target="['lg', 'xl']">
  <v-expansion-panels
    v-if="historyMode === 'fixed'"
    class="historyComponent__desktop__fixed"
  >
    <v-expansion-panel>
      <template #title>
        History
      </template>
      <template #text>
        <template v-if="history?.length > 0">
          <v-table class="historyComponent__desktop__fixed__table">
            <tbody>
              <tr
                v-for="movie in history.split('/').reverse()"
                :key="movie.split(';')[0]"
              >
                <td>{{ movie.split(';')[1] }}</td>
                <td v-if="movie.split(';')[0]">
                  <v-btn @click="viewMovie(movie)">
                    View
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div
            v-if="history?.length > 0"
            class="historyComponent__desktop__fixed__actions"
          >
            <v-btn
              size="small"
              @click="(clearHistory)"
            >
              Clear
            </v-btn>
          </div>
        </template>

        <template v-else>
          <p>No history yet</p>
        </template>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>

  <div
    v-if="historyMode === 'floaty'"
    ref="draggableContainer"
    class="historyComponent__desktop__draggableContainer"
    @mousedown="(dragMouseDown)"
  >
    <v-card width="400">
      <v-img
        height="200"
        src="https://cdn.pixabay.com/photo/2018/02/16/02/03/pocket-watch-3156771_1280.jpg"
        cover
        class="text-white"
      >
        <v-toolbar
          color="rgba(0, 0, 0, 0)"
          theme="dark"
        >
          <v-toolbar-title class="text-h6">
            History
          </v-toolbar-title>
          <template #append>
            <v-btn
              icon="mdi-delete-outline"
              @click="(clearHistory)"
            ></v-btn>
          </template>
        </v-toolbar>
      </v-img>

      <v-card-text>
        <v-timeline
          v-if="history?.length > 0"
          density="compact"
          align="start"
        >
          <v-timeline-item
            v-for="movie in history.split('/').reverse()"
            :key="movie.split(';')[0]"
            dot-color="blue"
            class="cursorPointer"
            size="x-small"
            @click="viewMovie(movie)"
          >
            <div>{{ movie.split(';')[1] }}</div>
          </v-timeline-item>
        </v-timeline>

        <div
          v-else
          class="historyComponent__desktop__draggableContainer__content"
        >
          <p class="historyComponent__desktop__draggableContainer__content__noHistory">
            No history yet
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</MqResponsive>
</template>
