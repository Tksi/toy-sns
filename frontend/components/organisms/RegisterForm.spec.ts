import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { createVuetify } from 'vuetify';
import RegisterForm from './RegisterForm.vue';

const vuetify = createVuetify();
global.ResizeObserver = require('resize-observer-polyfill');

vi.mock('#imports', () => {
  return {
    useRuntimeConfig: () => {
      return {
        public: {
          api: 'http://localhost:4000',
        },
      };
    },
  };
});

describe('RegisterForm', () => {
  it('renders a NameInput component', () => {
    const wrapper = mount(RegisterForm, {
      global: { plugins: [vuetify] },
    });

    expect(wrapper.findComponent({ name: 'NameInput' }).exists()).toBe(true);
  });

  it('renders a PasswordInput component', () => {
    const wrapper = mount(RegisterForm, { global: { plugins: [vuetify] } });

    expect(wrapper.findComponent({ name: 'PasswordInput' }).exists()).toBe(
      true,
    );
  });

  it('disables the submit button when the form is invalid', async () => {
    const wrapper = mount(RegisterForm, { global: { plugins: [vuetify] } });

    const nameInput = wrapper.findComponent({ name: 'NameInput' });
    await nameInput.find('input').setValue('John Doe');

    const passwordInput = wrapper.findComponent({ name: 'PasswordInput' });
    await passwordInput.find('input').setValue('password123');

    // @ts-ignore
    expect(wrapper.find('button[type="submit"]').isDisabled()).toBeFalsy();

    await passwordInput.find('input').setValue('');
    // @ts-ignore
    expect(wrapper.find('button[type="submit"]').isDisabled()).toBeTruthy();
  });

  it('submits the form when the submit button is clicked', async () => {
    const wrapper = mount(RegisterForm, { global: { plugins: [vuetify] } });

    const nameInput = wrapper.findComponent({ name: 'NameInput' });
    await nameInput.find('input').setValue('John Doe');

    const passwordInput = wrapper.findComponent({ name: 'PasswordInput' });
    await passwordInput.find('input').setValue('password123');

    const submitButton = wrapper.find('button[type="submit"]');
    await submitButton.trigger('submit');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });
});
