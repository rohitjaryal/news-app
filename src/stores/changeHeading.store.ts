import { defineStore } from 'pinia';
import { NewsDataStoreInterface } from './news.store.ts';

export default defineStore('changeHeadingDialog', {
  state: () => ({
    isOpen: false,
    openedArticle: {} as NewsDataStoreInterface
  })
});
