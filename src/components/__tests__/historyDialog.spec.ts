import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HistoryDialog from '../HistoryDialog.vue';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/includes/helper', () => {
  return { convertTimeStampToTimeAgo: '' };
});

describe('HistoryDialog.vue', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  test('renders inner text', () => {
    const wrapper = shallowMount(HistoryDialog, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    expect(wrapper.findComponent({ id: 'visited-headlines-title' })).toContain('Visited Headlines');
  });
});
