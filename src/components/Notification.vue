<template>
  <transition name="fade" mode="out-in">
    <v-alert
      v-model="isOpen"
      class="v-alert"
      closable
      :type="type"
      :text="text"
      :variant="variant"
      close-icon="fa-solid fa-xmark fg-amber-accent-4"
    />
  </transition>
</template>

<script setup lang="ts">
import { VAlert } from 'vuetify/components/VAlert';
import useNotificationStore from '../stores/notification.store.ts';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();

const { text, variant, type, isOpen } = storeToRefs(notificationStore);
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

.v-alert {
  font-weight: 600;
  position: fixed;
  align-self: flex-end;
  overflow: hidden;
  right: 0.5%;
  width: 18rem;
  height: 4rem;
  top: 4rem;
  z-index: 999;
  margin: 0 auto; // Without this the box extends the width of the page
}
</style>
