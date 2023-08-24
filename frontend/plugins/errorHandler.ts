export default defineNuxtPlugin(() => {
  return {
    provide: {
      authErrorHandler(error: {
        message: string[] | string;
        statusCode: number;
      }): string {
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
          case 500: {
            alert(error.message);

            break;
          }
        }

        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(', ');
        }

        return errorMessage;
      },
      postErrorHandler(error: { message: string; statusCode: number }): string {
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
          case 500: {
            alert(error.message);

            break;
          }
        }

        return error.message;
      },
    },
  };
});
