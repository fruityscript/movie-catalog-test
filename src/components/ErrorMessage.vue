<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const errorList = computed(() => [...store.state.errorList]);
const currentError = ref("");

const updateErrorList = (newErrorList) => store.dispatch("setErrorList", newErrorList);

watch(errorList, (newValue) => {
  if (newValue.length > 0) {
    const errorMessagesCopy = [...errorList.value];
    if (errorMessagesCopy.length > 0) {
      currentError.value = errorMessagesCopy[0];
      errorMessagesCopy.shift();
    }
    setTimeout(() => {
      currentError.value = "";
      updateErrorList(errorMessagesCopy);
    }, 3000);
  }
});
</script>

<template>
<template v-if="errorList.length > 0">
  <MqResponsive target="xs">
    <v-alert
      type="error"
      icon="$error"
      class="errorMessage__mobile"
    >
      <template #title>
        Error
      </template>
      <template #text>
        {{ currentError }}
      </template>
    </v-alert>
  </MqResponsive>

  <MqResponsive target="sm">
    <div class="movieCatalog__tablet">
      Tablet catalog (mobile horizontal)
    </div>
  </MqResponsive>

  <MqResponsive :target="['md', 'lg', 'xl']">
    <v-alert
      type="error"
      icon="$error"
      class="errorMessage__desktop"
    >
      <template #title>
        Error
      </template>
      <template #text>
        {{ currentError }}
      </template>
    </v-alert>
  </MqResponsive>
</template>
</template>
