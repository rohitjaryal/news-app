<template>
  <div class="text-center">
    <v-dialog v-model="isLoading" :scrim="false" persistent width="auto">
      <v-card>
        <v-card-text class="bg-amber-accent-4 align-center">
          <v-label>Loading</v-label>
          <v-progress-circular indeterminate color="fg-amber-accent-4 ml-4"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import useLoaderStore from '../stores/loader.store.ts';
import { storeToRefs } from 'pinia';
const loaderStore = useLoaderStore();
const { isLoading } = storeToRefs(loaderStore);
</script>

<style lang="scss" scoped></style>
