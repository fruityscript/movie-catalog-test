<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
<MqResponsive :target="['xs', 'sm', 'md']">
  <router-link
    class="backButton__container"
    to="/"
  >
    <v-btn class="backButton__button">
      Back to catalog
    </v-btn>
  </router-link>
</MqResponsive>

<MqResponsive :target="['lg', 'xl']">
  <router-link to="/">
    <v-btn> Back to catalog </v-btn>
  </router-link>
</MqResponsive>
</template>
