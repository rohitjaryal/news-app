<template>
  <v-app-bar :elevation="6" class="fg-amber-accent-4" density="compact" rounded>
    <v-btn class="news-header" @click.prevent="router.push({ name: 'list' })">News</v-btn>

    <template v-slot:append>
      <v-btn v-show="router.currentRoute.value.name === 'detail'" @click.prevent="router.back()">
        Back
      </v-btn>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<script lang="ts">
export default {
  name: 'AppHeader'
};
</script>

<style lang="scss" scoped>
.news-header {
  color: #f99d1c;
  font-weight: bold;
  font-size: 22px;
}
</style>
