<template>
  <v-btn @click="onClick">
    {{ label }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Hello World',
  },
});

const onClick = () => {
  alert(props.label);
};
</script>
