<template>
  <v-text-field
    :value="password"
    :rules="[required]"
    type="password"
    label="password"
    variant="underlined"
    @input="$emit('update:password', $event.target.value)"
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps({
  password: {
    type: String,
    required: true,
  },
});
defineEmits(['update:password']);

const required = (v: string) => !!v || 'Required';
</script>
