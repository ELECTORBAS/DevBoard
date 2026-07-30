"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import Btn from "./Btn";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the top
      if (currentScrollY < 20) {
        setVisible(true);
      }
      // Hide when scrolling down
      else if (currentScrollY > lastScrollY + 10 && !open) {
        setVisible(false);
      }
      // Show when scrolling up
      else if (currentScrollY < lastScrollY - 10) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <header
      className={`navbar ${
        visible ? "navbar--visible" : "navbar--hidden"
      }`}
    >
      <nav className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/logo.png"
            alt="logo"
            width={24}
            height={24}
            className="navbar-logo-image"
          />
          <h1 className="navbar-logo-title">DevBoard</h1>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          <Link href="/products" className="navbar-link">
            Products
          </Link>

          <Link href="/services" className="navbar-link">
            Services
          </Link>

          <Link href="/about" className="navbar-link">
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="navbar-actions">
          <ThemeToggle />

          <div className="navbar-btn-signup">
            <Btn title="Signup" link="/signup" />
          </div>

          <div className="navbar-btn-signin">
            <Btn title="SignIn" link="/signin" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="navbar-menu-toggle"
        >
          <div className="navbar-menu-icon-wrap">
            <Menu
              className={`navbar-menu-icon ${
                open
                  ? "navbar-menu-icon--hidden"
                  : "navbar-menu-icon--shown"
              }`}
            />

            <X
              className={`navbar-menu-icon ${
                open
                  ? "navbar-menu-icon--shown"
                  : "navbar-menu-icon--hidden-reverse"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`navbar-mobile-menu ${
          open
            ? "navbar-mobile-menu--open"
            : "navbar-mobile-menu--closed"
        }`}
      >
        <div className="navbar-mobile-menu-inner">
          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>

          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <hr />

          <ThemeToggle />

          <div className="navbar-mobile-btn-signup">
            <Btn title="Signup" link="/signup" />
          </div>

          <div className="navbar-mobile-btn-signin">
            <Btn title="SignIn" link="/signin" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;