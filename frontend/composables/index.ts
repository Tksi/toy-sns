import createClient from 'openapi-fetch';
import { useRuntimeConfig } from '#imports';
import type { paths } from 'types';

const runtimeConfig = useRuntimeConfig();

export const useClient = () => {
  return createClient<paths>({
    baseUrl: runtimeConfig.public.api,
  });
};
