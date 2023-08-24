import { RouterLinkStub, mount } from '@vue/test-utils';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { mockNuxtImport } from 'nuxt-vitest/utils';
import { describe, expect, it } from 'vitest';
import { createVuetify } from 'vuetify';
import Post from './Post.vue';

TimeAgo.addDefaultLocale(en);
const vuetify = createVuetify();
global.ResizeObserver = require('resize-observer-polyfill');

mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $timeAgo: () => new TimeAgo('en-US'),
  });
});

const config = {
  global: {
    plugins: [vuetify],
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  },
};

const post = {
  id: 1,
  content: 'Lorem ipsum dolor sit amet',
  createdAt: new Date().toISOString(),
  user: {
    id: 1,
    name: 'John Doe',
  },
};

describe('Post', () => {
  it('renders the user name as a NuxtLink component', () => {
    const wrapper = mount(Post, {
      ...config,
      props: {
        post,
      },
    });

    const nuxtLink = wrapper.findComponent(RouterLinkStub);
    expect(nuxtLink.exists()).toBe(true);
    expect(nuxtLink.props('to')).toBe('/user/John Doe');
    expect(nuxtLink.text()).toBe('John Doe');
  });

  it('renders the post content', () => {
    const wrapper = mount(Post, {
      ...config,
      props: {
        post,
      },
    });

    const content = wrapper.find('.content');
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('Lorem ipsum dolor sit amet');
  });

  it('renders the post creation time using $timeAgo', () => {
    const wrapper = mount(Post, {
      ...config,
      props: {
        post,
      },
    });

    const timeAgo = wrapper.find('.text-muted');
    expect(timeAgo.exists()).toBe(true);
    expect(timeAgo.text()).toBe('just now');
  });
});
