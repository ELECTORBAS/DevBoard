"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Btn from "./Btn";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero__title", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".hero__subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero__cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Manage projects. Track tasks. Ship faster.
        </h1>

        <p className="hero__subtitle">
          A modern project management platform built for developers and teams.
        </p>

        <div className="hero__cta">
          <Btn title="Get Started" />
        </div>
      </div>
    </section>
  );
};

export default Hero;