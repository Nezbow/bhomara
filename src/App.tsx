import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="BHOMARA home">
          BHOMARA
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#products">Products</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About</a>
          <a href="#marketplace">Marketplace</a>
          <Link to="/contact">Contact</Link>
        </nav>

        <Link className="demo-button" to="/contact">
          Request a Demo
        </Link>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              PRACTICAL INTELLIGENCE. REAL-WORLD IMPACT.
            </p>

            <h1>
              Intelligence that
              <span> turns work into action.</span>
            </h1>

            <p className="hero-copy">
              BHOMARA builds practical AI systems that help organisations
              automate work, unlock creativity and turn complex processes into
              intelligent, actionable workflows.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#products">
                Explore Our Products
              </a>

              <Link className="secondary-button" to="/contact">
                Request a Demo
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="intelligence-core">
              <span>B</span>
            </div>
            <div className="signal signal-one" />
            <div className="signal signal-two" />
            <div className="signal signal-three" />
          </div>
        </section>

        <section className="intro-section" id="products">
          <div className="section-heading">
            <p className="eyebrow">OUR TECHNOLOGY</p>
            <h2>One company. Multiple intelligence platforms.</h2>
            <p>
              BHOMARA develops focused AI products for organisations,
              independent creators and the next generation of digital work.
            </p>
          </div>

          <div className="product-grid">
            <article className="product-card featured-card">
              <div className="product-number">01</div>
              <p className="product-label">BUSINESS INTELLIGENCE</p>
              <h3>VARA AI</h3>
              <p>
                AI-assisted productivity and automation for projects,
                documents, communications and business workflows.
              </p>

              <Link to="/products/vara-ai">
                Discover VARA AI →
              </Link>
            </article>

            <article className="product-card">
              <div className="product-number">02</div>
              <p className="product-label">CREATOR INTELLIGENCE</p>
              <h3>NEZBOW AI</h3>
              <p>
                Intelligent marketing and promotional technology designed to
                help independent artists build, launch and grow.
              </p>

              <Link to="/contact">
                Discover NEZBOW AI →
              </Link>
            </article>

            <article className="product-card">
              <div className="product-number">03</div>
              <p className="product-label">VIDEO INTELLIGENCE</p>
              <h3>Coming Next</h3>
              <p>
                A new intelligence platform for discovering opportunities in
                video, audience behaviour and high-performing digital content.
              </p>

              <span className="coming-soon">
                IN DEVELOPMENT
              </span>
            </article>
          </div>
        </section>

        <section className="solutions-section" id="solutions">
          <div className="section-heading light-heading">
            <p className="eyebrow">BUILT FOR REAL WORK</p>
            <h2>AI should solve problems, not create complexity.</h2>
          </div>

          <div className="solutions-grid">
            <div>
              <span>01</span>
              <h3>Business</h3>
              <p>
                Automate repetitive administration and give teams more time
                for higher-value work.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Public Sector</h3>
              <p>
                Explore intelligent workflows for requests, information,
                documents and service processes.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Creators</h3>
              <p>
                Turn creative work into coordinated campaigns, content and
                measurable audience growth.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">ABOUT BHOMARA</p>

          <h2>
            We are building technology around a simple idea:
            <span> intelligence should be useful.</span>
          </h2>

          <p>
            Our products are designed around practical problems and measurable
            outcomes. From organisational workflows to creator growth, BHOMARA
            develops AI systems intended to help people accomplish more while
            keeping human judgement where it matters.
          </p>
        </section>

        <section className="marketplace-section" id="marketplace">
          <div>
            <p className="eyebrow">BHOMARA MARKETPLACE</p>
            <h2>Technology can create value in more than one way.</h2>
            <p>
              Our marketplace is being prepared for digital tools, intelligent
              resources and selected products from across the BHOMARA
              ecosystem.
            </p>
          </div>

          <span className="marketplace-status">
            COMING SOON
          </span>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">WORK WITH BHOMARA</p>

          <h2>Have a process that should work better?</h2>

          <p>
            Talk to us about your organisation, workflow or opportunity and
            discover where practical AI could make a difference.
          </p>

          <Link className="primary-button" to="/contact">
            Request a Demo
          </Link>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          BHOMARA
        </a>

        <p>
          Practical intelligence for the way people work and create.
        </p>

        <div className="footer-links">
          <a href="#products">Products</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About</a>
          <Link to="/contact">Contact</Link>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} BHOMARA. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;