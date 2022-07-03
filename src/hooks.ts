export const handle = async ({ event, resolve }: { event: unknown, resolve: (event: unknown, config: object) => Promise<unknown> }) => {
  const response = await resolve(event, {
    ssr: false,
  });
  return response;
};
