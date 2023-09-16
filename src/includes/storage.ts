const storagePrefix = 'news_app_v1_';
const sources = `${storagePrefix}_sources`;
const searchHeadline = `${storagePrefix}_searchHeadline`;

const storageStrategy = window.localStorage;

const storage = {
  getFilter: () => {
    return {
      sources: JSON.parse(storageStrategy.getItem(sources) as string) || null,
      searchHeadline: JSON.parse(storageStrategy.getItem(searchHeadline) as string) || null
    };
  },
  setSources: (value: []) => {
    if (value.length) {
      storageStrategy.setItem(sources, JSON.stringify(value));
    }
  },
  setSearchedHeadline: (value: '') => {
    if (value) {
      storageStrategy.setItem(searchHeadline, JSON.stringify(value));
    }
  },
  clearFilter: () => {
    storageStrategy.removeItem(sources);
    storageStrategy.removeItem(searchHeadline);
  }
};

export default storage;
