<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const openHistory = () => store.dispatch('setShowHistoryDesktop', true)
const isHistoryOpen = computed(() => store.state.showHistoryDesktop)

const searchString = ref('')
const searchMode = ref('genre')
</script>

<template>
    <div class="header__desktop">
        <div :style="'width: 250px;'" v-if="searchMode === 'name'">
            <v-text-field
                v-model="searchString"
                label="Search for the movie title..."
            ></v-text-field>
        </div>

        <div :style="'width: 250px;'" v-if="searchMode === 'genre'">
            <v-select
                clearable
                chips
                label="Select movie genre..."
                :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                ]"
                multiple
            ></v-select>
        </div>

        <div>
            Search by
            <span
                @click="() => (searchMode = 'name')"
                :style="searchMode === 'name' ? 'color: red;' : ''"
                >name</span
            >
            <span :style="'margin: 0px 10px;'">|</span>
            <span
                @click="() => (searchMode = 'genre')"
                :style="searchMode === 'genre' ? 'color: red;' : ''"
                >genre</span
            >
        </div>

        <div v-if="!isHistoryOpen" @click="openHistory">Show history</div>
        <!-- Header desktop -->
    </div>
</template>
