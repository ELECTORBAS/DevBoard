"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dispatchEvent(new Event("themechange"));
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : getSystemTheme();

    applyTheme(initialTheme);
    const animationFrame = window.requestAnimationFrame(() => setTheme(initialTheme));

    if (savedTheme) return () => window.cancelAnimationFrame(animationFrame);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      applyTheme(systemTheme);
    };

    mediaQuery.addEventListener("change", updateSystemTheme);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span aria-hidden="true" >{theme === "dark" ? <Sun/> : <Moon/>}</span>
    </button>
  );
};

export default ThemeToggle;