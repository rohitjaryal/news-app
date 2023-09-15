<template>
  <v-row justify="space-around">
    <v-dialog v-model="isOpen" class="w-33">
      <!--      <template v-slot:activator="{ props }">-->
      <!--        <v-btn color="primary" v-bind="props">Change Heading</v-btn>-->
      <!--      </template>-->
      <v-card>
        <app-label>
          <v-card-title> Change Heading </v-card-title>
        </app-label>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="1" sm="6" md="12">
                <span>{{ openedArticle?.newTitle || openedArticle?.title }}</span>
              </v-col> </v-row
            ><v-row>
              <v-col cols="1" sm="6" md="12">
                <v-textarea v-model="newHeading"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="handleHeadingChange(openedArticle)">
            Save
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="isOpen = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import useChangeHeadingStore from '../stores/changeHeading.store.ts';
import './ChangeHeadingDialog.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import AppLabel from './AppLabel.vue';

const changeHeadingStore = useChangeHeadingStore();
const { isOpen, openedArticle } = storeToRefs(changeHeadingStore);

const newHeading = ref('');

const emit = defineEmits(['headingChange']);

function handleHeadingChange(article) {
  emit('headingChange', newHeading.value, article.articleId);
  newHeading.value = '';
}
</script>

<script lang="ts">
export default {
  name: 'ChangeHeadingDialog'
};
</script>
