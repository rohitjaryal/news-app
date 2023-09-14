<template>
  <v-card title="Card title" subtitle="Subtitle" text="..." variant="outlined">
    <v-card-actions>
      <v-btn>Click me</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps(['title', 'label']);
</script>

<script>
console.log('old');
export default {
  name: 'Card'
};
</script>

<style lang="scss" scoped></style>
