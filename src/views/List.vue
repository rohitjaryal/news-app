<template>
  <v-container>
    <v-row justify="space-evenly">
      <v-col cols="12" sm="6" md="3" align-self="center">
        <v-combobox
          v-model="sources"
          label="Choose Sources"
          :items="allAvailableSources"
          item-title="name"
          item-value="id"
          multiple
          chips
          closable-chips
          hide-selected
          class="combobox"
        ></v-combobox>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="searchHeadlineText"
          :counter="255"
          label="Search Headline"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" align-self="center">
        <v-btn
          width="100%"
          class="text-capitalize align-center"
          variant="elevated"
          :disabled="!visitedHeadlinesStore.visitedHeadlines.length"
          @click.prevent="visitedHeadlinesStore.isOpen = true"
        >
          <v-icon icon="fa-solid fa-bookmark" class="mr-2 text-green-accent-4" />Visited headlines
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="3" align-self="center">
        <v-btn
          width="100%"
          @click.prevent="newsStore.errorApiCall()"
          class="text-capitalize align-center"
        >
          <v-icon icon="fa-solid fa-xmark" class="mr-2 text-red-darken-1" />
          Error API Call
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="!newsData.length" class="d-flex align-center">
    <v-icon icon="fa-solid  fa-circle-exclamation" />
    <h3 class="ml-2">Sorry, no news are available.</h3>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col v-for="data in newsData" :key="data.articleId" cols="12" sm="4">
        <v-card
          rounded
          :title="data.newTitle || data.title || ' '"
          :subtitle="data.source?.name || ' '"
          :text="data.description || ' '"
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
              <v-btn
                variant="outlined"
                color="#f99d1c"
                @click="navigate"
                class="text-capitalize font-weight-bold"
                >Read more
              </v-btn>
            </router-link>
            <v-btn
              variant="plain"
              color="#f99d1c"
              @click.prevent="handleChangeHeadingDialog(data)"
              class="text-capitalize font-weight-black"
            >
              <v-icon icon="fa-solid fa-gear " /> Change Headline
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <teleport to="body"> <app-loader /></teleport>
  <teleport to="body"> <change-heading-dialog @headingChange="saveNewHeading" /></teleport>
  <teleport to="body"> <history-dialog /></teleport>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { getSources } from '../apis/list.api.ts';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import AppLoader from '../components/Loader.vue';
import useNewsStore from '../stores/news.store.ts';
import useChangeHeadingStore from '../stores/changeHeading.store.ts';
import useNotificationStore from '../stores/notification.store.ts';
import ChangeHeadingDialog from '../components/ChangeHeadingDialog.vue';
import useVisitedHeadlinesStore from '../stores/visitedHeadlines.store.ts';
import HistoryDialog from '../components/HistoryDialog.vue';
import storage from '../includes/storage.ts';
import { NewsDataStoreInterface, Source } from '../types/list.types.ts';
import { storeToRefs } from 'pinia';

const sources = ref();
const searchHeadlineText = ref('');
const allAvailableSources = ref([] as Source[]);
const newsStore = useNewsStore();
const changeHeadingStore = useChangeHeadingStore();
const notificationStore = useNotificationStore();
const visitedHeadlinesStore = useVisitedHeadlinesStore();

const { data: newsData } = storeToRefs(newsStore);

const userInputDebounced = debounce(
  () => {
    newsStore.getHeadlinesData({
      q: searchHeadlineText.value,
      sources: sources.value
    });
    updateStoredSearchFilter();
  },
  400,
  {
    leading: false
  }
);

function updateStoredSearchFilter() {
  storage.clearFilter();
  storage.setSearchedHeadline(searchHeadlineText.value);
  storage.setSources(sources.value);
}

watch([sources, searchHeadlineText], () => {
  userInputDebounced();
});

onBeforeMount(() => {
  const storedFilters = storage.getFilter();
  sources.value = storedFilters.sources;
  searchHeadlineText.value = storedFilters.searchHeadline;
});

onMounted(async () => {
  const response = await getSources();
  allAvailableSources.value = response.data.sources?.filter((info) => info.id);

  newsStore.getHeadlinesData({});
});

function handleChangeHeadingDialog(article: NewsDataStoreInterface) {
  changeHeadingStore.isOpen = true;
  changeHeadingStore.openedArticle = article;
}

function saveNewHeading(newHeading: string, articleId: number) {
  newsStore.data[articleId] = {
    ...newsStore.data[articleId],
    newTitle: newHeading
  };
  changeHeadingStore.isOpen = false;

  notificationStore.showAlert({
    isOpen: true,
    text: 'Changed heading successfully !',
    type: 'success'
  });
}
</script>

<style lang="scss" scoped>
.card-outer {
  display: flex;
  flex-direction: column;
}
.card-actions {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  align-content: space-around;
}
.combobox {
  overflow: hidden;
  height: 80px; /* Adjust the height as needed */
}
</style>
