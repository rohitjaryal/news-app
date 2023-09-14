<script setup lang="ts">
import AppHeader from './components/Header.vue';
</script>

<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
