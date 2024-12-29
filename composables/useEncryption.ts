export const useEncryption = () => {
  const encrypt = async (body: Record<string, any>) => {
    try {
      const { token } = await $fetch<{ token: string }>("/api/encrypt", {
        method: "POST",
        body: JSON.stringify(body),
      });

      return token;
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  const decrypt = async (token: string) => {
    return await $fetch<{ text: string }>(`/api/decrypt/${token}`);
  };

  return {
    encrypt,
    decrypt,
  };
};
