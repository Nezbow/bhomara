import Stripe from "stripe";

interface Env {
  STRIPE_SECRET_KEY?: string;
  SITE_URL?: string;
}

interface CheckoutContext {
  request: Request;
  env: Env;
}

type CheckoutRequest = {
  priceId?: string;
};

const PRICE_MODES = {
  // VARA AI Discovery & Workflow Assessment — £495 one-off
  price_1UFJdaCuowHfQrFGQ0cXyDUC: "payment",

  // NEZBOW Video Intelligence Explorer — £19.99/month
  price_1UFJJSCuowHfQrFGmwf3LYGN: "subscription",

  // NEZBOW AI Pro — £79.99/month
  price_1UFJ7iCuowHfQrFGxXYC3VbZ: "subscription",

  // NEZBOW AI Creator — £39.99/month
  price_1UFJ6MCuowHfQrFGKrpfn2ch: "subscription",

  // NEZBOW AI Starter — £19.99/month
  price_1UFJ44CuowHfQrFGtsoAleTh: "subscription",
} as const;

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const onRequestPost = async (
  context: CheckoutContext,
): Promise<Response> => {
  const stripeSecretKey = context.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY is not configured.");

    return jsonResponse(
      {
        ok: false,
        message: "Payment service is not configured.",
      },
      503,
    );
  }

  let body: CheckoutRequest;

  try {
    body = (await context.request.json()) as CheckoutRequest;
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Invalid request body.",
      },
      400,
    );
  }

  const priceId = body.priceId;

  if (!priceId || !(priceId in PRICE_MODES)) {
    return jsonResponse(
      {
        ok: false,
        message: "The selected product price is not available.",
      },
      400,
    );
  }

  const mode =
    PRICE_MODES[priceId as keyof typeof PRICE_MODES];

  const requestOrigin = new URL(context.request.url).origin;

  const siteUrl = (
    context.env.SITE_URL || requestOrigin
  ).replace(/\/+$/, "");

  try {
    const stripe = new Stripe(stripeSecretKey, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url:
        `${siteUrl}/payment-success` +
        "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `${siteUrl}/payment-cancelled`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      ...(mode === "payment"
        ? {
            customer_creation: "always" as const,
          }
        : {}),
    });

    if (!session.url) {
      throw new Error(
        "Stripe did not return a checkout URL.",
      );
    }

    return jsonResponse(
      {
        ok: true,
        url: session.url,
      },
      200,
    );
  } catch (error) {
    console.error(
      "Stripe Checkout session could not be created.",
      error,
    );

    return jsonResponse(
      {
        ok: false,
        message:
          "Checkout could not be started. Please try again.",
      },
      500,
    );
  }
};