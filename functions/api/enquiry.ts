interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
}

interface EnquiryBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  organisation?: string;
  product?: string;
  challenge?: string;
  consent?: boolean;
  turnstileToken?: string;
}

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
}

interface ResendResponse {
  id?: string;
  message?: string;
  name?: string;
}

const allowedProducts = new Set([
  "vara-ai",
  "nezbow-ai",
  "video-intelligence",
  "bhomara",
]);

const productLabels: Record<string, string> = {
  "vara-ai": "VARA AI",
  "nezbow-ai": "NEZBOW AI",
  "video-intelligence": "Video Intelligence",
  bhomara: "BHOMARA",
};

function jsonResponse(
  data: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteIp?: string,
): Promise<boolean> {
  const formData = new FormData();

  formData.append("secret", secretKey);
  formData.append("response", token);

  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json<TurnstileResponse>();

    return result.success === true;
  } catch {
    return false;
  }
}

async function sendEnquiryEmail(
  apiKey: string,
  enquiry: {
    firstName: string;
    lastName: string;
    email: string;
    organisation: string;
    product: string;
    challenge: string;
  },
): Promise<boolean> {
  const productLabel =
    productLabels[enquiry.product] ?? enquiry.product;

  const fullName = `${enquiry.firstName} ${enquiry.lastName}`;

  const subject =
    `New BHOMARA enquiry — ${productLabel} — ${fullName}`;

  const text = [
    "New BHOMARA website enquiry",
    "",
    `Name: ${fullName}`,
    `Email: ${enquiry.email}`,
    `Organisation: ${enquiry.organisation}`,
    `Product / Service: ${productLabel}`,
    "",
    "Business challenge:",
    enquiry.challenge,
  ].join("\n");

  const html = `
    <h2>New BHOMARA website enquiry</h2>

    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
    <p><strong>Organisation:</strong> ${escapeHtml(enquiry.organisation)}</p>
    <p><strong>Product / Service:</strong> ${escapeHtml(productLabel)}</p>

    <h3>Business challenge</h3>
    <p>${escapeHtml(enquiry.challenge).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BHOMARA Enquiries <enquiries@mail.bhomara.com>",
        to: ["hello@bhomara.com"],
        reply_to: enquiry.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json<ResendResponse>();

    return typeof result.id === "string" && result.id.length > 0;
  } catch {
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: EnquiryBody;

  try {
    body = await context.request.json<EnquiryBody>();
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "Invalid request body.",
      },
      400,
    );
  }

  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const email = clean(body.email).toLowerCase();
  const organisation = clean(body.organisation);
  const product = clean(body.product);
  const challenge = clean(body.challenge);
  const turnstileToken = clean(body.turnstileToken);

  if (
    !firstName ||
    !lastName ||
    !email ||
    !organisation ||
    !product ||
    !challenge
  ) {
    return jsonResponse(
      {
        ok: false,
        error: "Please complete all required fields.",
      },
      400,
    );
  }

  if (!isValidEmail(email)) {
    return jsonResponse(
      {
        ok: false,
        error: "Please enter a valid email address.",
      },
      400,
    );
  }

  if (!allowedProducts.has(product)) {
    return jsonResponse(
      {
        ok: false,
        error: "Please select a valid product or service.",
      },
      400,
    );
  }

  if (body.consent !== true) {
    return jsonResponse(
      {
        ok: false,
        error: "Consent is required before submitting this enquiry.",
      },
      400,
    );
  }

  if (
    firstName.length > 100 ||
    lastName.length > 100 ||
    email.length > 254 ||
    organisation.length > 200 ||
    challenge.length > 5000
  ) {
    return jsonResponse(
      {
        ok: false,
        error: "One or more fields are too long.",
      },
      400,
    );
  }

  if (!turnstileToken) {
    return jsonResponse(
      {
        ok: false,
        error: "Security verification is required.",
      },
      400,
    );
  }

  if (!context.env.TURNSTILE_SECRET_KEY) {
    return jsonResponse(
      {
        ok: false,
        error: "Security verification is not configured.",
      },
      503,
    );
  }

  if (!context.env.RESEND_API_KEY) {
    return jsonResponse(
      {
        ok: false,
        error: "Enquiry delivery is not configured.",
      },
      503,
    );
  }

  const remoteIp =
    context.request.headers.get("CF-Connecting-IP") ?? undefined;

  const turnstileVerified = await verifyTurnstile(
    turnstileToken,
    context.env.TURNSTILE_SECRET_KEY,
    remoteIp,
  );

  if (!turnstileVerified) {
    return jsonResponse(
      {
        ok: false,
        error: "Security verification failed. Please try again.",
      },
      400,
    );
  }

  const emailAccepted = await sendEnquiryEmail(
    context.env.RESEND_API_KEY,
    {
      firstName,
      lastName,
      email,
      organisation,
      product,
      challenge,
    },
  );

  if (!emailAccepted) {
    return jsonResponse(
      {
        ok: false,
        error:
          "We could not deliver your enquiry right now. Please try again shortly.",
      },
      502,
    );
  }

  return jsonResponse(
    {
      ok: true,
      message: "Your enquiry has been received.",
    },
    200,
  );
};