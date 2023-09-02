import Swal from 'sweetalert2';

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

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      },
      postErrorHandler(error: {
        message: string[] | string;
        statusCode: number;
      }) {
        switch (error.statusCode) {
          case 401: {
            localStorage.removeItem('token');
            navigateTo('/login');

            return;
          }
        }

        let errorMessage = error.message;

        if (Array.isArray(errorMessage)) {
          errorMessage = errorMessage.join(', ');
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      },
    },
  };
});
