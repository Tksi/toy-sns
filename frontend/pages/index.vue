<template>
  <div class="d-flex justify-center align-center flex-column">
    <div class="home-container">
      <OrganismsPostInput v-model:message="message" @then="onPost" />
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
const posts = ref<components['schemas']['FindAllResponce'][]>([]);
const message = ref<string>('');
const title = useTitle();
const endOfPosts = ref<HTMLElement>();
const maxPage = ref<number>(0);

title.value = 'Home';

const fetchPosts = (page = 1) => {
  GET('/post', {
    params: {
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

const onPost = () => {
  message.value = '';
  fetchPosts();
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
.home-container {
  width: 100vw;
  max-width: 500px;
  padding: 0 10px;
}
.posts {
  border: 1px solid #ccc;
}
</style>
