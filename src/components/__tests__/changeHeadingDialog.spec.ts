import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ChangeHeadingDialog from '../ChangeHeadingDialog.vue';
import vuetify from '../../includes/Vuetify.ts';

describe('Change Heading Dialog.vue', () => {
  // beforeEach(() => {
  //   // creates a fresh pinia and make it active so it's automatically picked
  //   // up by any useStore() call without having to pass it to it:
  //   // `useStore(pinia)`
  //   setActivePinia(createPinia());
  // });

  test('renders inner text', () => {
    const wrapper = shallowMount(ChangeHeadingDialog, {
      global: {
        plugins: [createTestingPinia(), vuetify],
        mocks: {
          $t: (message: string) => message
          // isOpen: false,
        }
      }
    });

    expect(wrapper.text()).toContain('Change Heading');
  });
});
