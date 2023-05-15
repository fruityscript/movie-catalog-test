<template>
    <RouterLink :to="`movie/${editableId}`" @click="$emit('registerHistory')">
        <v-btn
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-open-in-new"
        ></v-btn>
    </RouterLink>
</template>

<script>
export default {
    props: {
        editableId: Number,
    },
}
</script>
