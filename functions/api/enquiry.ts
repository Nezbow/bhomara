import { connect } from "cloudflare:sockets";

interface Env {
  TURNSTILE_SECRET_KEY: string;
  SMTP_PASSWORD: string;
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
  hostname?: string;
  action?: string;
  challenge_ts?: string;
}

interface TurnstileVerificationResult {
  success: boolean;
  errorCodes: string[];
  hostname?: string;
  action?: string;
}

interface Enquiry {
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  product: string;
  challenge: string;
}

const SMTP_HOST = "mail.privateemail.com";
const SMTP_PORT = 465;
const SMTP_USERNAME = "hello@bhomara.com";
const SMTP_FROM_EMAIL = "hello@bhomara.com";
const SMTP_TO_EMAIL = "hello@bhomara.com";

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

function toBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${toBase64Utf8(value)}?=`;
}

function normalizeSmtpBody(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join("\r\n");
}

async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteIp?: string,
): Promise<TurnstileVerificationResult> {
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
      console.error("BHOMARA Turnstile siteverify HTTP failure", {
        status: response.status,
        statusText: response.statusText,
      });

      return {
        success: false,
        errorCodes: [`http-${response.status}`],
      };
    }

    const result = (await response.json()) as TurnstileResponse;
    const errorCodes = Array.isArray(result["error-codes"])
      ? result["error-codes"]
      : [];

    if (result.success !== true) {
      console.error("BHOMARA Turnstile verification failed", {
        errorCodes,
        hostname: result.hostname ?? null,
        action: result.action ?? null,
      });
    }

    return {
      success: result.success === true,
      errorCodes,
      hostname: result.hostname,
      action: result.action,
    };
  } catch (error) {
    console.error(
      "BHOMARA Turnstile siteverify request failed",
      error instanceof Error ? error.message : "Unknown Turnstile error",
    );

    return {
      success: false,
      errorCodes: ["siteverify-request-failed"],
    };
  }
}

class SmtpReader {
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
  private readonly decoder = new TextDecoder();
  private buffer = "";

  constructor(readable: ReadableStream<Uint8Array>) {
    this.reader = readable.getReader();
  }

  private async readLine(): Promise<string> {
    while (true) {
      const newlineIndex = this.buffer.indexOf("\n");

      if (newlineIndex >= 0) {
        const line = this.buffer.slice(0, newlineIndex + 1);
        this.buffer = this.buffer.slice(newlineIndex + 1);

        return line.replace(/\r?\n$/, "");
      }

      const { value, done } = await this.reader.read();

      if (done) {
        if (this.buffer.length > 0) {
          const remaining = this.buffer;
          this.buffer = "";
          return remaining;
        }

        throw new Error("SMTP connection closed unexpectedly.");
      }

      this.buffer += this.decoder.decode(value, { stream: true });
    }
  }

  async readResponse(): Promise<{
    code: number;
    message: string;
  }> {
    const lines: string[] = [];
    let responseCode = 0;

    while (true) {
      const line = await this.readLine();

      lines.push(line);

      const match = line.match(/^(\d{3})([ -])(.*)$/);

      if (!match) {
        continue;
      }

      responseCode = Number(match[1]);

      if (match[2] === " ") {
        break;
      }
    }

    return {
      code: responseCode,
      message: lines.join("\n"),
    };
  }

  release(): void {
    this.reader.releaseLock();
  }
}

async function sendCommand(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  reader: SmtpReader,
  command: string,
  expectedCodes: number[],
): Promise<void> {
  const encoder = new TextEncoder();

  await writer.write(encoder.encode(`${command}\r\n`));

  const response = await reader.readResponse();

  if (!expectedCodes.includes(response.code)) {
    throw new Error(
      `SMTP command failed with status ${response.code}.`,
    );
  }
}

async function sendSmtpMessage(
  smtpPassword: string,
  recipient: string,
  replyTo: string,
  subject: string,
  body: string,
): Promise<boolean> {
  let socket: ReturnType<typeof connect> | undefined;
  let writer: WritableStreamDefaultWriter<Uint8Array> | undefined;
  let smtpReader: SmtpReader | undefined;

  try {
    socket = connect(
      { hostname: SMTP_HOST, port: SMTP_PORT },
      { secureTransport: "on", allowHalfOpen: false },
    );
    await socket.opened;
    writer = socket.writable.getWriter();
    smtpReader = new SmtpReader(socket.readable);

    const greeting = await smtpReader.readResponse();
    if (greeting.code !== 220) {
      throw new Error(`SMTP greeting failed with status ${greeting.code}.`);
    }

    await sendCommand(writer, smtpReader, "EHLO bhomara.com", [250]);
    await sendCommand(writer, smtpReader, "AUTH LOGIN", [334]);
    await sendCommand(writer, smtpReader, toBase64Utf8(SMTP_USERNAME), [334]);
    await sendCommand(writer, smtpReader, toBase64Utf8(smtpPassword), [235]);
    await sendCommand(writer, smtpReader, `MAIL FROM:<${SMTP_FROM_EMAIL}>`, [250]);
    await sendCommand(writer, smtpReader, `RCPT TO:<${recipient}>`, [250, 251]);
    await sendCommand(writer, smtpReader, "DATA", [354]);

    const message = [
      `From: BHOMARA <${SMTP_FROM_EMAIL}>`,
      `To: ${recipient}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${encodeHeader(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      normalizeSmtpBody(body),
      ".",
      "",
    ].join("\r\n");

    await writer.write(new TextEncoder().encode(message));
    const deliveryResponse = await smtpReader.readResponse();
    if (deliveryResponse.code !== 250) {
      throw new Error(`SMTP delivery failed with status ${deliveryResponse.code}.`);
    }
    await sendCommand(writer, smtpReader, "QUIT", [221]);
    return true;
  } catch (error) {
    console.error(
      "BHOMARA SMTP delivery failed:",
      error instanceof Error ? error.message : "Unknown SMTP error",
    );
    return false;
  } finally {
    try { smtpReader?.release(); } catch { /* Ignore cleanup errors. */ }
    try { writer?.releaseLock(); } catch { /* Ignore cleanup errors. */ }
    try { await socket?.close(); } catch { /* Ignore cleanup errors. */ }
  }
}

