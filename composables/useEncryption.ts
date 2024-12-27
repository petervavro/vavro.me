export const useEncryption = () => {
  const { push } = useRouter();

  const encryptAndRedirect = async (
    body: Record<string, any>,
    cb?: (token: string) => string
  ) => {
    try {
      const { token } = await $fetch<{ token: string }>("/api/encrypt", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // Redirect to a page with the encrypted token
      cb && push(cb(token));
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  const decrypt = async (token: string) => {
    return await $fetch<{ text: string }>(`/api/decrypt/${token}`);
  };

  return {
    encryptAndRedirect,
    decrypt,
  };
};
