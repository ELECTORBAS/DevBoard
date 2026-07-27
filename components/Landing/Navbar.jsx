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
      <nav className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src="/logo.png"
            alt="logo"
            width={24}
            height={24}
            className="navbar__logo-image"
          />
          <h1 className="navbar__logo-title">DevBoard</h1>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          <Link href="/products" className="navbar__link">
            Products
          </Link>

          <Link href="/services" className="navbar__link">
            Services
          </Link>

          <Link href="/about" className="navbar__link">
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="navbar__actions">
          <ThemeToggle />

          <div className="navbar__btn-signup">
            <Btn title="Signup" link="/signup" />
          </div>

          <div className="navbar__btn-signin">
            <Btn title="SignIn" link="/signin" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="navbar__menu-toggle"
        >
          <div className="navbar__menu-icon-wrap">
            <Menu
              className={`navbar__menu-icon ${
                open
                  ? "navbar__menu-icon--hidden"
                  : "navbar__menu-icon--shown"
              }`}
            />

            <X
              className={`navbar__menu-icon ${
                open
                  ? "navbar__menu-icon--shown"
                  : "navbar__menu-icon--hidden-reverse"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${
          open
            ? "navbar__mobile-menu--open"
            : "navbar__mobile-menu--closed"
        }`}
      >
        <div className="navbar__mobile-menu-inner">
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

          <div className="navbar__mobile-btn-signup">
            <Btn title="Signup" link="/signup" />
          </div>

          <div className="navbar__mobile-btn-signin">
            <Btn title="SignIn" link="/signup" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;