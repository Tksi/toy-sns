<template>
  <div class="w-100" style="text-align: right">
    <NuxtLink :to="link">{{ text }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  link: string;
  text: string;
}>();
</script>

<style scoped>
a,
a:visited {
  color: #555;
}
</style>
