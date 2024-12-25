import crypto from "crypto";

export class EncryptionService {
  private static readonly algorithm: string = "aes-256-ctr";
  private static readonly secretKey: Buffer = crypto
    .createHash("sha256")
    .update(String(process.env.NUXT_ENCRYPTION_KEY || ""))
    .digest();

  public static encrypt(text: string): string {
    const iv: Buffer = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    // Combine IV and encrypted content into a single string and make it URL-safe
    const combined = JSON.stringify({
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
    });

    // Make it URL-safe by using base64 and replacing problematic characters
    return Buffer.from(combined)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  public static decrypt(urlSafeString: string): string {
    try {
      // Restore base64 padding and convert URL-safe characters back
      const base64 = urlSafeString
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(
          urlSafeString.length + ((4 - (urlSafeString.length % 4)) % 4),
          "="
        );

      // Convert back to the original object
      const combined = JSON.parse(Buffer.from(base64, "base64").toString());

      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.secretKey,
        Buffer.from(combined.iv, "hex")
      );

      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(combined.content, "hex")),
        decipher.final(),
      ]);

      return decrypted.toString();
    } catch (error) {
      throw new Error("Failed to decrypt data");
    }
  }
}
