<template>
  <div>
    <h1>{{ route.params.name }}</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <p>{{ post.content }}</p>
        <p>{{ post.createdAt }}</p>
        <p>{{ post.user.name }}</p>
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

GET('/post/{name}', {
  params: {
    path: {
      name: route.params.name as string,
    },
  },
}).then((res) => {
  if (res.error) {
    switch (res.error.statusCode) {
      case 404: {
        navigateTo('/');

        break;
      }
      case 401: {
        navigateTo('/login');

        break;
      }
      case 500: {
        alert(res.error.message);

        break;
      }
    }
  }

  if (res.data) {
    posts.value = res.data;
  }
});
</script>
