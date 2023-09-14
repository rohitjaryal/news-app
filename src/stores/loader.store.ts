import { defineStore } from 'pinia';

export default defineStore('loader', {
  state: () => ({
    isLoading: false
  })
});
