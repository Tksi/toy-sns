<template>
  <v-form v-model="form" class="w-100" @submit.prevent="onSubmit">
    <AtomsNameInput v-model:name="name" />
    <AtomsPasswordInput v-model:password="password" />
    <br />
    <v-btn block :disabled="!form" type="submit" variant="outlined"
      >Register</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';

const { POST } = useClient();
const form = ref(false);
const name = ref('');
const password = ref('');
const { $authErrorHandler } = useNuxtApp();

const onSubmit = () => {
  POST('/auth/register', {
    body: {
      name: name.value,
      password: password.value,
    },
  }).then((res) => {
    if (res.error) {
      $authErrorHandler(res.error);
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Registered!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigateTo('/login');
    }
  });
};
</script>
