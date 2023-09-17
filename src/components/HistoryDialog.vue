<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" v-model="isOpen">
        <v-card>
          <v-toolbar title="Visited Headlines"></v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item v-for="headline in orderedVisitedHeadlines" :key="headline.title">
                <template v-slot:prepend>
                  <v-btn :href="headline.url" target="_blank">
                    <v-icon icon="fa-solid fa-arrow-up-right-from-square" />
                    {{ headline?.source?.name }}
                  </v-btn>
                  <v-list-item-title class="pa-3" v-text="headline.title"></v-list-item-title>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click.prevent="isOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useVisitedHeadlinesStore from '../stores/visitedHeadlines.store.ts';

const visitedHeadlinesStore = useVisitedHeadlinesStore();

const { isOpen, orderedVisitedHeadlines } = storeToRefs(visitedHeadlinesStore);
</script>

<style scoped lang="scss">
.even-list-item {
  background-color: #f5f5f5; /* Light gray background color for even items */
}

.odd-list-item {
  background-color: #ffffff; /* White background color for odd items */
}
</style>
