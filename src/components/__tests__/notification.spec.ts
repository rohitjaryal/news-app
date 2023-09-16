import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Notification from '../Notification.vue';

describe('Notification.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(Notification, {
      global: {
        // plugins: [createTestingPinia()]
      }
    });

    expect(wrapper.text()).toContain('Change Heading');
  });
});
