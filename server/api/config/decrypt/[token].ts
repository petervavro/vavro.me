export default defineEventHandler((event): { text: string } => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Token is required",
    });
  }

  try {
    const decrypted = EncryptionService.decrypt(token);
    return { text: decrypted };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: "Invalid token",
    });
  }
});
