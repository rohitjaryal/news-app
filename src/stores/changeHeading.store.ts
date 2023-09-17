import { defineStore } from 'pinia';
import { NewsDataStoreInterface } from '../types/list.types.ts';

export default defineStore('changeHeadingDialog', {
  state: () => ({
    isOpen: false,
    openedArticle: {} as NewsDataStoreInterface
  })
});
