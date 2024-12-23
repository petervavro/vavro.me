export default defineEventHandler(async (event): Promise<{ token: string }> => {
  const body = await readBody<{ text: string }>(event);
  console.log("encrypt -> body", body);

  if (!body.text) {
    throw createError({
      statusCode: 400,
      message: "Text is required",
    });
  }

  const token = EncryptionService.encrypt(body.text);
  return { token };
});
