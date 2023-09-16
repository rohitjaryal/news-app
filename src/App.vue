<script setup lang="ts">
import AppHeader from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';
</script>

<template>
  <v-app>
    <app-header />
    <notification />
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
