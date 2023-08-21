import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { createVuetify } from 'vuetify';
import HelloWorld from './HelloWorld.vue';

const vuetify = createVuetify();
global.ResizeObserver = require('resize-observer-polyfill');

describe('HelloWorld', () => {
  test('default', () => {
    const wrapper = mount(HelloWorld, {
      global: { plugins: [vuetify] },
    });

    expect(wrapper.text()).toContain('Hello World');
  });

  test('props', () => {
    const wrapper = mount(HelloWorld, {
      global: { plugins: [vuetify] },
      propsData: {
        label: 'Hi!',
      },
    });

    expect(wrapper.text()).toContain('Hi!');
  });

  test('click', async () => {
    const wrapper = mount(HelloWorld, {
      global: { plugins: [vuetify] },
    });

    global.alert = vi.fn();
    await wrapper.trigger('click');
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
