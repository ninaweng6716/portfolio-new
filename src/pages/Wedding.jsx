import { useState } from "react"

const florals = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3Ccircle cx='60' cy='5' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='110' cy='20' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3Ccircle cx='5' cy='70' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='115' cy='80' r='2' fill='%23c9a96e' opacity='0.12'/%3E%3Ccircle cx='30' cy='110' r='1.5' fill='%23c9a96e' opacity='0.1'/%3E%3Ccircle cx='90' cy='115' r='2' fill='%23c9a96e' opacity='0.15'/%3E%3C/svg%3E")`

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #faf7f2;
    --blush: #f0e6de;
    --dusty-rose: #c9a0a0;
    --mauve: #9e7b7b;
    --gold: #c9a96e;
    --gold-light: #e8d8b4;
    --deep: #3d2c2c;
    --text: #5a3e3e;
    --text-light: #8a6e6e;
    --sage: #9aab96;
  }

  .wedding-page {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ─── HERO ─── */
  #hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    background: var(--cream);
    padding: 6rem 2rem;
    overflow: hidden;
  }

  #hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${florals};
    opacity: 0.6;
  }

  .hero-monogram {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(4rem, 12vw, 9rem);
    font-weight: 300;
    color: var(--deep);
    line-height: 1;
    letter-spacing: -0.02em;
    position: relative;
  }

  .hero-ampersand {
    color: var(--gold);
    font-style: italic;
    font-size: 0.9em;
  }

  .hero-names {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1rem, 3vw, 1.4rem);
    font-weight: 300;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 0.5rem;
    position: relative;
  }

  .hero-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
    position: relative;
  }

  .hero-divider-line {
    width: 80px;
    height: 1px;
    background: var(--gold);
    opacity: 0.6;
  }

  .hero-divider-diamond {
    width: 6px;
    height: 6px;
    background: var(--gold);
    transform: rotate(45deg);
  }

  .hero-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 400;
    color: var(--deep);
    letter-spacing: 0.1em;
    position: relative;
  }

  .hero-location {
    font-size: 0.8rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 0.5rem;
    position: relative;
  }

  .hero-corner {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0.25;
  }
  .hero-corner.tl { top: 2rem; left: 2rem; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
  .hero-corner.tr { top: 2rem; right: 2rem; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
  .hero-corner.bl { bottom: 2rem; left: 2rem; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
  .hero-corner.br { bottom: 2rem; right: 2rem; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--text-light);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .hero-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
  }

  /* ─── SECTION SHARED ─── */
  .section-inner {
    max-width: 760px;
    margin: 0 auto;
    padding: 5rem 2rem;
  }

  .section-label {
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold);
    text-align: center;
    margin-bottom: 1rem;
  }

  .section-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 400;
    color: var(--deep);
    text-align: center;
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  .section-heading em {
    font-style: italic;
    color: var(--mauve);
  }

  .ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .ornament-line {
    width: 60px;
    height: 1px;
    background: var(--gold-light);
  }

  .ornament-glyph {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: var(--gold);
    line-height: 1;
  }

  /* ─── STORY ─── */
  #story {
    background: white;
  }

  .story-body {
    font-family: 'EB Garamond', serif;
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--text);
    text-align: center;
    max-width: 580px;
    margin: 0 auto;
  }

  .story-body p + p {
    margin-top: 1.5rem;
  }

  .story-pull {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-style: italic;
    color: var(--mauve);
    text-align: center;
    line-height: 1.4;
    margin: 3rem 0;
    padding: 2rem;
    border-top: 1px solid var(--gold-light);
    border-bottom: 1px solid var(--gold-light);
  }

  /* ─── DETAILS ─── */
  #details {
    background: var(--blush);
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }

  @media (max-width: 580px) {
    .details-grid { grid-template-columns: 1fr; }
  }

  .detail-card {
    background: white;
    border: 1px solid var(--gold-light);
    padding: 2rem;
    text-align: center;
  }

  .detail-card-icon {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: var(--gold);
    margin-bottom: 1rem;
    font-style: italic;
  }

  .detail-card-title {
    font-size: 0.65rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 0.75rem;
  }

  .detail-card-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--deep);
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .detail-card-sub {
    font-size: 0.8rem;
    color: var(--text-light);
    letter-spacing: 0.05em;
    line-height: 1.6;
  }

  .detail-card-link {
    display: inline-block;
    margin-top: 1rem;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    text-decoration: none;
    border-bottom: 1px solid var(--gold-light);
    padding-bottom: 2px;
  }

  /* ─── SCHEDULE ─── */
  #schedule {
    background: white;
  }

  .timeline {
    position: relative;
    margin-top: 1rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--gold-light);
    transform: translateX(-50%);
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .timeline-item:last-child { margin-bottom: 0; }

  .timeline-left { text-align: right; }
  .timeline-right { text-align: left; }

  .timeline-dot {
    width: 10px;
    height: 10px;
    background: white;
    border: 1px solid var(--gold);
    transform: rotate(45deg);
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .timeline-time {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.25rem;
  }

  .timeline-event {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: var(--deep);
    margin-bottom: 0.2rem;
  }

  .timeline-desc {
    font-size: 0.8rem;
    color: var(--text-light);
    line-height: 1.5;
  }

  @media (max-width: 580px) {
    .timeline::before { left: 20px; }
    .timeline-item { grid-template-columns: 30px 1fr; }
    .timeline-left { display: none; }
    .timeline-dot { margin: 0; }
  }

  /* ─── RSVP ─── */
  #rsvp {
    background: var(--deep);
    color: var(--cream);
  }

  #rsvp .section-heading {
    color: var(--cream);
  }

  #rsvp .section-label {
    color: var(--gold);
  }

  #rsvp .ornament-line {
    background: rgba(201,169,110,0.3);
  }

  .rsvp-intro {
    font-family: 'EB Garamond', serif;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(250,247,242,0.7);
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .rsvp-form {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-label {
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold-light);
  }

  .form-input,
  .form-select {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,169,110,0.4);
    padding: 0.6rem 0;
    color: var(--cream);
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;
  }

  .form-input::placeholder { color: rgba(250,247,242,0.3); }

  .form-input:focus,
  .form-select:focus { border-bottom-color: var(--gold); }

  .form-select {
    appearance: none;
    cursor: pointer;
  }

  .form-select option { background: var(--deep); color: var(--cream); }

  .radio-group {
    display: flex;
    gap: 1.5rem;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.85rem;
    color: rgba(250,247,242,0.8);
  }

  .radio-option input { accent-color: var(--gold); }

  .rsvp-submit {
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 0.9rem 2.5rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    cursor: pointer;
    align-self: center;
    margin-top: 0.5rem;
    transition: background 0.25s, color 0.25s;
  }

  .rsvp-submit:hover {
    background: var(--gold);
    color: var(--deep);
  }

  .rsvp-deadline {
    text-align: center;
    font-size: 0.75rem;
    color: rgba(250,247,242,0.4);
    margin-top: 1.5rem;
    letter-spacing: 0.1em;
  }

  /* ─── GALLERY ─── */
  #gallery {
    background: var(--cream);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .gallery-item {
    background: var(--blush);
    border: 1px solid var(--gold-light);
    overflow: hidden;
    position: relative;
  }

  .gallery-item:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }

  .gallery-placeholder {
    width: 100%;
    padding-top: 75%;
    position: relative;
    overflow: hidden;
  }

  .gallery-item:first-child .gallery-placeholder {
    padding-top: 60%;
  }

  .gallery-placeholder-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .gallery-photo-icon {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: var(--dusty-rose);
    font-style: italic;
    opacity: 0.5;
  }

  .gallery-photo-label {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-light);
    opacity: 0.6;
  }

  .gallery-caption {
    padding: 0.75rem 1rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-light);
  }

  /* ─── CLOSING ─── */
  .closing {
    background: white;
    padding: 5rem 2rem;
    text-align: center;
  }

  .closing-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-style: italic;
    color: var(--mauve);
    max-width: 560px;
    margin: 0 auto 1rem;
    line-height: 1.5;
  }

  .closing-attr {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-light);
  }
