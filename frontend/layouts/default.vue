<template>
  <v-app>
    <v-app-bar color="rgba(255, 255, 255, 0.9)" elevation="0">
      <v-btn icon="mdi-home" @click="toHome"> </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-btn icon="mdi-logout" @click="logout"> </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const title = useTitle();
useHead({
  title,
  meta: [
    {
      name: 'robots',
      content: 'noindex nofollow',
    },
  ],
});

const toHome = () => {
  navigateTo('/');
};

const logout = () => {
  localStorage.removeItem('token');
  navigateTo('/login');
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul > li {
  list-style: '• ' inside;
}

ol > li {
  list-style: decimal inside;
}

code {
  background-color: rgb(239, 239, 239);
  border-radius: 0.3em;
  padding: 0.15em 0.2em;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
}

table th {
  padding: 0 0.25rem;
  font-weight: bold;
  border: 1px solid #ddd;
}

table td {
  padding: 0 0.25rem;
  border: 1px solid #ddd;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

ul li {
  margin-left: 0.25rem;
}

li ul li {
  margin-left: 0.75rem;
}

html {
  font-family: 'Noto Sans JP', sans-serif;
}

.swal2-confirm {
  background-color: inherit !important;
  color: black !important;
  border: solid 1px black !important;
}

.swal2-confirm:focus {
  box-shadow: 0 0 0 3px rgba(225, 225, 225, 0.75) !important;
}
</style>
