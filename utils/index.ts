export const invitationLetter = {
  greeting: "Hello!",
  content: [
    `I take a slightly different approach to presenting myself. Rather than providing a traditional static document, I invite you to explore my cover letter on my portfolio website. There, you’ll find a more dynamic and interactive presentation of my professional story, including my projects, achievements, and skills.`,
    `I've crafted this cover letter specifically for your company: <LINK>`,
    `Feel free to browse through my portfolio for additional insights into my work. I greatly appreciate your time and collaboration in this process and hope this approach offers a refreshing and engaging perspective. If you have any questions or need further information, don’t hesitate to reach out.`,
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
