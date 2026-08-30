import { type FormEvent, useEffect, useRef, useState } from "react";
import "./Contact.css";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface EnquiryResponse {
  ok?: boolean;
  message?: string;
  error?: string;
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      setSubmitError(
        "Security verification is unavailable. Please try again later.",
      );
      return;
    }

    const renderTurnstile = () => {
      if (
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetIdRef.current
      ) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          callback: (token: string) => {
            setTurnstileToken(token);
            setSubmitError("");
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
          "error-callback": () => {
            setTurnstileToken("");
            setSubmitError(
              "Security verification could not be completed. Please try again.",
            );
          },
        },
      );
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );

    if (existingScript) {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        existingScript.addEventListener("load", renderTurnstile, {
          once: true,
        });
      }
    } else {
      const script = document.createElement("script");

      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderTurnstile, { once: true });

      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  const resetTurnstile = () => {
    setTurnstileToken("");

    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!turnstileToken) {
      setSubmitError(
        "Please complete the security verification before submitting.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      organisation: String(formData.get("organisation") ?? "").trim(),
      product: String(formData.get("product") ?? "").trim(),
      challenge: String(formData.get("challenge") ?? "").trim(),
      consent: formData.get("consent") === "on",
      turnstileToken,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result: EnquiryResponse = {};

      try {
        result = (await response.json()) as EnquiryResponse;
      } catch {
        result = {};
      }

      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.error ||
            "We could not send your enquiry right now. Please try again.",
        );
      }

      form.reset();
      setSubmitted(true);
      resetTurnstile();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We could not send your enquiry right now. Please try again.";

      setSubmitError(message);
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-shell">
          <p className="contact-eyebrow">CONTACT BHOMARA</p>

          <h1>
            Tell us what you need
            <span> to improve.</span>
          </h1>

          <p className="contact-intro">
            Whether you are exploring VARA AI, NEZBOW AI, our upcoming
            Video Intelligence platform, or a bespoke AI solution, tell us
            about the challenge you are trying to solve.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-shell contact-grid">
          <div className="contact-copy">
            <p className="contact-section-label">START A CONVERSATION</p>

            <h2>Request a demo or discuss your workflow.</h2>

            <p>
              Share a little about your organisation and the problem you
              want to solve. We will review your enquiry and respond with
              the most relevant next step.
            </p>

            <div className="contact-detail">
              <span>Email</span>
              <a href="mailto:hello@bhomara.com">
                hello@bhomara.com
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success">
                <p className="contact-section-label">REQUEST RECEIVED</p>

                <h2>Thank you for contacting BHOMARA.</h2>

                <p>
                  Your enquiry has been received successfully. We will
                  review the information you provided and respond as soon
                  as possible.
                </p>

                <button
                  type="button"
                  className="contact-submit"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError("");
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="organisation">
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="product">
                    Product or service
                  </label>
                  <select
                    id="product"
                    name="product"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="vara-ai">VARA AI</option>
                    <option value="nezbow-ai">NEZBOW AI</option>
                    <option value="video-intelligence">
                      Video Intelligence
                    </option>
                    <option value="bhomara">
                      Bespoke BHOMARA solution
                    </option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="challenge">
                    What challenge are you trying to solve?
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    rows={6}
                    maxLength={5000}
                    required
                  />
                </div>

                <label className="contact-consent">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                  />

                  <span>
                    I agree that BHOMARA may use the information I provide
                    to respond to this enquiry.
                  </span>
                </label>

                <div
                  ref={turnstileContainerRef}
                  className="contact-turnstile"
                />

                {submitError && (
                  <p className="contact-form-error" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={
                    !turnstileToken ||
                    isSubmitting ||
                    !TURNSTILE_SITE_KEY
                  }
                >
                  {isSubmitting
                    ? "Sending enquiry..."
                    : "Request a demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}