<template>
  <div class="text-center">
    <v-dialog v-model="isLoading" :scrim="false" persistent width="auto">
      <v-card color="primary">
        <v-card-text>
          Loading ...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import useLoaderStore from '@/stores/loader.store.ts';
import { storeToRefs } from 'pinia';
const loaderStore = useLoaderStore();
const { isLoading } = storeToRefs(loaderStore);
</script>

<script lang="ts">
export default {
  name: 'AppLoader'
};
</script>

<style lang="scss" scoped></style>
