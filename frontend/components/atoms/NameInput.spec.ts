import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createVuetify } from 'vuetify';
import NameInput from './NameInput.vue';

const vuetify = createVuetify();
global.ResizeObserver = require('resize-observer-polyfill');

describe('NameInput', () => {
  it('renders a v-text-field', () => {
    const wrapper = mount(NameInput, {
      global: { plugins: [vuetify] },
      props: {
        name: '',
      },
    });

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('emits an update:name event when the input value changes', async () => {
    const wrapper = mount(NameInput, {
      global: { plugins: [vuetify] },
      props: {
        name: '',
      },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('John Doe');

    // @ts-ignore
    expect(wrapper.emitted('update:name')[0]).toEqual(['John Doe']);
  });

  it('validates that the input is required', async () => {
    const wrapper = mount(NameInput, {
      global: { plugins: [vuetify] },
      props: {
        name: '',
      },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('');

    expect(wrapper.find('.v-messages__message').text()).toBe('Required');
  });
});
