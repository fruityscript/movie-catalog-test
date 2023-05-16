<template>
<RouterLink
  :to="`movie/${editableId}`"
  @click="$emit('registerHistory')"
>
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
  name: "view-button-functional",
  props: {
    editableId: {
      type: Number,
      required: true,
    },
  },
  emits: ["registerHistory"],
};
</script>
