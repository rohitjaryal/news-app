import { defineStore } from 'pinia';

type LoaderState = {
  isLoading: boolean;
};

export default defineStore('loader', {
  state: () =>
    ({
      isLoading: false
    } as LoaderState)
});
