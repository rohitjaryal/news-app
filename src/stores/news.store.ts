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
    },
    markArticleAsVisited(articleId) {
      const visitedHeadline = this.visitedHeadlines.find(
        (headline) => headline.title === this.data[articleId].title
      );

      if (!visitedHeadline) {
        this.visitedHeadlines.push({ ...this.data[articleId], visitedAt: new Date() });
      }
    }
  },
  getters: {
    getArticle(articleId) {
      return this.data?.[articleId] || {};
    },
    orderedVisitedHeadlines() {
      return this.visitedHeadlines.sort((a, b) => new Date(b.visitedAt) - new Date(a.visitedAt));
    }
  }
});
