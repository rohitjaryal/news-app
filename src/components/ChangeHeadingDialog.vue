<template>
  <v-row justify="space-around">
    <v-dialog v-model="isOpen" class="w-33">
      <v-card>
        <v-toolbar title="Change Headline" elevation="8"></v-toolbar>

        <v-card-text>
          <v-container>
            <v-form v-model="isFormValid">
              <v-row>
                <v-col cols="1" sm="6" md="12">
                  <span>{{ openedArticle?.newTitle || openedArticle?.title }}</span>
                </v-col> </v-row
              ><v-row>
                <v-col cols="1" sm="6" md="12">
                  <v-textarea v-model="newHeading" :rules="headingRule"></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="handleHeadingChange(openedArticle.articleId)"
            :disabled="!isFormValid"
          >
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
import { ref, watch } from 'vue';

const changeHeadingStore = useChangeHeadingStore();
const { isOpen, openedArticle } = storeToRefs(changeHeadingStore);

const newHeading = ref('');
const HEADING_MAX_SIZE = 255;

const isFormValid = ref(false);
const headingRule = [
  (value: string) => {
    if (value.trim()?.length) return true;

    return 'Heading is required.';
  },
  (value: string) => {
    if (value?.length <= HEADING_MAX_SIZE) return true;
    return `Heading must be less than ${HEADING_MAX_SIZE} characters.`;
  }
];

watch(isOpen, () => {
  if (isOpen.value) {
    newHeading.value = '';
  }
});

const emit = defineEmits(['headingChange']);

function handleHeadingChange(articleId: number) {
  emit('headingChange', newHeading.value, articleId);
}
</script>

<script lang="ts">
export default {
  name: 'ChangeHeadingDialog'
};
</script>
