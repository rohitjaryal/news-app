<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="sources"
            clearable
            chips
            label="Choose News sources"
            :items="allAvailableSources"
            item-title="name"
            item-value="id"
            multiple
            variant="outlined"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="searchHeadlineText"
            :counter="255"
            label="Search Headline"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <history />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <v-container class="bg-grey-lighten-1" v-show="!newsStore.data.length">
    <h3>Sorry, no news are available.</h3>
  </v-container>
  <v-container class="bg-grey-lighten-1">
    <v-row>
      <v-col v-for="data in newsStore.data" :key="data.articleId" cols="12" sm="4">
        <v-card
          :title="data.title"
          :subtitle="data.source.name"
          :text="data.description"
          variant="outlined"
        >
          <v-card-actions>
            <router-link
              custom
              :to="{ name: 'detail', params: { id: data.articleId } }"
              v-slot="{ navigate }"
            >
              <span @click="navigate">Read more</span>
            </router-link>
            <v-label @click.prevent="handleChangeHeadingDialog(data)">Change Heading</v-label>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <teleport to="body"> <app-loader /></teleport>
  <teleport to="body"> <change-heading-dialog @headingChange="saveNewHeading" /> /></teleport>
</template>

<script setup>
import { debounce } from 'lodash';
import { getSources } from '@/apis/list.api.ts';
import { onMounted, ref, watch } from 'vue';
import useLoaderStore from '@/stores/loader.store.ts';
import AppLoader from '@/components/Loader.vue';
import { useRouter } from 'vue-router';
import useNewsStore from '@/stores/news.store.ts';
import useChangeHeadingStore from '@/stores/changeHeading.store.ts';
import History from '@/components/HistoryDialog.vue';
import ChangeHeadingDialog from '@/components/ChangeHeadingDialog.vue';

const sources = ref('');
const searchHeadlineText = ref('');
const allAvailableSources = ref([]);
const router = useRouter();
const newsStore = useNewsStore();
const changeHeadingStore = useChangeHeadingStore();

// router.beforeEach((to, from, next) => {
//   console.log('xxx:>', to, from);
//   const articleId = to.params.id;
//   next();
// });

const userInputDebounced = debounce(
  (params) =>
    newsStore.getHeadlinesData({
      q: searchHeadlineText.value,
      sources: sources.value
    }),
  400,
  {
    leading: false
  }
);

watch([sources, searchHeadlineText], () => {
  if (sources.value || searchHeadlineText.value) {
    userInputDebounced();
  }
});

onMounted(async () => {
  const response = await getSources();
  allAvailableSources.value = response.data.sources?.map(({ id, name }) => ({
    id,
    name
  }));

  newsStore.getHeadlinesData({});
});

const loaderStore = useLoaderStore();

function showDialog() {
  loaderStore.isLoading = true;
}

function handleReadMore(articleId) {
  router.push('/detail/:');
}

function handleChangeHeadingDialog(article) {
  changeHeadingStore.isOpen = true;
  changeHeadingStore.openedArticle = article;
}

function saveNewHeading(newHeading, articleId) {
  console.log('saveNewHeading:>>', newHeading, articleId);
  newsStore.data[articleId] = {
    ...newsStore.data[articleId],
    title: newHeading
  };
  changeHeadingStore.isOpen = false;
}
</script>

<style lang="scss" scoped></style>
