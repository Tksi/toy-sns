// @vitest-environment nuxt
import { mountSuspended as mount } from 'nuxt-vitest/utils';
import { describe, expect, it } from 'vitest';
import Post from './Post.vue';

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
  it('renders the user name as a NuxtLink component', async () => {
    const wrapper = await mount(Post, {
      props: {
        post,
      },
    });

    const nuxtLink = wrapper.find('a');
    expect(nuxtLink.exists()).toBe(true);
    expect(nuxtLink.attributes('href')).toBe('/user/John Doe');
    expect(nuxtLink.text()).toBe('John Doe');
  });

  it('renders the post content', async () => {
    const wrapper = await mount(Post, {
      props: {
        post,
      },
    });

    const content = wrapper.find('.content');
    expect(content.exists()).toBe(true);
    expect(content.text()).toBe('Lorem ipsum dolor sit amet');
  });

  it('renders the post creation time using $timeAgo', async () => {
    const wrapper = await mount(Post, {
      props: {
        post,
      },
    });

    const timeAgo = wrapper.find('.text-muted');
    expect(timeAgo.exists()).toBe(true);
    expect(timeAgo.text()).toBe('just now');
  });
});
