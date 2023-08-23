export default defineNuxtRouteMiddleware((to) => {
  // 404 to home
  if (to.matched.length === 0) {
    return navigateTo('/');
  }

  // tokenがある
  if (localStorage.getItem('token')) {
    switch (to.path) {
      case '/register':
      case '/login': {
        return navigateTo('/');
      }
    }
  }
  // tokenがない
  else {
    switch (to.path) {
      case '/login':
      case '/register': {
        break;
      }
      default: {
        return navigateTo('/login');
      }
    }
  }
});
