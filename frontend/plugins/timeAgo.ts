import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      timeAgo: () => new TimeAgo('en-US'),
    },
  };
});
