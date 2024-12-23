export const useEncryption = () => {
  const { push } = useRouter();

  const encryptAndRedirect = async (text: string) => {
    try {
      const { token } = await $fetch<{ token: string }>("/api/config/encrypt", {
        method: "POST",
        body: { text },
      });

      // Redirect to a page with the encrypted token
      push(`/cover-letter/${token}`);
    } catch (error) {
      console.error("Encryption error:", error);
    }
  };

  const decrypt = async (token: string) => {
    try {
      return await $fetch<{ text: string }>(`/api/config/decrypt/${token}`);
    } catch (error) {
      console.error("Decryption error:", error);
    }
  };

  return {
    encryptAndRedirect,
    decrypt,
  };
};
