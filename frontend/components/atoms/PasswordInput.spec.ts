import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createVuetify } from 'vuetify';
import PasswordInput from './PasswordInput.vue';

const vuetify = createVuetify();
global.ResizeObserver = require('resize-observer-polyfill');

describe('PasswordInput', () => {
  it('renders a v-text-field with type "password"', () => {
    const wrapper = mount(PasswordInput, {
      global: { plugins: [vuetify] },
      props: {
        password: '',
      },
    });

    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('emits an update:password event when the input value changes', async () => {
    const wrapper = mount(PasswordInput, {
      global: { plugins: [vuetify] },
      props: {
        password: '',
      },
    });

    const input = wrapper.find('input[type="password"]');
    await input.setValue('password123');

    // @ts-ignore
    expect(wrapper.emitted('update:password')[0]).toEqual(['password123']);
  });

  it('validates that the input is required', async () => {
    const wrapper = mount(PasswordInput, {
      global: { plugins: [vuetify] },
      props: {
        password: '',
      },
    });

    const input = wrapper.find('input[type="password"]');
    await input.setValue('');

    expect(wrapper.find('.v-messages__message').text()).toBe('Required');
  });
});
