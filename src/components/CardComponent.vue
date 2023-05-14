<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
})

const revealDescription = ref(false)

const registerHistory = (movie: Record<string, any>) => {
    const oldHistory = localStorage.getItem('history')
    if (oldHistory) {
        const historyArray = oldHistory.split('/')
        if (historyArray?.length === 10) {
            historyArray.shift()
        }
        historyArray.push(`${movie.id};${movie.title}`)
        localStorage.setItem('history', historyArray.join('/'))
    } else {
        localStorage.setItem('history', `${movie.id};${movie.title}`)
    }
}
</script>

<template>
    <v-card class="mx-auto">
        <v-img
            :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
        >
            <v-card-title
                class="text-white"
                v-text="movie.title"
            ></v-card-title>
        </v-img>

        <v-card-actions>
            <v-btn
                variant="text"
                color="teal-accent-4"
                @click="revealDescription = true"
                >Description</v-btn
            >

            <v-spacer></v-spacer>

            <v-btn
                size="small"
                color="surface-variant"
                variant="text"
                icon="mdi-pencil"
            ></v-btn>

            <RouterLink
                :to="`movie/${movie.id}`"
                @click="registerHistory(movie)"
            >
                <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-open-in-new"
                ></v-btn>
            </RouterLink>
        </v-card-actions>

        <v-expand-transition>
            <v-card
                v-if="revealDescription"
                class="v-card--reveal"
                style="height: 100%"
            >
                <v-card-text class="pb-0">
                    <p class="text-h4 text--primary">Overview</p>
                    <p>
                        {{ movie.overview }}
                    </p>
                </v-card-text>
                <v-card-actions class="pt-0">
                    <v-btn
                        variant="text"
                        color="teal-accent-4"
                        @click="revealDescription = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>
