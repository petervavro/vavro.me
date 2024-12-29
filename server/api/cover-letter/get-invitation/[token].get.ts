import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export default defineEventHandler(async (event) => {
  // chromium.setHeadlessMode = process.env.NODE_ENV !== "development"; // < DEV

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
                <h1>Hello!</h1>
                <br />
                <p>I take a slightly different approach to presenting myself. Rather than providing a traditional static
                    document, I invite you to explore my cover letter on my portfolio website. There, you’ll find a more
                    dynamic
                    and interactive presentation of my professional story, including my projects, achievements, and
                    skills.
                </p>
                <br />
                <p class="break-all"><b class="font-bold">I've crafted this cover letter specifically for your company:</b>&nbsp;
                    <a href="${requestHost}/cover-letter/${token}" target="_blank">
                        ${requestHost}/cover-letter/${token}
                    </a>
                </p>
                <br />
                <p>Feel free to browse through my portfolio for additional insights into my work. I greatly appreciate
                    your
                    time and collaboration in this process and hope this approach offers a refreshing and engaging
                    perspective.
                    If you have any questions or need further information, don’t hesitate to reach out.
                </p>
                <br />
                <p>
                    Looking forward to connecting!
                </p>
                <br />
                <p>Warm regards,<br />Ing. Peter Vavro<br />peter@vavro.me</p>
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
