<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <p>{{ post.user.name }}</p>
        <p>{{ post.content }}</p>
        <p>{{ post.createdAt }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Post = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

const { GET } = useClient();
const route = useRoute();
const posts = ref<Post[]>([]);
const { $postErrorHandler } = useNuxtApp();

GET('/post/{name}', {
  params: {
    path: {
      name: route.params.name as string,
    },
  },
}).then((res) => {
  if (res.error) {
    $postErrorHandler(res.error);
  } else {
    posts.value = res.data;
  }
});
</script>
