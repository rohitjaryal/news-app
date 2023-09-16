import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import List from '@/views/List.vue';
import { createTestingPinia } from '@pinia/testing';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/includes/helper', () => {
  return { convertTimeStampToTimeAgo: '' };
});

describe('router', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  test('renders song items links', () => {
    const list = {
      docID: 'abc'
    };

    // const wrapper = shallowMount(List, {
    //   props: {
    //     song
    //   },
    //   global: {
    //     plugins: [createTestingPinia()],
    //     components: {
    //       'router-link': RouterLinkStub
    //     }
    //   }
    // });

    const wrapper = shallowMount(List, {
      props: {
        list
      },
      global: {
        plugins: [createTestingPinia()],
        components: {
          'router-link': RouterLinkStub
        }
      }
    });

    debugger;

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'list'
    });
  });
});
