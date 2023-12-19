<template>
  <v-text-field
    :model-value="password"
    :rules="[required]"
    type="password"
    label="password"
    variant="underlined"
    @update:model-value="$emit('update:password', $event)"
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps<{
  password: string;
}>();
defineEmits<{
  'update:password': [event: string];
}>();

const required = (v: string) => !!v || 'Required';
</script>
