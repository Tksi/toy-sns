import { mountSuspended as mount } from 'nuxt-vitest/utils';
import { describe, expect, it } from 'vitest';
import GrayLink from './GrayLink.vue';

describe('GrayLink', () => {
  it('renders a NuxtLink component with the correct props', async () => {
    const wrapper = await mount(GrayLink, {
      props: {
        link: '/',
        text: 'root',
      },
    });

    const nuxtLink = wrapper.find('a');
    expect(nuxtLink.attributes('href')).toBe('/');
    expect(nuxtLink.text()).toBe('root');
  });
});
