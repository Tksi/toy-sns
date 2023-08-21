import createClient from 'openapi-fetch';
import type { paths } from 'types';
import { useRuntimeConfig } from '#imports';

const runtimeConfig = useRuntimeConfig();

export const useClient = () => {
  return createClient<paths>({
    baseUrl: runtimeConfig.public.api,
  });
};
