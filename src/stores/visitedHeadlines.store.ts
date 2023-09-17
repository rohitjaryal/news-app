import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useNewsStore from './news.store.ts';
import { NewsDataStoreInterface } from '../types/list.types.ts';

interface VisitedPagesStoreInterface extends NewsDataStoreInterface {
  visitedAt: Date;
}
export default defineStore('visitedHeadlines', () => {
  const isOpen = ref(false);
  const visitedHeadlines = ref([] as VisitedPagesStoreInterface[]);
  function markArticleAsVisited(articleId: number) {
    const newsStore = useNewsStore();
    const visitedHeadline = visitedHeadlines.value.find(
      (headline) => headline.title === newsStore.data[articleId].title
    );

    if (!visitedHeadline) {
      visitedHeadlines.value.push({ ...newsStore.data[articleId], visitedAt: new Date() });
    }
  }

  const orderedVisitedHeadlines = computed(() => {
    return visitedHeadlines.value.sort(
      (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
    );
  });

  return {
    isOpen,
    visitedHeadlines,
    markArticleAsVisited,
    orderedVisitedHeadlines
  };
});
