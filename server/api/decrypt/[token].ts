export default defineEventHandler((event) => {
  const token = getRouterParam(event, "token");

  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Token is required",
    });
  }

  try {
    return EncryptionService.decrypt(token);
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: "Invalid token",
    });
  }
});
