import { defineStore } from 'pinia';
import { VAlert } from 'vuetify/components/VAlert';

type NotificationState = {
  text: string;
  variant?: VAlert['variant'];
  type: VAlert['type'];
  isOpen: boolean;
};

const TIME_OUT = 2000;

const dataStore = {
  isOpen: false,
  variant: 'tonal',
  text: '',
  type: 'success'
} as NotificationState;

export default defineStore('notification', {
  state: () => ({
    ...dataStore
  }),

  actions: {
    showAlert({ isOpen, variant, text, type }: NotificationState) {
      this.isOpen = isOpen;
      this.variant = variant;
      this.text = text;
      this.type = type;

      this.startTimerToHideAlert();
    },
    startTimerToHideAlert() {
      setTimeout(() => {
        this.$state = Object.assign(dataStore, { isOpen: false });
      }, TIME_OUT);
    }
  }
});
