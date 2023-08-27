<template>
  <div class="d-flex justify-center align-center flex-column">
    <div class="posts-container">
      <div v-auto-animate class="posts">
        <AtomsPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from 'types';

const { GET } = useClient();
const { params } = useRoute();
const posts = ref<components['schemas']['FindAllResponce'][]>([]);
const { $postErrorHandler } = useNuxtApp();
const title = useTitle();

title.value = params.name as string;

const fetchPosts = () => {
  GET('/post/{name}', {
    params: {
      path: {
        name: params.name as string,
      },
    },
  }).then((res) => {
    if (res.error) {
      $postErrorHandler(res.error);
    } else {
      posts.value = res.data;
    }
  });
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
.posts-container {
  width: 100dvw;
  max-width: 500px;
  padding: 0 10px;
}

.posts {
  border: 1px solid #ccc;
}
</style>
