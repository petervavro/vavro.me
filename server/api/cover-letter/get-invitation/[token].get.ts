import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { invitationLetter } from "../../../../utils";
const { greeting, content } = invitationLetter;

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  const token = event.context.params?.token;
  const requestHost = `${
    event.node.req.headers["x-forwarded-proto"] || "http"
  }://${event.node.req.headers["host"]}`;

  const link = `${requestHost}/cover-letter/${token}`;

  // Define the HTML content
  const htmlContent = `
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    @media print {
                        @page {
                            margin: 0;
                        }
                    }

                    body {
                        font-family: "Roboto Mono", serif;
                        font-optical-sizing: auto;
                        font-weight: 400;
                        font-style: normal;
                    }
                </style>
            </head>
            <body class="bg-gray-50 p-10 text-sm">
                <h1>${greeting}</h1>
                ${content
                  .map((txt) => {
                    return `<br />
                    <p>${txt
                      .replaceAll("\n", "<br/>")
                      .replaceAll(
                        `<LINK>`,
                        `<br/><br/><span class="font-bold"><a href="${link}" target="_blank" class="break-all">${link}</a></span>`
                      )}</p>`;
                  })
                  .join("")}
            </body>
        </html>
    `;

  // Load the HTML content
  await page.setContent(htmlContent);

  // Generate the PDF
  const pdfBuffer = await page.pdf({
    format: "A5",
    printBackground: true,
  });

  await browser.close();

  const query = getQuery(event);

  // Return the PDF as a response
  setHeaders(event, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=CV-${
      query?.positionType &&
      `${(query.positionType as string)
        .split("-")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")}-`
    }${
      query?.companyName &&
      `${(query.companyName as string).replaceAll(" ", "_")}-`
    }Peter_VAVRO-invitation.pdf`,
  });

  return pdfBuffer;
});
