import { Link } from "react-router-dom";
import "./VaraAI.css";

export default function VaraAI() {
  return (
    <div className="vara-page">
      <header className="vara-header">
        <Link className="vara-parent-brand" to="/">
          BHOMARA
        </Link>

        <nav className="vara-nav" aria-label="VARA AI navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#use-cases">Use Cases</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#demo">Demo</a>
        </nav>

        <Link className="vara-back-link" to="/">
          BHOMARA Home
        </Link>
      </header>

      <main>
        <section className="vara-hero">
          <div className="vara-hero-copy">
            <p className="vara-kicker">BHOMARA BUSINESS INTELLIGENCE</p>

            <div className="vara-product-name">
              <span className="vara-mark">V</span>
              <span>VARA AI</span>
            </div>

            <h1>
              Turn everyday work into
              <span> intelligent action.</span>
            </h1>

            <p className="vara-lead">
              VARA AI is an intelligent workspace designed to help
              organisations organise projects, work with documents, use AI
              assistance and simplify repetitive business processes from one
              connected environment.
            </p>

            <div className="vara-actions">
              <Link className="vara-primary-button" to="/contact">
                Request a Demo
              </Link>

              <a className="vara-secondary-button" href="#capabilities">
                Explore Capabilities
              </a>
            </div>
          </div>

          <div className="vara-dashboard-preview" aria-label="VARA AI preview">
            <div className="preview-topbar">
              <div className="preview-brand">
                <span className="preview-logo">V</span>
                <div>
                  <strong>VARA AI</strong>
                  <small>Intelligent Workspace</small>
                </div>
              </div>

              <span className="preview-status">AI READY</span>
            </div>

            <div className="preview-body">
              <aside className="preview-sidebar">
                <span className="active">Dashboard</span>
                <span>AI Assistant</span>
                <span>Projects</span>
                <span>Business Tools</span>
                <span>Documents</span>
                <span>Analytics</span>
              </aside>

              <div className="preview-workspace">
                <div className="preview-heading">
                  <div>
                    <small>WORKSPACE</small>
                    <h3>Good morning.</h3>
                  </div>
                  <span>New Project +</span>
                </div>

                <div className="preview-cards">
                  <div>
                    <small>ACTIVE PROJECTS</small>
                    <strong>12</strong>
                    <span>Organised in one place</span>
                  </div>

                  <div>
                    <small>AI WORKSPACE</small>
                    <strong>Ready</strong>
                    <span>Ask, draft and analyse</span>
                  </div>
                </div>

                <div className="preview-activity">
                  <div className="activity-title">
                    <strong>Recent activity</strong>
                    <span>Today</span>
                  </div>

                  <div className="activity-row">
                    <span className="activity-icon">01</span>
                    <div>
                      <strong>Project workspace</strong>
                      <small>Files and project information organised</small>
                    </div>
                  </div>

                  <div className="activity-row">
                    <span className="activity-icon">02</span>
                    <div>
                      <strong>AI assistance</strong>
                      <small>Support for everyday knowledge work</small>
                    </div>
                  </div>

                  <div className="activity-row">
                    <span className="activity-icon">03</span>
                    <div>
                      <strong>Business tools</strong>
                      <small>Practical workflows in one environment</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="vara-problem-section">
          <p className="vara-kicker">THE PROBLEM</p>

          <div className="vara-problem-grid">
            <h2>
              Too much valuable time disappears into repetitive work.
            </h2>

            <div>
              <p>
                Information gets spread across documents, inboxes, projects
                and disconnected systems. Staff spend time searching,
                rewriting, transferring and organising information instead of
                concentrating on the work that requires human judgement.
              </p>

              <p>
                VARA is being built to bring those activities together and
                provide practical AI assistance around the workflows people
                already perform.
              </p>
            </div>
          </div>
        </section>

        <section className="vara-capabilities-section" id="capabilities">
          <div className="vara-section-heading">
            <p className="vara-kicker">CAPABILITIES</p>
            <h2>A practical workspace for modern organisations.</h2>
          </div>

          <div className="vara-capability-grid">
            <article>
              <span>01</span>
              <h3>AI Assistant</h3>
              <p>
                Work with an AI assistant for drafting, thinking, summarising
                and everyday business support.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Projects</h3>
              <p>
                Create structured project workspaces and keep important
                information connected to the work it belongs to.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Documents</h3>
              <p>
                Bring documents into a central workspace so information can be
                organised and used more effectively.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Business Tools</h3>
              <p>
                Access practical tools designed around common organisational
                and administrative workflows.
              </p>
            </article>

            <article>
              <span>05</span>
              <h3>Integrations</h3>
              <p>
                Connect external services progressively as VARA develops into
                a broader operational workspace.
              </p>
            </article>

            <article>
              <span>06</span>
              <h3>Analytics</h3>
              <p>
                Build toward clearer visibility of activity, workflows and
                useful operational insights.
              </p>
            </article>
          </div>
        </section>

        <section className="vara-use-cases" id="use-cases">
          <div className="vara-section-heading vara-light-heading">
            <p className="vara-kicker">WHERE VARA CAN HELP</p>
            <h2>Designed around work that organisations actually do.</h2>
          </div>

          <div className="vara-use-case-grid">
            <article>
              <span>BUSINESS</span>
              <h3>Administrative workflows</h3>
              <p>
                Reduce repetitive handling of information and give teams a
                more organised place to work.
              </p>
            </article>

            <article>
              <span>PUBLIC SECTOR</span>
              <h3>Service processes</h3>
              <p>
                Explore AI-assisted approaches to requests, documents,
                information handling and operational workflows.
              </p>
            </article>

            <article>
              <span>PROPERTY & SERVICES</span>
              <h3>Operational coordination</h3>
              <p>
                Bring project information, documents and recurring
                administrative tasks into a clearer workflow.
              </p>
            </article>
          </div>
        </section>

        <section className="vara-how-section" id="how-it-works">
          <div className="vara-section-heading">
            <p className="vara-kicker">HOW WE APPROACH AUTOMATION</p>
            <h2>Start with the process. Apply intelligence where it matters.</h2>
          </div>

          <div className="vara-process">
            <div>
              <span>01</span>
              <h3>Understand</h3>
              <p>
                Identify the repetitive process, information flow and points
                where time is being lost.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Design</h3>
              <p>
                Map a practical workflow that combines automation, AI
                assistance and appropriate human oversight.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Deploy</h3>
              <p>
                Introduce the solution in a controlled way, evaluate the
                results and improve it around real operational needs.
              </p>
            </div>
          </div>
        </section>

        <section className="vara-demo-section" id="demo">
          <p className="vara-kicker">SEE VARA IN ACTION</p>

          <h2>
            Show us the process that consumes your team's time.
          </h2>

          <p>
            VARA is currently under active development. We are speaking with
            organisations about practical workflows, demonstrations and
            potential pilot opportunities.
          </p>

          <Link className="vara-primary-button" to="/contact">
            Request a VARA Demo
          </Link>
        </section>
      </main>

      <footer className="vara-footer">
        <div>
          <Link className="vara-parent-brand" to="/">
            BHOMARA
          </Link>
          <p>VARA AI is a BHOMARA technology product.</p>
        </div>

        <Link to="/">Return to BHOMARA</Link>
      </footer>
    </div>
  );
}