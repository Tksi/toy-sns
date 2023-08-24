import { mountSuspended as mount } from 'nuxt-vitest/utils';
import { describe, expect, it } from 'vitest';
import PasswordInput from './PasswordInput.vue';

describe('PasswordInput', () => {
  it('renders a v-text-field with type "password"', async () => {
    const wrapper = await mount(PasswordInput, {
      props: {
        password: '',
      },
    });

    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  it('emits an update:password event when the input value changes', async () => {
    const wrapper = await mount(PasswordInput, {
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
    const wrapper = await mount(PasswordInput, {
      props: {
        password: '',
      },
    });

    const input = wrapper.find('input[type="password"]');
    await input.setValue('');

    expect(wrapper.find('.v-messages__message').text()).toBe('Required');
  });
});
