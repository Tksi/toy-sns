<template>
  <v-form v-model="form" class="w-100" @submit.prevent="onSubmit">
    <AtomsNameInput v-model:name="name" />
    <AtomsPasswordInput v-model:password="password" />
    <br />
    <v-btn block :disabled="!form" type="submit" variant="outlined"
      >Login</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
const { POST } = useClient();
const form = ref(false);
const name = ref('');
const password = ref('');
const { $authErrorHandler } = useNuxtApp();

const onSubmit = () => {
  POST('/auth/login', {
    body: {
      name: name.value,
      password: password.value,
    },
  }).then((res) => {
    if (res.error) {
      const errorMessage = $authErrorHandler(res.error);
      alert(errorMessage);
    } else {
      localStorage.setItem('token', res.data.token);
      navigateTo('/');
    }
  });
};
</script>
