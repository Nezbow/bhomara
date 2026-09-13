import { useState } from "react";
import { Link } from "react-router-dom";
import "./NezbowAI.css";

const BHOMARA_LOGO_URL = "/bhomara-logo-transparent.png";

const PRICE_IDS = {
  starter: "price_1UFJ44CuowHfQrFGtsoAleTh",
  creator: "price_1UFJ6MCuowHfQrFGKrpfn2ch",
  pro: "price_1UFJ7iCuowHfQrFGxXYC3VbZ",
  videoExplorer: "price_1UFJJSCuowHfQrFGmwf3LYGN",
} as const;

type CheckoutResponse = {
  ok?: boolean;
  url?: string;
  message?: string;
};

export default function NezbowAI() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  async function startCheckout(priceId: string) {
    if (loadingPriceId) {
      return;
    }

    setLoadingPriceId(priceId);
    setCheckoutError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const result = (await response.json()) as CheckoutResponse;

      if (!response.ok || !result.url) {
        throw new Error(
          result.message || "Checkout could not be started.",
        );
      }

      window.location.assign(result.url);
    } catch (error) {
      console.error("NEZBOW checkout could not be started.", error);

      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Checkout could not be started. Please try again.",
      );
    } finally {
      setLoadingPriceId(null);
    }
  }

  function checkoutButtonLabel(priceId: string, defaultLabel: string) {
    return loadingPriceId === priceId
      ? "Opening secure checkout..."
      : defaultLabel;
  }

  return (
    <div className="nezbow-page">
      <header className="nezbow-header">
        <Link
          className="nezbow-parent-brand"
          to="/"
          aria-label="BHOMARA home"
        >
          <img
            src={BHOMARA_LOGO_URL}
            alt="BHOMARA"
            style={{
              display: "block",
              width: "132px",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "68px",
              objectFit: "contain",
            }}
          />
        </Link>

        <nav className="nezbow-nav" aria-label="NEZBOW AI navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#workflow">Artist Workflow</a>
          <a href="#built-for">Built For</a>
          <a href="#pricing">Pricing</a>
          <a href="#demo">Demo</a>
        </nav>

        <Link className="nezbow-back-link" to="/">
          BHOMARA Home
        </Link>
      </header>

      <main>
        <section className="nezbow-hero">
          <div className="nezbow-hero-copy">
            <p className="nezbow-kicker">BHOMARA CREATOR INTELLIGENCE</p>

            <div className="nezbow-product-name">
              <span className="nezbow-mark">N</span>
              <span>NEZBOW AI</span>
            </div>

            <h1>
              Your music deserves
              <span> more than a release.</span>
            </h1>

            <p className="nezbow-lead">
              NEZBOW AI is an intelligent marketing workspace being built for
              independent musicians — bringing release promotion, creative
              assets, campaign tools and audience growth into one connected
              environment.
            </p>

            <div className="nezbow-actions">
              <a className="nezbow-primary-button" href="#pricing">
                View Pricing
              </a>

              <a className="nezbow-secondary-button" href="#capabilities">
                Explore Capabilities
              </a>
            </div>
          </div>

          <div
            className="nezbow-campaign-preview"
            aria-label="NEZBOW AI campaign preview"
          >
            <div className="nezbow-preview-topbar">
              <div className="nezbow-preview-brand">
                <span className="nezbow-preview-logo">N</span>

                <div>
                  <strong>NEZBOW AI</strong>
                  <small>Artist Growth Workspace</small>
                </div>
              </div>

              <span className="nezbow-preview-status">CAMPAIGN READY</span>
            </div>

            <div className="nezbow-preview-body">
              <aside className="nezbow-preview-sidebar">
                <span className="active">Release Hub</span>
                <span>AI Promotion</span>
                <span>Assets</span>
                <span>Music Platforms</span>
                <span>Publishing</span>
                <span>Analytics</span>
              </aside>

              <div className="nezbow-preview-workspace">
                <div className="nezbow-preview-heading">
                  <div>
                    <small>NEW RELEASE</small>
                    <h3>Build your campaign.</h3>
                  </div>

                  <span>Launch +</span>
                </div>

                <div className="nezbow-preview-cards">
                  <div>
                    <small>RELEASE ASSETS</small>
                    <strong>Ready</strong>
                    <span>Music, artwork and campaign content</span>
                  </div>

                  <div>
                    <small>AI PROMOTION</small>
                    <strong>Active</strong>
                    <span>Campaign ideas and promotional support</span>
                  </div>
                </div>

                <div className="nezbow-preview-activity">
                  <div className="nezbow-activity-title">
                    <strong>Campaign workspace</strong>
                    <span>Release</span>
                  </div>

                  <div className="nezbow-activity-row">
                    <span className="nezbow-activity-icon">01</span>

                    <div>
                      <strong>Captions &amp; messaging</strong>
                      <small>Prepare platform-ready promotional copy</small>
                    </div>
                  </div>

                  <div className="nezbow-activity-row">
                    <span className="nezbow-activity-icon">02</span>

                    <div>
                      <strong>Creative assets</strong>
                      <small>Organise promotional visuals and media</small>
                    </div>
                  </div>

                  <div className="nezbow-activity-row">
                    <span className="nezbow-activity-icon">03</span>

                    <div>
                      <strong>Campaign planning</strong>
                      <small>Coordinate promotion around each release</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="nezbow-problem-section">
          <p className="nezbow-kicker">THE INDEPENDENT ARTIST CHALLENGE</p>

          <div className="nezbow-problem-grid">
            <h2>
              Making the music is only part of building a music career.
            </h2>

            <div>
              <p>
                Independent artists often become their own marketing team,
                content creator, campaign manager and promoter — while still
                trying to concentrate on making great music.
              </p>

              <p>
                NEZBOW is being built to reduce that fragmentation by bringing
                practical AI-assisted promotion and release workflows into one
                artist-focused workspace.
              </p>
            </div>
          </div>
        </section>

        <section
          className="nezbow-capabilities-section"
          id="capabilities"
        >
          <div className="nezbow-section-heading">
            <p className="nezbow-kicker">CAPABILITIES</p>

            <h2>From finished track to coordinated promotion.</h2>
          </div>

          <div className="nezbow-capability-grid">
            <article>
              <span>01</span>
              <h3>Release Hub</h3>

              <p>
                Organise each music release and keep its promotional work,
                assets and campaign activity connected.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>AI Promotion</h3>

              <p>
                Generate promotional ideas and campaign support around an
                artist&apos;s music and release objectives.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Captions &amp; Hashtags</h3>

              <p>
                Create platform-specific promotional copy designed to help
                artists communicate consistently across social channels.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Promotional Assets</h3>

              <p>
                Bring campaign graphics, media and other release assets into
                one organised promotional workspace.
              </p>
            </article>

            <article>
              <span>05</span>
              <h3>Publishing Workflow</h3>

              <p>
                Build toward coordinated publishing and scheduling across
                connected social and creator platforms.
              </p>
            </article>

            <article>
              <span>06</span>
              <h3>Growth Intelligence</h3>

              <p>
                Build toward clearer campaign performance, engagement and
                audience-growth insights from one dashboard.
              </p>
            </article>
          </div>
        </section>

        <section className="nezbow-workflow-section" id="workflow">
          <div className="nezbow-section-heading nezbow-light-heading">
            <p className="nezbow-kicker">THE ARTIST WORKFLOW</p>

            <h2>One release. One connected promotional journey.</h2>
          </div>

          <div className="nezbow-workflow-grid">
            <article>
              <span>01</span>
              <h3>Bring the release in</h3>

              <p>
                Start with the track, release information and the creative
                assets that define the campaign.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Build the campaign</h3>

              <p>
                Use AI-assisted tools to develop messaging, promotional
                material and campaign ideas around the music.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Prepare distribution</h3>

              <p>
                Organise content for the social and music platforms that matter
                to the artist and their audience.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Learn and grow</h3>

              <p>
                Develop a clearer picture of what is working and use those
                insights to improve future campaigns.
              </p>
            </article>
          </div>
        </section>

        <section className="nezbow-built-section" id="built-for">
          <div className="nezbow-section-heading">
            <p className="nezbow-kicker">BUILT FOR INDEPENDENCE</p>

            <h2>Technology that works around the artist.</h2>
          </div>

          <div className="nezbow-built-grid">
            <div>
              <span>ARTISTS</span>
              <h3>Independent musicians</h3>

              <p>
                A practical workspace for artists managing their own releases,
                promotion and audience development.
              </p>
            </div>

            <div>
              <span>TEAMS</span>
              <h3>Small artist teams</h3>

              <p>
                Give managers and collaborators a clearer way to organise
                promotional activity around an artist&apos;s releases.
              </p>
            </div>

            <div>
              <span>GROWTH</span>
              <h3>Emerging careers</h3>

              <p>
                Help developing artists approach promotion with more structure,
                consistency and useful intelligence.
              </p>
            </div>
          </div>
        </section>

        <section className="nezbow-pricing-section" id="pricing">
          <div className="nezbow-section-heading">
            <p className="nezbow-kicker">NEZBOW PRICING</p>

            <h2>Choose the support that fits your creative journey.</h2>

            <p className="nezbow-pricing-intro">
              Monthly plans give independent artists access to NEZBOW&apos;s
              connected marketing tools. Plan allowances and responsible-use
              limits will be clearly displayed before launch.
            </p>
          </div>

          <div className="nezbow-pricing-grid">
            <article className="nezbow-price-card">
              <p className="nezbow-price-label">STARTER</p>
              <h3>NEZBOW AI Starter</h3>

              <div className="nezbow-price">
                <strong>£19.99</strong>
                <span>/ month</span>
              </div>

              <p className="nezbow-price-description">
                Essential AI-assisted promotion for independent artists
                beginning to organise and grow their release campaigns.
              </p>

              <ul>
                <li>Release campaign workspace</li>
                <li>AI-assisted captions and messaging</li>
                <li>Hashtag and promotional support</li>
                <li>Core campaign planning tools</li>
              </ul>

              <button
                type="button"
                className="nezbow-checkout-button"
                disabled={loadingPriceId !== null}
                onClick={() => startCheckout(PRICE_IDS.starter)}
              >
                {checkoutButtonLabel(
                  PRICE_IDS.starter,
                  "Choose Starter",
                )}
              </button>
            </article>

            <article className="nezbow-price-card nezbow-price-card-featured">
              <span className="nezbow-popular-badge">MOST POPULAR</span>
              <p className="nezbow-price-label">CREATOR</p>
              <h3>NEZBOW AI Creator</h3>

              <div className="nezbow-price">
                <strong>£39.99</strong>
                <span>/ month</span>
              </div>

              <p className="nezbow-price-description">
                Expanded creative and campaign support for artists promoting
                releases consistently across multiple channels.
              </p>

              <ul>
                <li>Everything in Starter</li>
                <li>Expanded campaign capacity</li>
                <li>Additional creative asset support</li>
                <li>Broader publishing workflows</li>
              </ul>

              <button
                type="button"
                className="nezbow-checkout-button"
                disabled={loadingPriceId !== null}
                onClick={() => startCheckout(PRICE_IDS.creator)}
              >
                {checkoutButtonLabel(
                  PRICE_IDS.creator,
                  "Choose Creator",
                )}
              </button>
            </article>

            <article className="nezbow-price-card">
              <p className="nezbow-price-label">PRO</p>
              <h3>NEZBOW AI Pro</h3>

              <div className="nezbow-price">
                <strong>£79.99</strong>
                <span>/ month</span>
              </div>

              <p className="nezbow-price-description">
                Higher-capacity marketing intelligence for established
                independent artists and small artist teams.
              </p>

              <ul>
                <li>Everything in Creator</li>
                <li>Higher campaign capacity</li>
                <li>Advanced growth intelligence</li>
                <li>Team-oriented promotional workflows</li>
              </ul>

              <button
                type="button"
                className="nezbow-checkout-button"
                disabled={loadingPriceId !== null}
                onClick={() => startCheckout(PRICE_IDS.pro)}
              >
                {checkoutButtonLabel(PRICE_IDS.pro, "Choose Pro")}
              </button>
            </article>

            <article className="nezbow-price-card nezbow-video-price-card">
              <p className="nezbow-price-label">VIDEO INTELLIGENCE</p>
              <h3>NEZBOW Video Intelligence Explorer</h3>

              <div className="nezbow-price">
                <strong>£19.99</strong>
                <span>/ month</span>
              </div>

              <p className="nezbow-price-description">
                A focused video-intelligence product for analysing successful
                content patterns and building short-form publishing workflows.
              </p>

              <ul>
                <li>High-performing video pattern analysis</li>
                <li>Hook, caption and tag intelligence</li>
                <li>Short-form creation from authorised source videos</li>
                <li>Scheduling workflows for connected platforms</li>
              </ul>

              <button
                type="button"
                className="nezbow-checkout-button"
                disabled={loadingPriceId !== null}
                onClick={() => startCheckout(PRICE_IDS.videoExplorer)}
              >
                {checkoutButtonLabel(
                  PRICE_IDS.videoExplorer,
                  "Choose Video Explorer",
                )}
              </button>
            </article>
          </div>

          <p className="nezbow-pricing-note">
            Secure checkout is provided by Stripe. Subscriptions renew monthly
            until cancelled. NEZBOW Video Intelligence Explorer is available
            as a separate subscription.
          </p>

          {checkoutError ? (
            <p className="nezbow-checkout-error" role="alert" aria-live="polite">
              {checkoutError}
            </p>
          ) : null}
        </section>

        <section className="nezbow-demo-section" id="demo">
          <p className="nezbow-kicker">DISCOVER NEZBOW AI</p>

          <h2>
            Spend more time creating. Build promotion around the music.
          </h2>

          <p>
            NEZBOW AI is under active development as part of the BHOMARA
            technology portfolio. We are building toward a connected
            promotional workspace designed specifically around the needs of
            independent musicians.
          </p>

          <Link className="nezbow-primary-button" to="/contact">
            Request a NEZBOW Demo
          </Link>
        </section>
      </main>

      <footer className="nezbow-footer">
        <div>
          <Link
            className="nezbow-parent-brand"
            to="/"
            aria-label="BHOMARA home"
          >
            <img
              src={BHOMARA_LOGO_URL}
              alt="BHOMARA"
              style={{
                display: "block",
                width: "120px",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "62px",
                objectFit: "contain",
              }}
            />
          </Link>

          <p>NEZBOW AI is a BHOMARA technology product.</p>
        </div>

        <Link to="/">Return to BHOMARA</Link>
      </footer>
    </div>
  );
}