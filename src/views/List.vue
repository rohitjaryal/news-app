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
  <v-container v-show="!newsStore.data.length">
    <h3>Sorry, no news are available.</h3>
  </v-container>
  <v-container>
    <v-row>
      <v-col v-for="data in newsStore.data" :key="data.articleId" cols="12" sm="4">
        <v-card
          rounded
          :title="data.newTitle || data.title"
          :subtitle="data.source.name"
          :text="data.description"
          variant="tonal"
          height="100%"
          class="card-outer"
        >
          <v-card-actions class="card-actions">
            <router-link
              custom
              :to="{ name: 'detail', params: { id: data.articleId } }"
              v-slot="{ navigate }"
            >
              <v-btn variant="outlined" color="#f99d1c" @click="navigate">Read more </v-btn>
            </router-link>
            <v-btn variant="plain" color="#f99d1c" @click.prevent="handleChangeHeadingDialog(data)"
              >Change Heading</v-btn
            >
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
import AppLoader from '@/components/Loader.vue';
import { useRouter } from 'vue-router';
import useNewsStore from '@/stores/news.store.ts';
import useChangeHeadingStore from '@/stores/changeHeading.store.ts';
import History from '@/components/HistoryDialog.vue';
import ChangeHeadingDialog from '@/components/ChangeHeadingDialog.vue';

const sources = ref('');
const searchHeadlineText = ref('');
const allAvailableSources = ref([]);
const newsStore = useNewsStore();
const changeHeadingStore = useChangeHeadingStore();

const router = useRouter();

router.afterEach((to, from, next) => {
  console.log('xxx:>', to, from);
  const articleId = to.params.id;
  next();
});

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

function handleChangeHeadingDialog(article) {
  changeHeadingStore.isOpen = true;
  changeHeadingStore.openedArticle = article;
}

function saveNewHeading(newHeading, articleId) {
  newsStore.data[articleId] = {
    ...newsStore.data[articleId],
    newTitle: newHeading
  };
  changeHeadingStore.isOpen = false;
}
</script>

<style lang="scss" scoped>
.card-outer {
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
