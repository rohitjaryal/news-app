<template>
  <body>
    <main class="details-container">
      <div class="collumn">
        <div class="head">
          <span class="headline hl1">{{ currentArticle.title }} </span>
          <p>
            <span class="headline hl4">By {{ currentArticle.author }}</span>
          </p>
        </div>
        <p>
          {{ currentArticle.description }}
        </p>

        <p>
          {{ currentArticle.content }}
        </p>
      </div>
    </main>
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
  background: #f6f6f6;
}

.collumn {
  font-size: 14px;
  line-height: 20px;
  width: 70.5%;
  display: inline-block;
  padding: 0 1% 0 1%;
  vertical-align: top;
  margin-bottom: 50px;
  transition: all 0.7s;
}

p {
  margin-top: 0;
  margin-bottom: 20px;
}

.headline {
  text-align: center;
  line-height: normal;
  font-family: 'Playfair Display', serif;
  display: block;
  margin: 0 auto;

  &.hl1 {
    font-weight: 700;
    font-size: 30px;
    //text-transform: uppercase;
    padding: 10px 0 10px 0;
  }

  &.hl4 {
    font-weight: 700;
    font-size: 12px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
  }
}

main {
  font-family: 'Lexend Deca', sans-serif;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  //flex-wrap: wrap;
  //justify-content: center;
  //align-items: center;
  //align-content: space-between;
  width: 76vw;
  margin-left: 12vw;
  margin-right: 12vw;
  //padding-bottom: 50px;
}

.heading {
  flex: 1 1 auto;
}

.description {
  flex: 1 1 auto;
}

.content {
  flex: 1 1 auto;
}
</style>
