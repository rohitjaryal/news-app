import { shallowMount } from '@vue/test-utils';
import Header from '../Header.vue';

describe('Header.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(Header, {});
    expect(wrapper.text()).toContain('News');
  });
});
