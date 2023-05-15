<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <!-- Mobile -->
    <MqResponsive :target="['xs', 'sm', 'md']">
        <RouterLink class="backButton__container" to="/">
            <v-btn class="backButton__button"> Back to catalog </v-btn>
        </RouterLink>
    </MqResponsive>

    <!-- PC -->
    <MqResponsive :target="['lg', 'xl']">
        <RouterLink to="/">
            <v-btn> Back to catalog </v-btn>
        </RouterLink>
    </MqResponsive>
</template>