`

const photoLabels = [
  "Engagement Photo",
  "The Proposal",
  "Our Adventure",
  "Together",
  "In Love",
]

export default function Wedding() {
  const [attending, setAttending] = useState("yes")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="wedding-page">
      <style>{styles}</style>

      {/* ── HERO ── */}
      <section id="hero">
        <div className="hero-corner tl" />
        <div className="hero-corner tr" />
        <div className="hero-corner bl" />
        <div className="hero-corner br" />

        <p className="hero-names">Nina &nbsp;&nbsp; Jeff</p>
        <div className="hero-monogram">
          N <span className="hero-ampersand">&amp;</span> J
        </div>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <div className="hero-divider-diamond" />
          <div className="hero-divider-line" />
        </div>

        <p className="hero-date">Sunday, the Sixth of September, 2026</p>
        <p className="hero-location">Dr. Sun Yat-Sen Classical Chinese Garden &nbsp;·&nbsp; Sun Sui Wah (Main St.)</p>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>


      {/* ── DETAILS ── */}
      <section id="details">
        <div className="section-inner">
          <p className="section-label">Everything you need</p>
          <h2 className="section-heading">Wedding <em>Details</em></h2>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-glyph">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-card-icon">♡</div>
              <p className="detail-card-title">Ceremony</p>
              <p className="detail-card-main">Rosewood Chapel</p>
              <p className="detail-card-sub">3:00 PM<br />Please be seated by 2:45</p>
              <a href="#" className="detail-card-link">Get Directions</a>
            </div>

            <div className="detail-card">
              <div className="detail-card-icon">✦</div>
              <p className="detail-card-title">Reception</p>
              <p className="detail-card-main">The Grand Terrace</p>
              <p className="detail-card-sub">5:00 PM — Midnight<br />Rosewood Estate, Napa Valley</p>
              <a href="#" className="detail-card-link">View Venue</a>
            </div>

            <div className="detail-card">
              <div className="detail-card-icon">✿</div>
              <p className="detail-card-title">Dress Code</p>
              <p className="detail-card-main">Black Tie Optional</p>
              <p className="detail-card-sub">Formal attire encouraged.<br />Garden-friendly footwear advised.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section id="schedule">
        <div className="section-inner">
          <p className="section-label">The day of</p>
          <h2 className="section-heading">Day <em>Schedule</em></h2>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-glyph">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-left">
                <p className="timeline-time">2:45 PM</p>
                <p className="timeline-event">Guests Seated</p>
                <p className="timeline-desc">Welcome with string quartet</p>
              </div>
              <div className="timeline-dot" />
              <div className="timeline-right" />
            </div>

            <div className="timeline-item">
              <div className="timeline-left" />
              <div className="timeline-dot" />
              <div className="timeline-right">
                <p className="timeline-time">3:00 PM</p>
                <p className="timeline-event">Ceremony Begins</p>
                <p className="timeline-desc">Rosewood Chapel</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <p className="timeline-time">3:45 PM</p>
                <p className="timeline-event">Cocktail Hour</p>
                <p className="timeline-desc">Garden terrace, drinks &amp; canapés</p>
              </div>
              <div className="timeline-dot" />
              <div className="timeline-right" />
            </div>

            <div className="timeline-item">
              <div className="timeline-left" />
              <div className="timeline-dot" />
              <div className="timeline-right">
                <p className="timeline-time">5:00 PM</p>
                <p className="timeline-event">Reception Opens</p>
                <p className="timeline-desc">Dinner, toasts &amp; first dances</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-left">
                <p className="timeline-time">9:00 PM</p>
                <p className="timeline-event">Cake &amp; Dancing</p>
                <p className="timeline-desc">Live band takes the floor</p>
              </div>
              <div className="timeline-dot" />
              <div className="timeline-right" />
            </div>

            <div className="timeline-item">
              <div className="timeline-left" />
              <div className="timeline-dot" />
              <div className="timeline-right">
                <p className="timeline-time">Midnight</p>
                <p className="timeline-event">Farewell</p>
                <p className="timeline-desc">Sparkler send-off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RSVP ── */}
      <section id="rsvp">
        <div className="section-inner">
          <p className="section-label">Kindly reply</p>
          <h2 className="section-heading">RSVP</h2>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-glyph">✦</span>
            <div className="ornament-line" />
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontStyle: "italic", color: "var(--gold)", marginBottom: "1rem" }}>
                We'll see you there.
              </p>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,0.5)" }}>
                Thank you for your reply
              </p>
            </div>
          ) : (
            <>
              <p className="rsvp-intro">
                Please response to our invitation via your personalized RSVP link.
              </p>
              <p className="rsvp-deadline">Kindly reply by August 9, 2026</p>
            </>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery">
        <div className="section-inner">
          <p className="section-label">Memories</p>
          <h2 className="section-heading">Our <em>Gallery</em></h2>
          <div className="ornament">
            <div className="ornament-line" />
            <span className="ornament-glyph">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="gallery-grid">
            {photoLabels.map((label, i) => (
              <div className="gallery-item" key={i}>
                <div className="gallery-placeholder">
                  <div className="gallery-placeholder-inner">
                    <span className="gallery-photo-icon">✿</span>
                    <span className="gallery-photo-label">{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}