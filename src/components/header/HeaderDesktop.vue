<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import debounce from 'lodash.debounce'
import { useRouter } from 'vue-router'
import BackButton from '../BackButton.vue'

const store = useStore()

const searchString = ref('')
const searchMode = ref('genre')
const controlsSwitch = ref('fixed')
const genresList = computed(() => store.state.genresList)
const routeName = computed(() => useRouter().currentRoute.value.name)
const selectedGenres = ref([])

onMounted(() => controlsSwitch.value = store.state.controlTypeDesktop)

const searchByGenre = (genresList) => {
    store.dispatch('setSearchString', '')
    store.dispatch('setSearchGenres', [...genresList])
    store.dispatch('getMoviesByGenre', {
        genresList: genresList,
        page: 1,
    })
}

const searchByName = (searchString) => {
    store.dispatch('setSearchGenres', [])
    store.dispatch('setSearchString', searchString)
    store.dispatch('getMoviesByName', {
        searchString: searchString,
        page: 1,
    })
}

watch(controlsSwitch, (newValue) =>
    store.dispatch('setDesktopControlType', newValue)
)

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
    <div class="header__desktop">
        <div
            v-if="routeName === 'movie-details'"
            class="header__desktop__search__input"
        >
            <BackButton />
        </div>

        <div class="header__desktop__controls">
            <v-switch
                v-model="controlsSwitch"
                hide-details
                true-value="floaty"
                false-value="fixed"
                label="Floaty history"
            ></v-switch>
        </div>

        <div
            class="header__desktop__search"
            v-if="routeName !== 'movie-details'"
        >
            <div
                v-if="searchMode === 'name'"
                class="header__desktop__search__input"
            >
                <v-text-field
                    clearable
                    @click:clear="() => store.dispatch('getPopularMovies', 1)"
                    class="header__desktop__search__input__inner"
                    v-model="searchString"
                    label="Search for the movie title..."
                ></v-text-field>
            </div>

            <div
                v-if="searchMode === 'genre'"
                class="header__desktop__search__input"
            >
                <v-select
                    class="header__desktop__search__input__inner"
                    clearable
                    chips
                    @click:clear="() => store.dispatch('getPopularMovies', 1)"
                    v-model="selectedGenres"
                    label="Select movie genre..."
                    :items="genresList.map(x => (x as Record<string, any>).name)"
                    multiple
                ></v-select>
            </div>

            <div class="header__desktop__search__text">
                Search movie by
                <span
                    @click="() => (searchMode = 'name')"
                    :style="searchMode === 'name' ? 'color: red;' : 'cursor: pointer;'"
                    >NAME</span
                >
                <span :style="'margin: 0px 10px;'">|</span>
                <span
                    @click="() => (searchMode = 'genre')"
                    :style="searchMode === 'genre' ? 'color: red;' : 'cursor: pointer;'"
                    >GENRE</span
                >
            </div>
        </div>
    </div>
</template>
