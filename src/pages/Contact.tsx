import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

type FormStatus = "idle" | "submitted";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <div className="contact-page">
      <header className="contact-header">
        <Link className="contact-brand" to="/">
          BHOMARA
        </Link>

        <Link className="contact-home-link" to="/">
          BHOMARA Home
        </Link>
      </header>

      <main>
        <section className="contact-hero">
          <div className="contact-intro">
            <p className="contact-kicker">START A CONVERSATION</p>

            <h1>
              Tell us what should
              <span> work better.</span>
            </h1>

            <p className="contact-lead">
              Whether you are exploring VARA AI, interested in another BHOMARA
              product, or have a workflow that could benefit from practical AI,
              tell us what you are trying to improve.
            </p>

            <div className="contact-points">
              <div>
                <span>01</span>
                <p>Tell us about your organisation and the challenge.</p>
              </div>

              <div>
                <span>02</span>
                <p>We review where practical AI or automation could help.</p>
              </div>

              <div>
                <span>03</span>
                <p>Where appropriate, we arrange a conversation or demo.</p>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            {status === "submitted" ? (
              <div className="contact-success">
                <span className="success-mark">✓</span>

                <p className="contact-kicker">REQUEST RECEIVED</p>

                <h2>Thank you for getting in touch.</h2>

                <p>
                  Your form has passed the website interface successfully.
                  Online delivery will be activated when BHOMARA's production
                  enquiry service is connected.
                </p>

                <button type="button" onClick={() => setStatus("idle")}>
                  Send Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="form-heading">
                  <p className="contact-kicker">REQUEST A DEMO</p>
                  <h2>How can BHOMARA help?</h2>
                  <p>
                    Give us a little context and we'll know where to start.
                  </p>
                </div>

                <form className="demo-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      First name
                      <input
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        required
                      />
                    </label>

                    <label>
                      Last name
                      <input
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Work email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@organisation.com"
                      required
                    />
                  </label>

                  <label>
                    Organisation
                    <input
                      type="text"
                      name="organisation"
                      autoComplete="organization"
                      required
                    />
                  </label>

                  <label>
                    I'm interested in
                    <select name="product" defaultValue="" required>
                      <option value="" disabled>
                        Select a product or service
                      </option>
                      <option value="vara-ai">VARA AI</option>
                      <option value="nezbow-ai">NEZBOW AI</option>
                      <option value="video-intelligence">
                        Video Intelligence
                      </option>
                      <option value="bhomara">
                        BHOMARA / General Enquiry
                      </option>
                    </select>
                  </label>

                  <label>
                    What would you like to improve?
                    <textarea
                      name="challenge"
                      rows={6}
                      placeholder="Tell us about the process, problem or opportunity..."
                      required
                    />
                  </label>

                  <label className="consent-field">
                    <input type="checkbox" name="consent" required />
                    <span>
                      I agree that BHOMARA may use the information provided to
                      respond to this enquiry.
                    </span>
                  </label>

                  <button className="contact-submit" type="submit">
                    Send Demo Request
                  </button>

                  <p className="form-note">
                    This development form currently demonstrates the enquiry
                    experience. Secure online delivery will be connected before
                    the public website goes live.
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <div>
          <Link className="contact-brand" to="/">
            BHOMARA
          </Link>

          <p>Practical intelligence. Real-world impact.</p>
        </div>

        <Link to="/">Return to BHOMARA</Link>
      </footer>
    </div>
  );
}