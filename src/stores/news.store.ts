import { defineStore } from 'pinia';
import { getErrorApiCall, getTopHeadlines } from '../apis/list.api.ts';
import useNotificationStore from './notification.store.ts';
import helper from '../includes/helper.ts';
import { ref } from 'vue';
import { Article, HeadlineRequest } from '../types/list.types.ts';

export interface NewsDataStoreInterface extends Article {
  articleId: number;
  timePublishedAgo: string;
  newTitle?: string;
}

export default defineStore('newsData', () => {
  const data = ref([] as NewsDataStoreInterface[]);

  async function getHeadlinesData(payload: HeadlineRequest) {
    const response = await getTopHeadlines(payload);
    data.value = response?.data?.articles.map((info, index) => ({
      ...info,
      articleId: index,
      timePublishedAgo: helper.convertTimeStampToTimeAgo(info.publishedAt)
    }));
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
        type: 'warning'
      });
    }
  }

  return {
    data,
    errorApiCall,
    getHeadlinesData
  };
});
