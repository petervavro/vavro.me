import pako from "pako";

export class EncryptionServiceV2 {
  private static readonly BASE62_CHARS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static readonly BASE = BigInt(62);

  /**
   * Converts binary data to a Base62 string.
   * @param input - Binary data as Uint8Array.
   * @returns Base62 encoded string.
   */
  static toBase62(input: Uint8Array): string {
    let num = BigInt("0x" + Buffer.from(input).toString("hex"));
    if (num === BigInt(0)) return "0";

    const base62Chars = this.BASE62_CHARS;
    const base = this.BASE;
    let result = "";

    while (num > 0) {
      result = base62Chars[Number(num % base)] + result;
      num /= base;
    }

    return result;
  }

  /**
   * Converts a Base62 string back to binary data.
   * @param input - Base62 encoded string.
   * @returns Binary data as Uint8Array.
   */
  static fromBase62(input: string): Uint8Array {
    if (!input) throw new Error("Invalid Base62 input");

    const base62Chars = this.BASE62_CHARS;
    const base = this.BASE;
    let num = BigInt(0);

    for (const char of input) {
      const index = base62Chars.indexOf(char);
      if (index === -1) throw new Error(`Invalid character in Base62: ${char}`);
      num = num * base + BigInt(index);
    }

    const hex = num
      .toString(16)
      .padStart(num.toString(16).length + (num.toString(16).length % 2), "0");
    return Buffer.from(hex, "hex");
  }

  /**
   * Compresses and encodes a string into Base62 format.
   * @param text - Input text to encrypt.
   * @returns Encrypted Base62 string.
   */
  static encrypt(text: string): string {
    const compressed = pako.deflate(text);
    return this.toBase62(compressed);
  }

  /**
   * Decodes and decompresses a Base62 string back into plain text.
   * @param base62String - Encrypted Base62 string.
   * @returns Decrypted plain text.
   */
  static decrypt(base62String: string): string {
    try {
      const compressed = this.fromBase62(base62String);
      return pako.inflate(compressed, { to: "string" });
    } catch {
      throw new Error("Failed to decrypt data");
    }
  }
}
