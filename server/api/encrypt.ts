export default defineEventHandler(async (event): Promise<{ token: string }> => {
  const body = await readBody<Record<string, any>>(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Body to encrypt not found",
    });
  }

  const token = EncryptionService.encrypt(JSON.stringify(body));

  return { token };
});
