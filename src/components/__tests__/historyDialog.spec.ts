import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import HistoryDialog from '../HistoryDialog.vue';
import { createVuetify } from 'vuetify';

describe('HistoryDialog.vue', () => {
  const vuetify = createVuetify();
  test('displays message', async () => {
    const wrapper = await shallowMount(HistoryDialog, {
      global: {
        plugins: [vuetify, createTestingPinia()]
      }
    });

    let button = wrapper.find('v-toolbar');
    expect(button.attributes().title).toContain('Visited Headlines');
  });
});
