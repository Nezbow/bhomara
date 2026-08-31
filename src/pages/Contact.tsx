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
      <header className="contact-header">
        <a className="contact-brand" href="/">
          BHOMARA
        </a>

        <a className="contact-home-link" href="/">
          Back to home
        </a>
      </header>

      <section className="contact-experience">
        <div className="contact-glow contact-glow-one" />
        <div className="contact-glow contact-glow-two" />

        <div className="contact-layout">
          <div className="contact-story">
            <p className="contact-eyebrow">
              <span />
              START A CONVERSATION
            </p>

            <h1>
              Tell us what you
              <span> want to improve.</span>
            </h1>

            <p className="contact-lead">
              Bring us the workflow that is slowing your organisation down,
              the process that should be smarter, or the idea you are ready
              to turn into something real.
            </p>

            <div className="contact-trust-grid">
              <div className="contact-trust-item">
                <span className="contact-trust-number">01</span>
                <div>
                  <strong>Understand</strong>
                  <p>
                    We start with the problem, your people and the way the
                    work happens today.
                  </p>
                </div>
              </div>

              <div className="contact-trust-item">
                <span className="contact-trust-number">02</span>
                <div>
                  <strong>Design</strong>
                  <p>
                    We identify where AI and automation can create meaningful
                    operational value.
                  </p>
                </div>
              </div>

              <div className="contact-trust-item">
                <span className="contact-trust-number">03</span>
                <div>
                  <strong>Build</strong>
                  <p>
                    We turn the right opportunity into a practical, focused
                    solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-direct">
              <p>Prefer to start by email?</p>
              <a href="mailto:hello@bhomara.com">hello@bhomara.com</a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <div className="contact-form-accent" />

            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>

                  <p className="contact-card-eyebrow">REQUEST RECEIVED</p>

                  <h2>Thank you for contacting BHOMARA.</h2>

                  <p>
                    Your enquiry has been received successfully. We will
                    review what you have shared and respond with the most
                    relevant next step.
                  </p>

                  <button
                    type="button"
                    className="contact-submit contact-submit-secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError("");
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <p className="contact-card-eyebrow">REQUEST A DEMO</p>
                    <h2>Let's explore what we can solve.</h2>
                    <p>
                      Tell us a little about your organisation and the
                      challenge you are facing.
                    </p>
                  </div>

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label htmlFor="firstName">First name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder="First name"
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
                          placeholder="Last name"
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
                        placeholder="you@organisation.com"
                        required
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="organisation">Organisation</label>
                      <input
                        id="organisation"
                        name="organisation"
                        type="text"
                        autoComplete="organization"
                        placeholder="Organisation name"
                        required
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="product">
                        What are you interested in?
                      </label>

                      <div className="contact-select-wrap">
                        <select
                          id="product"
                          name="product"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            Select a product or service
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
                    </div>

                    <div className="contact-field">
                      <label htmlFor="challenge">
                        What would you like to improve?
                      </label>

                      <textarea
                        id="challenge"
                        name="challenge"
                        rows={5}
                        maxLength={5000}
                        placeholder="Tell us about the workflow, challenge or opportunity..."
                        required
                      />
                    </div>

                    <label className="contact-consent">
                      <input type="checkbox" name="consent" required />
                      <span>
                        I agree that BHOMARA may use the information I provide
                        to respond to this enquiry.
                      </span>
                    </label>

                    <div className="contact-security">
                      <span>SECURE ENQUIRY</span>

                      <div
                        ref={turnstileContainerRef}
                        className="contact-turnstile"
                      />
                    </div>

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
                      <span>
                        {isSubmitting
                          ? "Sending enquiry..."
                          : "Request a demo"}
                      </span>

                      {!isSubmitting && (
                        <span className="contact-submit-arrow">→</span>
                      )}
                    </button>

                    <p className="contact-privacy-note">
                      Your information is used only to respond to your enquiry.
                      No unnecessary data collection.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <div>
          <a className="contact-brand contact-footer-brand" href="/">
            BHOMARA
          </a>
          <p>Practical intelligence. Built around real work.</p>
        </div>

        <div className="contact-footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/">Home</a>
        </div>
      </footer>
    </main>
  );
}