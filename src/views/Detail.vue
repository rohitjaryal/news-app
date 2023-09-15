<!--<template>-->
<!--  <body>-->
<!--    <main class="details-container">-->
<!--      <div class="column">-->
<!--        <div class="head">-->
<!--          <span class="headline hl1">{{ currentArticle.title }} </span>-->
<!--          <p>-->
<!--            <span class="headline hl4">By {{ currentArticle.author }}</span>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="description-container">-->
<!--          <p class="description-text">-->
<!--            {{ currentArticle.description }}-->
<!--          </p>-->
<!--        </div>-->

<!--        <p class="content">-->
<!--          {{ currentArticle.content }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </main>-->
<!--  </body>-->
<!--</template>-->

<template>
  <body>
    <div class="news-container">
      <h1 class="news-title">{{ currentArticle.title }}</h1>
      <img :src="currentArticle.urlToImage" :alt="currentArticle.title" class="news-image" />
      <h2 class="news-subtitle">{{ currentArticle.description }}</h2>

      <div class="article-meta-info">
        <span>By {{ currentArticle.author }} Published {{ currentArticle.timePublishedAgo }}</span>
        <span
          >News Source
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
import useNewsStore from '../stores/news.store.ts';
import { onMounted, ref } from 'vue';

const newsStore = useNewsStore();

const router = useRouter();
const articleId = router.currentRoute.value.params?.id;
const currentArticle = ref(newsStore.data?.[articleId] || {});

onMounted(() => {
  newsStore.markArticleAsVisited(articleId);
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
  display: grid;
  align-content: center;
  float: left;
  grid-gap: 50px;
  grid-template-columns: auto auto;
  margin: 25px 0 0;
  padding: 15px 0 20px;
  width: 100%;
}
</style>
