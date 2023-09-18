import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createVuetify } from 'vuetify';
import ChangeHeadingDialog from '../ChangeHeadingDialog.vue';

describe('Change Heading Dialog.vue', () => {
  const vuetify = createVuetify();
  test('displays Title', async () => {
    const wrapper = await shallowMount(ChangeHeadingDialog, {
      global: {
        plugins: [vuetify, createTestingPinia()]
      }
    });

    let toolbar = wrapper.find('v-toolbar');
    expect(toolbar.attributes().title).toContain('Change Headline');
  });
});
