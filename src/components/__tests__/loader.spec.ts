import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Loader from '../Loader.vue';

describe('Loader.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(Loader, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    expect(wrapper.text()).toContain('Loading');
  });
});
