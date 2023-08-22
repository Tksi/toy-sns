<template>
  <v-text-field
    :value="name"
    label="name"
    variant="underlined"
    :rules="[required]"
    @input="$emit('update:name', $event.target.value)"
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
