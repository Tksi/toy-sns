<template>
  <div class="d-flex justify-center align-center h-100">
    <div
      class="d-flex justify-center align-center flex-column"
      style="width: 200px"
    >
      <OrganismsRegisterForm />
      <AtomsGrayLink link="/login" text="Login" />
    </div>
  </div>
</template>

<script setup lang="ts">
const title = useTitle();

title.value = 'Register';
</script>
