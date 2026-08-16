import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top CTA Banner */}
      <div className="footer-banner">
        <div className="footer-banner__inner">
          <div className="footer-banner__text">
            <span className="footer-banner__leaf" aria-hidden="true">🌿</span>
            <div>
              <h3>Get crop insights delivered to your inbox</h3>
              <p>Weekly reports on weather, soil health, and harvest forecasts.</p>
            </div>
          </div>
          {subscribed ? (
            <div className="footer-banner__success">
              <span>✓</span> Subscribed! Check your email.
            </div>
          ) : (
            <form className="footer-banner__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-main">
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-col footer-col--brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#3B6D11" />
                <path d="M16 6C16 6 8 12 8 19a8 8 0 0016 0C24 12 16 6 16 6z" fill="#97C459" />
                <path d="M16 14v10M13 17l3-3 3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="footer-logo__name">CropConnect</span>
            </div>
            <p className="footer-tagline">
              Empowering farmers with data-driven decisions — from soil preparation to market delivery.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Github" className="footer-social__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="footer-social__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4l16 16M4 20L20 4"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="footer-social__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 12l-6-3v6l6-3z"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="footer-social__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="footer-social__link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="footer-col">
            <h4 className="footer-col__heading">Platform</h4>
            <ul className="footer-links">
              <li><a href="#">Crop Dashboard</a></li>
              <li><a href="#">Field Management</a></li>
              <li><a href="#">Harvest Tracker</a></li>
              <li><a href="#">Weather & Soil Data</a></li>
              <li><a href="#">Market Prices</a></li>
              <li><a href="#">Pest & Disease Alerts</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-col">
            <h4 className="footer-col__heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Farmer's Handbook</a></li>
              <li><a href="#">Crop Calendar</a></li>
              <li><a href="#">Planting Guides</a></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Video Tutorials</a></li>
              <li><a href="#">Community Forum</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-col__heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Partner Farms</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-col__heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Kilimo Cha kisasa, Morogoro<br />Tanzania</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.13 12 19.79 19.79 0 011.06 3.36 2 2 0 013.08 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/></svg>
                <a href="tel:+255780686067">+255 780 686 067</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="prosesprojestus0@gmail.com">prosesprojestus0@gmail.com</a>
              </li>
              
            </ul>
          </div>
        </div>

        
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom__inner">
          <p className="footer-bottom__copy">
            © {currentYear} kilimo cha kisasa Tanzania. All rights reserved.
          </p>
          <div className="footer-bottom__links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Settings</a>
            <a href="#">Accessibility</a>
          </div>
          
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #07191E;
          color: #c8dcb0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }

        /* Banner */
        .footer-banner {
          background-color: #07191E;
          border-bottom: 1px solid #2a5018;
        }
        .footer-banner__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .footer-banner__text {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .footer-banner__leaf {
          font-size: 28px;
          flex-shrink: 0;
        }
        .footer-banner__text h3 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
          color: #e8f5d0;
        }
        .footer-banner__text p {
          margin: 0;
          font-size: 13px;
          color: #8db87a;
        }
        .footer-banner__form {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .footer-banner__form input {
          padding: 9px 14px;
          border-radius: 6px;
          border: 1px solid #2a5018;
          background: #0f1f0a;
          color: #e8f5d0;
          font-size: 13px;
          width: 220px;
          outline: none;
        }
        .footer-banner__form input:focus {
          border-color: #639922;
        }
        .footer-banner__form button {
          padding: 9px 20px;
          background: #639922;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .footer-banner__form button:hover { background: #3B6D11; }
        .footer-banner__success {
          color: #97C459;
          font-weight: 600;
          font-size: 14px;
        }

        /* Main */
        .footer-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 40px 40px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.4fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #1e3a12;
        }

        /* Brand */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .footer-logo__name {
          font-size: 18px;
          font-weight: 700;
          color: #e8f5d0;
          letter-spacing: -0.3px;
        }
        .footer-tagline {
          font-size: 13px;
          color: #8db87a;
          line-height: 1.7;
          margin: 0 0 20px;
          max-width: 280px;
        }
        .footer-social {
          display: flex;
          gap: 8px;
        }
        .footer-social__link {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          border: 1px solid #2a5018;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8db87a;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .footer-social__link:hover {
          border-color: #639922;
          color: #97C459;
        }

        /* Nav columns */
        .footer-col__heading {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #e8f5d0;
          margin: 0 0 16px;
        }
        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links a {
          color: #8db87a;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #97C459; }

        /* Contact */
        .footer-contact {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #8db87a;
          font-size: 13px;
        }
        .footer-contact li svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #639922;
        }
        .footer-contact a {
          color: #8db87a;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact a:hover { color: #97C459; }

        /* Stats bar */
        .footer-stats {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 32px 0;
          border-bottom: 1px solid #1e3a12;
          flex-wrap: wrap;
        }
        .footer-stat {
          flex: 1;
          min-width: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 0 16px;
        }
        .footer-stat__number {
          font-size: 22px;
          font-weight: 700;
          color: #97C459;
          letter-spacing: -0.5px;
        }
        .footer-stat__label {
          font-size: 12px;
          color: #5a8a42;
          text-align: center;
        }
        .footer-stat__divider {
          width: 1px;
          height: 40px;
          background: #1e3a12;
          flex-shrink: 0;
        }

        /* Bottom bar */
        .footer-bottom {
          background-color: #090f06;
          border-top: 1px solid #1e3a12;
        }
        .footer-bottom__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-bottom__copy {
          margin: 0;
          font-size: 12px;
          color: #4a7035;
        }
        .footer-bottom__links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .footer-bottom__links a {
          font-size: 12px;
          color: #4a7035;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom__links a:hover { color: #97C459; }
        .footer-bottom__badges {
          display: flex;
          gap: 8px;
        }
        .footer-badge {
          font-size: 11px;
          color: #5a8a42;
          border: 1px solid #1e3a12;
          border-radius: 4px;
          padding: 3px 8px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-col--brand {
            grid-column: 1 / -1;
          }
          .footer-banner__inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 20px;
          }
          .footer-banner__form {
            width: 100%;
          }
          .footer-banner__form input { width: 100%; }
          .footer-main { padding: 40px 20px 32px; }
          .footer-bottom__inner { padding: 16px 20px; }
          .footer-stats { gap: 8px; }
        }

        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom__inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-stats { flex-direction: column; align-items: flex-start; }
          .footer-stat__divider { display: none; }
          .footer-stat { align-items: flex-start; padding: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;