import { Link } from "react-router-dom";
import "./Legal.css";

export default function Privacy() {
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

          <h1>Privacy Notice</h1>

          <p>
            This notice explains how BHOMARA intends to handle personal
            information submitted through its website and related business
            enquiries.
          </p>

          <span className="legal-status">PRE-LAUNCH VERSION</span>
        </section>

        <div className="legal-content">
          <aside className="legal-summary">
            <p>LAST REVIEWED</p>
            <strong>27 August 2026</strong>

            <p>APPLIES TO</p>
            <strong>BHOMARA website enquiries</strong>

            <p>CONTACT</p>
            <strong>hello@bhomara.com</strong>
          </aside>

          <article className="legal-article">
            <section>
              <span>01</span>
              <h2>About this notice</h2>

              <p>
                BHOMARA develops practical artificial intelligence products and
                digital services, including technology for organisations,
                businesses and independent creators.
              </p>

              <p>
                This Privacy Notice describes the types of personal information
                that may be provided through the BHOMARA website, why that
                information may be used, and the choices available to people
                who contact us.
              </p>
            </section>

            <section>
              <span>02</span>
              <h2>Information you may provide</h2>

              <p>
                When the production enquiry service is activated, information
                submitted through a contact or demo request may include:
              </p>

              <ul>
                <li>Your first and last name.</li>
                <li>Your work email address.</li>
                <li>The organisation you represent.</li>
                <li>The BHOMARA product or service you are interested in.</li>
                <li>
                  Information you choose to provide about a business process,
                  problem, project or opportunity.
                </li>
              </ul>

              <p>
                Please do not include confidential, highly sensitive or
                unnecessary personal information in a general website enquiry.
              </p>
            </section>

            <section>
              <span>03</span>
              <h2>How information may be used</h2>

              <p>
                Information submitted through the website may be used to:
              </p>

              <ul>
                <li>Respond to your enquiry.</li>
                <li>Arrange a product discussion, demonstration or follow-up.</li>
                <li>
                  Understand the organisation, workflow or opportunity you
                  describe.
                </li>
                <li>
                  Communicate with you about the specific BHOMARA product or
                  service you have asked about.
                </li>
                <li>
                  Maintain appropriate records of business enquiries and
                  communications.
                </li>
              </ul>
            </section>

            <section>
              <span>04</span>
              <h2>Our approach to data</h2>

              <p>
                BHOMARA intends to collect only information that is reasonably
                necessary for the purpose for which it is requested and to
                design its production services with appropriate privacy and
                security safeguards.
              </p>

              <p>
                Personal information should not be retained for longer than is
                reasonably necessary for the relevant purpose, subject to any
                applicable legal, regulatory or legitimate business
                requirements.
              </p>
            </section>

            <section>
              <span>05</span>
              <h2>Service providers</h2>

              <p>
                BHOMARA may use carefully selected technology and service
                providers to operate its website, communications, hosting and
                business systems.
              </p>

              <p>
                Before the production website begins processing enquiries, the
                relevant providers and data-handling arrangements will be
                reviewed and this notice updated where appropriate.
              </p>
            </section>

            <section>
              <span>06</span>
              <h2>International services</h2>

              <p>
                Some technology providers may operate infrastructure in more
                than one country. Where personal information is transferred
                internationally, BHOMARA intends to use appropriate safeguards
                where required by applicable data-protection law.
              </p>
            </section>

            <section>
              <span>07</span>
              <h2>Your privacy rights</h2>

              <p>
                Depending on the law that applies to you and the circumstances,
                you may have rights relating to your personal information,
                including rights to request access, correction, deletion,
                restriction or objection to certain processing.
              </p>

              <p>
                Further information about applicable rights and how to exercise
                them will be included in the production version of this notice
                once BHOMARA's operating entity and production data systems are
                finalised.
              </p>
            </section>

            <section>
              <span>08</span>
              <h2>Cookies and website technology</h2>

              <p>
                The current development website does not represent the final
                production analytics, cookie or tracking configuration.
              </p>

              <p>
                Before public launch, BHOMARA will review the technologies used
                by the production website and provide appropriate information
                and controls where required.
              </p>
            </section>

            <section>
              <span>09</span>
              <h2>Contact</h2>

              <p>
                Questions about this Privacy Notice or BHOMARA's approach to
                personal information can be directed to:
              </p>

              <a href="mailto:hello@bhomara.com">
                hello@bhomara.com
              </a>
            </section>

            <section className="legal-important">
              <span>10</span>
              <h2>Before public launch</h2>

              <p>
                This is a pre-launch Privacy Notice. It will be reviewed and
                updated before BHOMARA begins operating its production website
                and accepting live enquiries.
              </p>

              <p>
                The final notice will reflect the confirmed operating entity,
                production hosting and enquiry providers, retention practices,
                applicable data-protection requirements and any cookies or
                analytics actually used by the live website.
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
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}