async function sendInternalEnquiryEmail(
  smtpPassword: string,
  enquiry: Enquiry,
): Promise<boolean> {
  const productLabel = productLabels[enquiry.product] ?? enquiry.product;
  const fullName = `${enquiry.firstName} ${enquiry.lastName}`.trim();
  const subject = `New BHOMARA enquiry - ${productLabel} - ${fullName}`;
  const body = [
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

  return sendSmtpMessage(
    smtpPassword,
    SMTP_TO_EMAIL,
    enquiry.email,
    subject,
    body,
  );
}

async function sendCustomerAcknowledgementEmail(
  smtpPassword: string,
  enquiry: Enquiry,
): Promise<boolean> {
  const productLabel = productLabels[enquiry.product] ?? enquiry.product;
  const subject = "We received your BHOMARA enquiry";
  const body = [
    `Hello ${enquiry.firstName},`,
    "",
    "Thank you for contacting BHOMARA.",
    "",
    `We have received your enquiry about ${productLabel}.`,
    "A member of our team will review your request and get back to you as soon as possible.",
    "",
    "For your reference, the business challenge you submitted was:",
    enquiry.challenge,
    "",
    "Kind regards,",
    "BHOMARA",
    "hello@bhomara.com",
  ].join("\n");

  return sendSmtpMessage(
    smtpPassword,
    enquiry.email,
    SMTP_FROM_EMAIL,
    subject,
    body,
  );
}

export const onRequestPost: PagesFunction<Env> = async (
  context,
) => {
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
  const turnstileToken = clean(
    body.turnstileToken,
  );

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
        error:
          "Please select a valid product or service.",
      },
      400,
    );
  }

  if (body.consent !== true) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Consent is required before submitting this enquiry.",
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
        error:
          "Security verification is not configured.",
      },
      503,
    );
  }

  if (!context.env.SMTP_PASSWORD) {
    return jsonResponse(
      {
        ok: false,
        error: "Enquiry delivery is not configured.",
      },
      503,
    );
  }

  const remoteIp =
    context.request.headers.get("CF-Connecting-IP") ??
    undefined;

  const turnstileVerification =
    await verifyTurnstile(
      turnstileToken,
      context.env.TURNSTILE_SECRET_KEY,
      remoteIp,
    );

  if (!turnstileVerification.success) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Security verification failed. Please try again.",
      },
      400,
    );
  }

  const enquiry: Enquiry = {
    firstName,
    lastName,
    email,
    organisation,
    product,
    challenge,
  };

  const internalEmailAccepted =
    await sendInternalEnquiryEmail(
      context.env.SMTP_PASSWORD,
      enquiry,
    );

  if (!internalEmailAccepted) {
    return jsonResponse(
      {
        ok: false,
        error:
          "We could not deliver your enquiry right now. Please try again shortly.",
      },
      502,
    );
  }

  const customerEmailAccepted =
    await sendCustomerAcknowledgementEmail(
      context.env.SMTP_PASSWORD,
      enquiry,
    );

  if (!customerEmailAccepted) {
    console.error(
      "BHOMARA customer acknowledgement could not be delivered.",
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