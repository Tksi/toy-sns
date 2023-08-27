<template>
  <div class="d-flex justify-center align-center h-screen">
    <div
      class="d-flex justify-center align-center flex-column"
      style="width: 200px"
    >
      <OrganismsLoginForm />
      <AtomsGrayLink link="/register" text="Register" />
    </div>
  </div>
</template>

<script setup lang="ts">
const title = useTitle();

title.value = 'Login';
</script>
