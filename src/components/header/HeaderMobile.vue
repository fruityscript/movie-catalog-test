<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import debounce from 'lodash.debounce'
import HistoryMobile from '../history/HistoryMobile.vue'

const store = useStore()
const searchString = ref('' as String)
const selectedGenres = ref([] as Array<Record<string, number | string>>)
const searchMode = ref('genre')
const genresList = computed(() => store.state.genresList)

const routeName = computed(() => useRouter().currentRoute.value.name)

const searchByGenre = (genresList: Array<number>) =>
    store.dispatch('getMoviesByGenre', {
        genresList: genresList,
        page: 1,
    })

const searchByName = (searchString: string) =>
    store.dispatch('getMoviesByName', {
        searchString: searchString,
        page: 1,
    })

watch(
    searchString,
    debounce(() => {
        searchByName(searchString.value.trim().toLowerCase())
    }, 1000)
)

watch(
    selectedGenres,
    debounce(() => {
        searchByGenre(
            selectedGenres.value.map(
                (genreName) =>
                    (genresList.value as Record<string, any>).filter(
                        (item) => item.name === genreName
                    )[0].id
            )
        )
    }, 1700)
)
</script>

<template>
    <div class="header__mobile">
        <v-expansion-panels class="header__mobile__panel">
            <v-expansion-panel>
                <template v-slot:title>
                    <span v-if="routeName === 'movie-catalog'">Movie Catalog</span>
                    <span v-else>Movie Details</span>
                </template>
                <template v-slot:text>
                    <v-expansion-panels class="header__mobile__panel">
                        <v-expansion-panel v-if="routeName === 'movie-catalog'">
                            <template v-slot:title> Search </template>
                            <template v-slot:text>
                                <v-text-field
                                    v-if="searchMode === 'name'"
                                    v-model="searchString"
                                    label="Search by name..."
                                ></v-text-field>
                                <v-select
                                    :style="'position: relative; z-index: 999999999999999999999999 !important;'"
                                    v-if="searchMode === 'genre'"
                                    v-model="selectedGenres"
                                    clearable
                                    label="Select genre..."
                                    :items="genresList.map(x => (x as Record<string, any>).name)"
                                    multiple
                                ></v-select>
                                <a
                                    @click="
                                        () => {
                                            searchMode =
                                                searchMode === 'genre'
                                                    ? 'name'
                                                    : 'genre'
                                        }
                                    "
                                    >Search by
                                    <span>{{
                                        searchMode === 'genre'
                                            ? 'name'
                                            : 'genre'
                                    }}</span></a
                                >
                            </template>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <template v-slot:title> History </template>
                            <template v-slot:text>
                                <HistoryMobile />
                            </template>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </template>
            </v-expansion-panel>

            <!-- <v-expansion-panel>
                <template v-slot:title> Search </template>
                <template v-slot:text>
                    <v-text-field
                        v-if="searchMode === 'name'"
                        v-model="searchString"
                        label="Search by name..."
                    ></v-text-field>
                    <v-select
                        v-if="searchMode === 'genre'"
                        v-model="selectedGenres"
                        clearable
                        label="Select genre..."
                        :items="genresList.map(x => (x as Record<string, any>).name)"
                        multiple
                    ></v-select>
                    <a
                        @click="
                            () => {
                                searchMode =
                                    searchMode === 'genre' ? 'name' : 'genre'
                            }
                        "
                        >Search by
                        <span>{{
                            searchMode === 'genre' ? 'name' : 'genre'
                        }}</span></a
                    >
                </template>
            </v-expansion-panel> -->

            <!-- <v-expansion-panel>
                <template v-slot:title> History </template>
                <template v-slot:text>
                    <HistoryMobile />
                </template>
            </v-expansion-panel> -->
        </v-expansion-panels>
    </div>
</template>
