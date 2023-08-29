<template>
  <v-text-field
    :model-value="name"
    label="name"
    variant="underlined"
    :rules="[required]"
    @update:model-value="$emit('update:name', $event)"
  ></v-text-field>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
}>();
defineEmits<{
  'update:name': [];
}>();

const required = (v: string) => !!v || 'Required';
</script>
