export default defineNuxtPlugin(() => {
  return {
    provide: {
      authErrorHandler(error: {
        message: string[] | string;
        statusCode: number;
      }) {
        let errorMessage = error.message;

        switch (error.statusCode) {
          case 401: {
            errorMessage = 'Invalid name or password';

            break;
          }
          case 409: {
            errorMessage = 'Name already exists';

            break;
          }
        }

        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(', ');
        }

        alert(errorMessage);
      },
      postErrorHandler(error: { message: string; statusCode: number }) {
        switch (error.statusCode) {
          case 401: {
            localStorage.removeItem('token');
            navigateTo('/login');

            break;
          }
          case 404: {
            navigateTo('/');

            break;
          }
        }

        alert(error.message);
      },
    },
  };
});
