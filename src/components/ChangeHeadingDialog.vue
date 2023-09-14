<template>
  <v-row justify="space-around">
    <v-dialog v-model="isOpen" persistent class="w-25">
      <v-card>
        <v-card-title>
          <span class="text-h5">Change Heading</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="1" sm="6" md="4">
                <v-label>Heading</v-label>
              </v-col> </v-row
            ><v-row>
              <v-col cols="1" sm="6" md="4">
                <v-text-field label="Heading"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="isOpen = false"> Close </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="isOpen = false"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import useChangeHeadingStore from '../stores/changeHeading.store.ts';
import './ChangeHeadingDialog.vue';
import { storeToRefs } from 'pinia';

const changeHeadingStore = useChangeHeadingStore();
const { isOpen } = storeToRefs(changeHeadingStore);
</script>

<script lang="ts">
export default {
  name: 'ChangeHeadingDialog'
};
</script>
