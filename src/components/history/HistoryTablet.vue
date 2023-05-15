<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const draggableContainer = ref(null)
const store = useStore()
const router = useRouter()
const history = ref('')
const historyMode = computed(() => store.state.controlTypeDesktop)

onMounted(() => {
    history.value = localStorage.getItem('history') || ''
})

const clearHistory = () => {
    localStorage.setItem('history', '')
    history.value = ''
}

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
    router.push(`/movie/${movie.split(';')[0]}`).then(() => {
        router.go(0)
    })
}

const dragMouseDown = (e) => {
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

    let prevX = e.clientX
    let prevY = e.clientY

    function mousemove(e) {
        const newX = prevX - e.clientX
        const newY = prevY - e.clientY

        const rect = draggableContainer.value.getBoundingClientRect()
        draggableContainer.value.style.left = rect.left - newX + 'px'
        draggableContainer.value.style.top = rect.top - newY + 'px'

        prevX = e.clientX
        prevY = e.clientY
    }
    function mouseup() {
        window.removeEventListener('mousemove', mousemove)
        window.removeEventListener('mouseup', mouseup)
    }
}
</script>

<template>
    <v-expansion-panels
        v-if="historyMode === 'fixed'"
        class="history__tablet"
    >
        <v-expansion-panel>
            <template v-slot:title> History </template>
            <template v-slot:text>
                <template v-if="history?.length > 0">
                    <v-table class="history__tablet__table">
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
                        class="history__desktop__tablet__actions"
                    >
                        <v-btn
                            @click="clearHistory"
                            size="small"
                            >Clear</v-btn
                        >
                    </div>
                </template>

                <template v-else>
                    <p>No history yet</p>
                </template>
            </template>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
