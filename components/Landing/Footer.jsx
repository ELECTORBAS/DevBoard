import Link from "next/link";
import { SiGithub, SiIndeed, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <h2 className="footer__brand-title">DevBoard</h2>
            <p className="footer__brand-desc">
              A modern project management platform built for developers and
              teams to collaborate, track tasks, and ship faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="footer__heading">Product</h3>
            <ul className="footer__list">
              <li>
                <Link href="/features" className="footer__link">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="footer__link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer__link">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer__heading">Resources</h3>
            <ul className="footer__list">
              <li>
                <Link href="/docs" className="footer__link">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer__link">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="footer__link">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="footer__heading">Connect</h3>

            <div className="footer__social">
              <Link
                href="https://github.com"
                target="_blank"
                className="footer__social-link"
              >
                <SiGithub className="h-5 w-5" />
              </Link>

              <Link href="#" className="footer__social-link">
                <SiInstagram className="h-5 w-5" />
              </Link>

              <Link href="#" className="footer__social-link">
                <SiIndeed className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} DevBoard. All rights reserved.
          </p>

          <div className="footer__bottom-links">
            <Link href="/privacy" className="footer__link">
              Privacy
            </Link>

            <Link href="/terms" className="footer__link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;