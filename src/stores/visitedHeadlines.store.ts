import { defineStore } from 'pinia';

export default defineStore('visitedHeadlines', {
  state: () => ({
    isOpen: false,
    openedArticle: {}
  })
});
