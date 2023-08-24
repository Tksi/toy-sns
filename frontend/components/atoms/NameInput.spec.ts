import { mountSuspended as mount } from 'nuxt-vitest/utils';
import { describe, expect, it } from 'vitest';
import NameInput from './NameInput.vue';

describe('NameInput', () => {
  it('renders a v-text-field', async () => {
    const wrapper = await mount(NameInput, {
      props: {
        name: '',
      },
    });

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('emits an update:name event when the input value changes', async () => {
    const wrapper = await mount(NameInput, {
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
    const wrapper = await mount(NameInput, {
      props: {
        name: '',
      },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('');

    expect(wrapper.find('.v-messages__message').text()).toBe('Required');
  });
});
