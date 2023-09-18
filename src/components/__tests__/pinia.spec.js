import { createPinia, setActivePinia } from 'pinia';
import useNewsStore from '@/stores/news.store.ts';

describe('verify Pinia news Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('add article', () => {
    const newsStore = useNewsStore();
    expect(newsStore.data).toStrictEqual([]);

    newsStore.data.value = [{ articleId: 1 }];
    expect(newsStore.data.value.length).toStrictEqual(1);
  });
});
