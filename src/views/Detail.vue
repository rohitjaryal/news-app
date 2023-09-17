<template>
  <body>
    <div class="news-container">
      <h1 class="news-title">{{ currentArticle.newTitle || currentArticle.title }}</h1>
      <img :src="currentArticle.urlToImage" :alt="currentArticle.title" class="news-image" />
      <h2 class="news-subtitle">{{ currentArticle.description }}</h2>

      <div class="article-meta-info">
        <span class="published-at"
          >By {{ currentArticle.author }} &nbsp;&nbsp;

          <v-chip variant="outlined">
            Published
            {{ currentArticle.timePublishedAgo }}
          </v-chip></span
        >
        <span class="news-source"
          >Visit source article
          <a :href="currentArticle.url" target="_blank">{{ currentArticle.source?.name }} </a>
        </span>
      </div>

      <div class="news-article">
        <p>
          {{ currentArticle.content }}
        </p>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useNewsStore, { NewsDataStoreInterface } from '../stores/news.store.ts';
import useVisitedNewsStore from '../stores/visitedHeadlines.store.ts';
import { onMounted, ref } from 'vue';
import { isNumber } from 'lodash';

const router = useRouter();
const newsStore = useNewsStore();
const visitedNewsStore = useVisitedNewsStore();
const articleId = Number(router.currentRoute.value.params?.id);

const currentArticle = ref(newsStore.data?.[articleId] as NewsDataStoreInterface);

onMounted(() => {
  if (isNumber(articleId)) {
    visitedNewsStore.markArticleAsVisited(articleId);
  }
});
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f2f2;
}

.news-container {
  width: 80%;
  background-color: #fff;
  text-align: center;
  padding: 20px;
}

.news-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.news-title {
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
}

.news-subtitle {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  font-weight: 100;
  text-transform: none;
}

.news-article {
  font-size: 18px;
  margin-top: 20px;
  line-height: 1.5;
  font-weight: 500;
  text-transform: none;
}

.article-meta-info {
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  grid-gap: 50px;
  margin: 25px 0 0;
  padding: 15px 0 20px;
  flex-wrap: wrap;
  width: 100%;

  .published-at {
    font-weight: 200;
  }

  .news-source {
    font-weight: 200;
  }
}
</style>
