export const invitationLetter = {
  greeting: "Hello!",
  content: [
    `I take a slightly different approach to presenting myself. Rather than providing a traditional static document, I invite you to explore my cover letter on my portfolio website: <LINK>`,
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
