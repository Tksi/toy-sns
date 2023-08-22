import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GrayLink from './GrayLink.vue';

describe('GrayLink', () => {
  it('renders a NuxtLink component with the correct props', () => {
    const wrapper = mount(GrayLink, {
      props: {
        link: '/test',
        text: 'test',
      },
      global: {
        stubs: {
          NuxtLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/test');
    expect(wrapper.findComponent(RouterLinkStub).text()).toBe('test');
  });
});
