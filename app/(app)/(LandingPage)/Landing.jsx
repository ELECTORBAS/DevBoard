"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import SecSection from "@/components/Landing/SecSection";
import LineWaves from "@/components/ui/LineWaves/Linewaves";
import LogoLoop from "@/components/ui/LogoLoop/LogoLoop";

import {
  SiDrizzle,
  SiNeon,
  SiNextdotjs,
  SiPosthog,
  SiReact,
  SiTailwindcss,
  SiGoogleauthenticator,
  SiShadcnui
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  {
    node: <SiShadcnui />,
    title: "Shadcn",
    href: "https://ui.shadcn.com",
  },
  {
    node: <SiGoogleauthenticator />,
    title: "Google Authenticator",
    href: "https://google.com",
  },
  {
    node: <SiDrizzle />,
    title: "Drizzle",
    href: "https://orm.drizzle.team",
  },
  { node: <SiNeon />, title: "Neon", href: "https://neon.com" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind",
    href: "https://tailwindcss.com",
  },
  {
    node: <span className="font-semibold tracking-tight">Auth.js</span>,
    title: "Auth.js",
    href: "https://authjs.dev",
  },
  { node: <SiPosthog />, title: "PostHog", href: "https://posthog.com" },
];

const Landing = () => {
  const landingRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".scroll-reveal");

      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: landingRef }
  );

  return (
    <section ref={landingRef} className="landing">

      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <Hero />

        <div className="hero-section-waves">
          <LineWaves
            speed={0.2}
            innerLineCount={32}
            outerLineCount={33}
            warpIntensity={2.2}
            rotation={-45}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.2}
            color1="var(--wave-color-1)"
            color2="var(--wave-color-2)"
            color3="var(--wave-color-3)"
            enableMouseInteraction
            mouseInfluence={4}
          />
        </div>
      </div>


      {/* Tech Logos Section */}
      <div className="tech-logos-section scroll-reveal">
        <h1 className="tech-logos-section-heading">
          Built with modern technologies
        </h1>

        <div className="tech-logos-section-frame">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="var(--background)"
            ariaLabel="Technology partners"
            className="logoloop--responsive"
          />
        </div>
      </div>


      {/* Features Section */}
      <div className="features-section scroll-reveal">
        <SecSection />
      </div>


      <div className="scroll-reveal">
        <Footer />
      </div>

    </section>
  );
};

export default Landing;