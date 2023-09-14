<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">History</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Visited pages"></v-toolbar>
            <v-card-text>
              <v-list lines="one">
                <v-list-item
                  v-for="headline in orderedVisitedHeadlines"
                  :key="headline.title"
                  :title="headline.title"
                  :subtitle="headline.subtitle"
                >
                  <template v-slot:prepend>
                    <v-card-text>{{ headline?.source?.name }}</v-card-text>
                  </template>
                  <template v-slot:append>
                    <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
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
