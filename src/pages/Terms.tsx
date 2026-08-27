import { Link } from "react-router-dom";
import "./Legal.css";

export default function Terms() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link className="legal-brand" to="/">
          BHOMARA
        </Link>

        <Link className="legal-home-link" to="/">
          BHOMARA Home
        </Link>
      </header>

      <main className="legal-main">
        <section className="legal-hero">
          <p className="legal-kicker">BHOMARA LEGAL</p>

          <h1>Website Terms</h1>

          <p>
            These terms set out the basis on which visitors may use the
            BHOMARA website and its pre-launch product information,
            demonstrations and enquiry services.
          </p>

          <span className="legal-status">PRE-LAUNCH VERSION</span>
        </section>

        <div className="legal-content">
          <aside className="legal-summary">
            <p>LAST REVIEWED</p>
            <strong>27 August 2026</strong>

            <p>APPLIES TO</p>
            <strong>BHOMARA website</strong>

            <p>CONTACT</p>
            <strong>hello@bhomara.com</strong>
          </aside>

          <article className="legal-article">
            <section>
              <span>01</span>
              <h2>About these terms</h2>

              <p>
                These Website Terms apply to your use of the BHOMARA website.
                By accessing or using the website, you agree to use it in
                accordance with these terms and applicable law.
              </p>

              <p>
                BHOMARA is currently preparing its technology products and
                website for production operation. These terms are therefore a
                pre-launch version and will be reviewed before public launch.
              </p>
            </section>

            <section>
              <span>02</span>
              <h2>About BHOMARA</h2>

              <p>
                BHOMARA develops practical artificial intelligence systems and
                digital products for organisations, businesses and independent
                creators.
              </p>

              <p>
                Product descriptions on this website may include information
                about VARA AI, NEZBOW AI and other technology being developed
                within the BHOMARA product portfolio.
              </p>
            </section>

            <section>
              <span>03</span>
              <h2>Pre-launch products and information</h2>

              <p>
                Some products, capabilities, integrations and services
                described on this website may be under development, in testing
                or planned for future release.
              </p>

              <p>
                Website descriptions, demonstrations, interface previews and
                other product information should not be interpreted as a
                guarantee that every described capability is currently
                available or will be released in exactly the form shown.
              </p>
            </section>

            <section>
              <span>04</span>
              <h2>Permitted use</h2>

              <p>
                You may use the BHOMARA website for lawful purposes, including
                learning about our products, contacting BHOMARA and requesting
                information or a demonstration.
              </p>

              <p>You must not knowingly:</p>

              <ul>
                <li>
                  Use the website in a way that violates applicable law or the
                  rights of another person.
                </li>
                <li>
                  Attempt to gain unauthorised access to the website, its
                  systems or connected services.
                </li>
                <li>
                  Introduce malicious code or intentionally interfere with the
                  operation or security of the website.
                </li>
                <li>
                  Misuse website forms, enquiry services or other interactive
                  functionality.
                </li>
              </ul>
            </section>

            <section>
              <span>05</span>
              <h2>Intellectual property</h2>

              <p>
                Unless otherwise stated, the website's original branding,
                design, written content, product presentation and other
                proprietary materials are intended to be owned by or licensed
                for use by the relevant BHOMARA operating or intellectual
                property entity.
              </p>

              <p>
                Nothing on this website grants visitors ownership of BHOMARA,
                VARA AI, NEZBOW AI or related intellectual property.
              </p>
            </section>

            <section>
              <span>06</span>
              <h2>Third-party services and links</h2>

              <p>
                The website or BHOMARA products may refer to or interact with
                third-party platforms, technologies or services.
              </p>

              <p>
                Third-party services operate under their own terms, policies
                and availability arrangements. BHOMARA does not control those
                external services merely because they are referenced or
                integrated with a BHOMARA product.
              </p>
            </section>

            <section>
              <span>07</span>
              <h2>Website availability</h2>

              <p>
                BHOMARA aims to maintain a useful and reliable website, but
                continuous or uninterrupted availability cannot be guaranteed.
              </p>

              <p>
                The website may be changed, suspended or updated as products,
                services and business requirements develop.
              </p>
            </section>

            <section>
              <span>08</span>
              <h2>Information on this website</h2>

              <p>
                We aim to keep website information clear and useful. However,
                pre-launch information may change as products and services are
                developed.
              </p>

              <p>
                Visitors should contact BHOMARA for current information before
                relying on website content when making significant commercial,
                technical or operational decisions.
              </p>
            </section>

            <section>
              <span>09</span>
              <h2>Privacy</h2>

              <p>
                Information submitted through BHOMARA website enquiries will be
                handled in accordance with the applicable BHOMARA Privacy
                Notice.
              </p>

              <Link to="/privacy">Read the Privacy Notice →</Link>
            </section>

            <section>
              <span>10</span>
              <h2>Changes to these terms</h2>

              <p>
                These terms may be updated as BHOMARA's website, products,
                operating structure and services develop.
              </p>

              <p>
                The version made available on the website will indicate when it
                was last reviewed.
              </p>
            </section>

            <section>
              <span>11</span>
              <h2>Contact</h2>

              <p>
                Questions about these Website Terms can be directed to:
              </p>

              <a href="mailto:hello@bhomara.com">
                hello@bhomara.com
              </a>
            </section>

            <section className="legal-important">
              <span>12</span>
              <h2>Before public launch</h2>

              <p>
                These are pre-launch Website Terms. They will be reviewed and
                updated before the production website is made publicly
                available.
              </p>

              <p>
                The final terms should reflect BHOMARA's confirmed operating
                entity, registered details, applicable governing law, live
                services and final commercial arrangements.
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer className="legal-footer">
        <div>
          <Link className="legal-brand" to="/">
            BHOMARA
          </Link>

          <p>Practical intelligence. Real-world impact.</p>
        </div>

        <div className="legal-footer-links">
          <Link to="/">Home</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}