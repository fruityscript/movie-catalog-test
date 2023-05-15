<script setup lang="ts">
import { defineEmits, ref, onMounted } from 'vue'

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
})

const emit = defineEmits(['renameMovie', 'close'])

const movieName = ref('')

onMounted(() => {
    movieName.value = props.editableName
})

const renameMovie = () => {
    emit('renameMovie', {
        id: props.editableId,
        title: movieName.value,
    })
    emit('close')
}
</script>

<template>
    <v-dialog v-model="props.isOpened" activator="parent" width="auto">
        <v-card>
            <v-card-text>
                Testing
                {{ editableId }}
                {{ isOpened }}
                {{ editableName }}
                <v-text-field
                    label="Movie title"
                    variant="underlined"
                    v-model="movieName"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary" @click="() => emit('close')"
                    >Close Dialog</v-btn
                >
                <v-btn color="primary" @click="renameMovie">Rename movie</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
