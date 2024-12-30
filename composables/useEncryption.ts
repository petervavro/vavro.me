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
    const values = await useFetch(`/api/decrypt/${token}`);

    return {
      ...values,
      ...(values.error.value && { error: "FAILED_TO_DECRYPT_TOKEN" }),
    };
  };

  return {
    encrypt,
    decrypt,
  };
};
