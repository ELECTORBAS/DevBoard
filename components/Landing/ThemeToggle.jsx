"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themes = ["dark", "light", "ocean", "forest", "sunset", "amber", "aurora", "ember", "citrine", "midnight", "lavender", "stone"];
const emptySubscribe = () => () => {};
const useHasMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useHasMounted();
  const activeTheme = mounted ? resolvedTheme || "dark" : "dark";
  const currentIndex = themes.indexOf(activeTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length] || "dark";

  const toggleTheme = () => {
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <span aria-hidden="true">
        <Palette />
      </span>
    </button>
  );
};

export default ThemeToggle;
