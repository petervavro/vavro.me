export const invitationLetter = {
  greeting: "Hello!",
  content: [
    `I’ve reimagined the cover letter experience. Rather than a static document, I invite you to view it on my portfolio site for a more interactive introduction: <LINK>`,
    `Looking forward to connecting!`,
    `Warm regards,\nIng. Peter Vavro\npeter@vavro.me`,
  ],
};

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard.");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
