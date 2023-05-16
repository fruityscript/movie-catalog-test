<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  editableId: {
    type: Number,
    required: true,
  },
  isOpened: {
    type: Boolean,
    required: true,
  },
  editableName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["renameMovie", "close"]);

const movieName = ref("");
const isOpn = ref(false);

watch(props, () => {
  isOpn.value = props.isOpened;
});

onMounted(() => {
  movieName.value = props.editableName;
});

const renameMovie = () => {
  emit("renameMovie", {
    id: props.editableId,
    title: movieName.value,
  });
  emit("close");
};
</script>

<template>
<v-dialog
  v-model="isOpn"
  activator="parent"
  width="auto"
>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model="movieName"
        label="Movie title"
        variant="underlined"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="secondary"
        @click="() => emit('close')"
      >
        Close Dialog
      </v-btn>
      <v-btn
        color="primary"
        @click="(renameMovie)"
      >
        Rename movie
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
