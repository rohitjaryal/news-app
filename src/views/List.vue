<template>
  <v-form v-model="valid">
    <v-container>
      <v-row justify="space-evenly">
        <v-col md="3" align-self="center">
          <v-combobox
            v-model="sources"
            label="Choose Sources"
            :items="allAvailableSources"
            item-title="name"
            item-value="id"
            multiple
            hide-selected
          ></v-combobox>
        </v-col>

        <v-col md="3">
          <v-text-field
            v-model="searchHeadlineText"
            :counter="255"
            label="Search Headline"
          ></v-text-field>
        </v-col>
        <v-col md="3" align-self="center">
          <v-btn
            width="100%"
            class="text-capitalize"
            variant="elevated"
            :disabled="!newsStore.visitedHeadlines.length"
            @click.prevent="visitedHeadlinesStore.isOpen = true"
            >Visited headlines
          </v-btn>
        </v-col>
        <v-col md="3" align-self="center">
          <v-btn width="100%" @click.prevent="newsStore.errorApiCall()" class="text-capitalize">
            Error API Call
          </v-btn>
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
          :title="data.newTitle || data.title || ' '"
          :subtitle="data.source.name || ' '"
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
              >Change Heading</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <teleport to="body"> <app-loader /></teleport>
  <teleport to="body"> <change-heading-dialog @headingChange="saveNewHeading" /></teleport>
  <teleport to="body"> <history-dialog /></teleport>
</template>

<script setup>
import { debounce } from 'lodash';
import { getSources } from '@/apis/list.api.ts';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import AppLoader from '@/components/Loader.vue';
import useNewsStore from '@/stores/news.store.ts';
import useChangeHeadingStore from '@/stores/changeHeading.store.ts';
import useNotificationStore from '@/stores/notification.store.ts';
import ChangeHeadingDialog from '@/components/ChangeHeadingDialog.vue';
import useVisitedHeadlinesStore from '../stores/visitedHeadlines.store.ts';
import HistoryDialog from '@/components/HistoryDialog.vue';
import storage from '@/includes/storage.ts';

const sources = ref(null);
const searchHeadlineText = ref('');
const allAvailableSources = ref([]);
const newsStore = useNewsStore();
const changeHeadingStore = useChangeHeadingStore();
const notificationStore = useNotificationStore();
const visitedHeadlinesStore = useVisitedHeadlinesStore();

const userInputDebounced = debounce(
  (params) => {
    newsStore.getHeadlinesData({
      q: searchHeadlineText.value,
      sources: sources.value
    });

    // save to client storage
    saveSearchFilter();
  },
  400,
  {
    leading: false
  }
);

function saveSearchFilter() {
  storage.setSearchedHeadline(searchHeadlineText.value);
  storage.setSources(sources.value);
}

watch([sources, searchHeadlineText], () => {
  if (sources.value || searchHeadlineText.value) {
    userInputDebounced();
  }
});

onBeforeMount(() => {
  console.log('onBeforeMount:>>');
  const storedFilters = storage.getFilter();
  sources.value = storedFilters.sources;
  searchHeadlineText.value = storedFilters.searchHeadline;
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
</style>
