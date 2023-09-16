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
                  <v-list-item-subtitle v-text="headline?.source?.name"></v-list-item-subtitle>
                  <v-list-item-title class="pa-3" v-text="headline.title"></v-list-item-title>
                  <v-icon color="green-darken-2" icon="mdi-domain"></v-icon>
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
import useNewsStore from '../stores/news.store.ts';
import useVisitedHeadlinesStore from '../stores/visitedHeadlines.store.ts';
import './ChangeHeadingDialog.vue';

const visitedHeadlinesStore = useVisitedHeadlinesStore();

const { isOpen } = storeToRefs(visitedHeadlinesStore);

const newsStore = useNewsStore();
const { orderedVisitedHeadlines } = storeToRefs(newsStore);
</script>

<script lang="ts">
export default {
  name: 'HistoryDialog'
};
</script>
