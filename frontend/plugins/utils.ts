export default defineNuxtPlugin(() => {
  return {
    provide: {
      uniq: <T>(objArr: T[], key: keyof T): T[] => {
        return (
          [...new Map(objArr.map((obj) => [obj[key], obj])).values()]
            // @ts-ignore
            .toSorted((a, b) => b[key] - a[key])
        );
      },
    },
  };
});
