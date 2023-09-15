import { defineStore } from 'pinia';
import { getErrorApiCall, getTopHeadlines } from '../apis/list.api.ts';
import useNotificationStore from '@/stores/notification.store.ts';

import helper from '@/includes/helper';
import { computed, ref } from 'vue';
export default defineStore('newsData', () => {
  const data = ref([]);
  const visitedHeadlines = ref([]);

  async function getHeadlinesData(payload) {
    const response = await getTopHeadlines(payload);
    data.value = response?.data?.articles.map((info, index) => ({
      ...info,
      articleId: index,
      timePublishedAgo: helper.convertTimeStampToTimeAgo(info.publishedAt)
    }));
  }

  function markArticleAsVisited(articleId) {
    const visitedHeadline = visitedHeadlines.value.find(
      (headline) => headline.title === data.value[articleId].title
    );

    if (!visitedHeadline) {
      visitedHeadlines.value.push({ ...data.value[articleId], visitedAt: new Date() });
    }
  }

  async function errorApiCall() {
    const notificationStore = useNotificationStore();
    try {
      await getErrorApiCall();
    } catch (error) {
      console.error(error);
      notificationStore.showAlert({
        isOpen: true,
        text: 'Something went wrong!',
        type: 'error'
      });
    }
  }

  const orderedVisitedHeadlines = computed(() => {
    return visitedHeadlines.value.sort(
      (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
    );
  });

  return {
    data,
    visitedHeadlines,
    errorApiCall,
    markArticleAsVisited,
    orderedVisitedHeadlines,
    getHeadlinesData
  };
});
