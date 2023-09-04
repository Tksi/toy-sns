<template>
  <div class="post-container">
    <div class="name-container">
      <NuxtLink class="name" :to="`/user/${post.user.name}`">{{
        post.user.name
      }}</NuxtLink>
      <small class="text-muted">{{
        $timeAgo().format(new Date(post.createdAt))
      }}</small>
    </div>
    <div class="content">
      <AtomsMarkDown :src="post.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from 'types';

const { $timeAgo } = useNuxtApp();
defineProps<{
  post: components['schemas']['FindAllResponce'];
}>();
</script>

<style scoped>
.post-container {
  border: 1px solid #ccc;
}

.name-container {
  margin: 10px 0;
}

.name {
  color: inherit;
  font-weight: bold;
  font-size: 1rem;
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: inherit;
  }
}

.content {
  font-size: 1.2rem;
  margin: 10px;
  word-break: break-all;
}
</style>
