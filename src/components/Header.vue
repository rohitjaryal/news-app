<template>
  <v-app-bar :elevation="6" color="grey" density="compact" rounded>
    <v-app-bar-title>News</v-app-bar-title>
    <template v-slot:append>
      <v-btn
        v-show="router.currentRoute.value.name === 'detail'"
        icon="mdi-heart"
        @click.prevent="router.push({ name: 'list' })"
      >
        Back
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<script>
export default {
  name: 'AppHeader'
};
</script>

<style lang="scss" scoped></style>
