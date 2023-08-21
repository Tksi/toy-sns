<template>
  <v-form v-model="form" @submit.prevent="onSubmit">
    <AtomsNameInput v-model:name="name" />
    <AtomsPasswordInput v-model:password="password" />
    <br />
    <v-btn block :disabled="!form" type="submit" variant="outlined"
      >Register</v-btn
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
  POST('/auth/register', {
    body: {
      name: name.value,
      password: password.value,
    },
  }).then((res) => {
    if (res.error) {
      switch (res.error.statusCode) {
        case 409: {
          errorMessage.value = 'Name already exists';

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
      alert('Registered!');
      navigateTo('/login');
    }
  });
};
</script>
