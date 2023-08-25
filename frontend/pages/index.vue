<template>
  <div class="d-flex justify-center align-center flex-column">
    <div class="conatiner">
      <OrganismsPostInput v-model:message="message" @then="onPost" />
      <div v-auto-animate class="posts">
        <AtomsPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from 'types';

const { GET } = useClient();
const posts = ref<components['schemas']['FindAllResponce'][]>([]);
const { $postErrorHandler } = useNuxtApp();
const message = ref<string>('');

const fetchPosts = () => {
  GET('/post', {}).then((res) => {
    if (res.error) {
      $postErrorHandler(res.error);
    } else {
      posts.value = res.data;
    }
  });
};

const onPost = () => {
  message.value = '';
  fetchPosts();
};

let interval: NodeJS.Timeout;
onMounted(() => {
  fetchPosts();
  interval = setInterval(() => {
    fetchPosts();
  }, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.container {
  width: 100vw;
  max-width: 300px;
}
.posts {
  border: 1px solid #ccc;
}
</style>
