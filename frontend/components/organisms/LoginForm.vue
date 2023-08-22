<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
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
const errorMessage = ref('');

const onSubmit = () => {
  POST('/auth/login', {
    body: {
      name: name.value,
      password: password.value,
    },
  }).then((res) => {
    if (res.error) {
      switch (res.error.statusCode) {
        case 401: {
          errorMessage.value = 'Invalid name or password';

          break;
        }

        default: {
          if (Array.isArray(res.error.message)) {
            errorMessage.value = res.error.message.join(', ');
          } else {
            errorMessage.value = res.error.message;
          }

          break;
        }
      }

      alert(errorMessage.value);
    } else {
      localStorage.setItem('token', res.data.token);
      navigateTo('/');
    }
  });
};
</script>
