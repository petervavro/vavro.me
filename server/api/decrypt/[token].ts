export default defineEventHandler((event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Token is required",
    });
  }

  try {
    return EncryptionServiceV2.decrypt(token);
  } catch {
    try {
      return EncryptionService.decrypt(token);
    } catch {
      throw createError({
        statusCode: 400,
        message: "Invalid token",
      });
    }
  }
});
