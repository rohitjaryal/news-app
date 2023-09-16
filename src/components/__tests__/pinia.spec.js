import { createPinia, setActivePinia } from 'pinia';
import useNewsStore from '@/stores/news.store.ts';
vi.mock('@/includes/helper', () => {
  return { convertTimeStampToTimeAgo: '' };
});

//vi.mock('@/includes/firebase', () => {
//   return { auth: { signInWithEmailAndPassword: () => Promise.resolve() } }
// })

// const mock = vi.fn().mockImplementation(() => {});

//vi.mock('@/includes/firebase', () => {
//   return { auth: { signInWithEmailAndPassword: () => Promise.resolve() } }
// })
describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('increments', () => {
    const newsStore = useNewsStore();
    expect(newsStore.data).toStrictEqual([]);
  });
});
