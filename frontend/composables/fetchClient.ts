import createClient from 'openapi-fetch';
import type { paths } from 'types';

const runtimeConfig = useRuntimeConfig();

export const useClient = () => {
  const token = localStorage.getItem('token');

  return createClient<paths>({
    baseUrl: runtimeConfig.public.api,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
