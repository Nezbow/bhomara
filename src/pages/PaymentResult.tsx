import { Link } from "react-router-dom";
import "./PaymentResult.css";

type PaymentResultProps = {
  status: "success" | "cancelled";
};

const BHOMARA_LOGO_URL = "/bhomara-logo-transparent.png";

export default function PaymentResult({
  status,
}: PaymentResultProps) {
  const isSuccess = status === "success";

  return (
    <div className="payment-result-page">
      <header className="payment-result-header">
        <Link to="/" aria-label="BHOMARA home">
          <img
            src={BHOMARA_LOGO_URL}
            alt="BHOMARA"
            width="132"
            height="84"
          />
        </Link>

        <Link to="/">BHOMARA Home</Link>
      </header>

      <main className="payment-result-main">
        <section className="payment-result-card">
          <div
            className={`payment-result-icon ${
              isSuccess
                ? "payment-result-icon-success"
                : "payment-result-icon-cancelled"
            }`}
            aria-hidden="true"
          >
            {isSuccess ? "✓" : "×"}
          </div>

          <p className="payment-result-kicker">
            {isSuccess
              ? "CHECKOUT COMPLETED"
              : "CHECKOUT CANCELLED"}
          </p>

          <h1>
            {isSuccess
              ? "Thank you for choosing BHOMARA."
              : "No payment was taken."}
          </h1>

          <p className="payment-result-copy">
            {isSuccess
              ? "Your Stripe checkout has been completed. If the payment was processed successfully, Stripe will send the transaction confirmation to the email address provided during checkout."
              : "You left the secure checkout before completing payment. You can return to the relevant product page whenever you are ready."}
          </p>

          <div className="payment-result-actions">
            {isSuccess ? (
              <>
                <Link
                  className="payment-result-primary"
                  to="/"
                >
                  Return to BHOMARA
                </Link>

                <Link
                  className="payment-result-secondary"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="payment-result-primary"
                  to="/products/nezbow-ai#pricing"
                >
                  Return to NEZBOW Pricing
                </Link>

                <Link
                  className="payment-result-secondary"
                  to="/products/vara-ai#assessment"
                >
                  Return to VARA Assessment
                </Link>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="payment-result-footer">
        <p>
          Secure payment processing provided by Stripe.
        </p>

        <p>
          © {new Date().getFullYear()} BHOMARA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}