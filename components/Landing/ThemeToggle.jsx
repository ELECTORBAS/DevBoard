"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

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

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span aria-hidden="true">
        {mounted ? (isDark ? <Sun /> : <Moon />) : <Moon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
