<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const history = ref('')

onMounted(() => {
    history.value = localStorage.getItem('history') || ''
})

const clearHistory = () => {
    localStorage.setItem('history', '')
    history.value = ''
}

const router = useRouter()

const viewMovie = (movie: string) => {
    const oldHistory = localStorage.getItem('history')
    if (oldHistory) {
        const historyArray = oldHistory.split('/')
        if (historyArray?.length === 10) {
            historyArray.shift()
        }
        historyArray.push(movie)
        localStorage.setItem('history', historyArray.join('/'))
    } else {
        localStorage.setItem('history', movie)
    }
    router.push(`/movie/${movie.split(';')[0]}`).then(() => { router.go(0) })
}
</script>

<template>
    <template v-if="history.length > 0">
        <v-table class="history__mobile__table">
            <tbody>
                <tr v-for="movie in history.split('/').reverse()" :key="movie.split(';')[0]">
                    <td>{{ movie.split(';')[1] }}</td>
                    <td v-if="movie.split(';')[0]">
                        <v-btn @click="viewMovie(movie)"> View </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-btn class="history__mobile__clear" @click="clearHistory">
            Clear History Mobile
        </v-btn>
    </template>
    <template v-else>
        No history yet
    </template>
</template>
