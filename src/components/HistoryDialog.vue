<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            class="bg-amber-accent-4"
            :disabled="!orderedVisitedHeadlines.length"
            v-bind="props"
            >Visited headline</v-btn
          >
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar title="Visited pages"></v-toolbar>
            <v-card-text>
              <v-list>
                <v-list-item v-for="headline in orderedVisitedHeadlines" :key="headline.title">
                  <template v-slot:prepend>
                    <v-list-item-subtitle v-text="headline?.source?.name"></v-list-item-subtitle>
                    <v-list-item-title class="pa-3" v-text="headline.title"></v-list-item-title>
                    <v-icon color="green-darken-2" icon="mdi-domain"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import useNewsStore from '../stores/news.store.ts';

const newsStore = useNewsStore();
const { orderedVisitedHeadlines } = storeToRefs(newsStore);

const historyList = computed(() => {
  return newsStore.visitedHeadlines.reverse();
});

console.log('historyList:>', historyList.value, orderedVisitedHeadlines.value);
</script>

<script lang="ts">
export default {
  name: 'HistoryDialog'
};
</script>
