import Link from "next/link";
import { SiGithub, SiIndeed, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-brand-title">DevBoard</h2>
            <p className="footer-brand-desc">
              A modern project management platform built for developers and
              teams to collaborate, track tasks, and ship faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="footer-heading">Product</h3>
            <ul className="footer-list">
              <li>
                <Link href="/features" className="footer-link">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-link">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-list">
              <li>
                <Link href="/docs" className="footer-link">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="footer-link">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="footer-heading">Connect</h3>

            <div className="footer-social">
              <Link
                href="https://github.com"
                target="_blank"
                className="footer-social-link"
              >
                <SiGithub className="h-5 w-5" />
              </Link>

              <Link href="#" className="footer-social-link">
                <SiInstagram className="h-5 w-5" />
              </Link>

              <Link href="#" className="footer-social-link">
                <SiIndeed className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} DevBoard. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link href="/privacy" className="footer-link">
              Privacy
            </Link>

            <Link href="/terms" className="footer-link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;