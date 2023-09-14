import { defineStore } from 'pinia';
import { getTopHeadlines } from '../apis/list.api.ts';

export default defineStore('newsData', {
  state: () => ({
    data: [],
    visitedHeadlines: []
  }),
  actions: {
    async getHeadlinesData(payload) {
      const response = await getTopHeadlines(payload);
      this.data = response?.data?.articles.map((info, index) => ({
        ...info,
        articleId: index
      }));
    }
  },
  getters: {
    getArticle(articleId) {
      return this.data?.[articleId] || {};
    }
  }
});
