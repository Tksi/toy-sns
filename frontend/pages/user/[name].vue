<template>
  <div class="d-flex justify-center align-center flex-column">
    <div class="posts-container">
      <div v-auto-animate :class="{ posts: posts.length > 0 }">
        <AtomsPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div ref="endOfPosts" class="endOfPosts">&nbsp;</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from 'types';

const { GET } = useClient();
const { $postErrorHandler, $uniq } = useNuxtApp();
const { params } = useRoute();
const posts = ref<components['schemas']['FindAllResponce'][]>([]);
const title = useTitle();
const endOfPosts = ref<HTMLElement>();
const maxPage = ref<number>(0);

title.value = params.name as string;

const fetchPosts = (page = 1) => {
  GET('/post/{name}', {
    params: {
      path: {
        name: params.name as string,
      },
      query: {
        page,
      },
    },
  }).then((res) => {
    if (res.error) {
      $postErrorHandler(res.error);
    } else {
      posts.value = $uniq([...posts.value, ...res.data], 'id');
    }
  });
};

let interval: NodeJS.Timeout;
onMounted(() => {
  interval = setInterval(() => {
    fetchPosts();
  }, 3000);

  const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      maxPage.value++;
      fetchPosts(maxPage.value);
    }
  });
  observer.observe(endOfPosts.value!);
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
