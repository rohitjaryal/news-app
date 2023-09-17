<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-dialog transition="dialog-top-transition" v-model="isOpen" max-width="800px">
        <v-card>
          <v-toolbar dense elevation="8">
            <v-toolbar-title class="white--text">Visited Headlines</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.prevent="isOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(headline, index) in orderedVisitedHeadlines"
                :key="headline.title"
                :class="index % 2 === 0 ? 'even-list-item' : 'odd-list-item'"
                dense
                ripple
              >
                <v-list-item>
                  <v-list-item-subtitle class="grey--text">{{
                    headline?.source?.name
                  }}</v-list-item-subtitle>
                  <v-list-item-title
                    v-text="headline.newTitle || headline.title"
                  ></v-list-item-title>
                </v-list-item>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="isOpen = false"> Close </v-btn>
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
