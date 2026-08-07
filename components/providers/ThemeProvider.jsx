"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const themeValues = [
  "dark",
  "light",
  "ocean",
  "forest",
  "sunset",
  "amber",
  "aurora",
  "ember",
  "citrine",
  "midnight",
  "lavender",
  "stone",
];

export default function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={themeValues}
      value={{
        dark: "dark",
        light: "light",
        ocean: "ocean",
        forest: "forest",
        sunset: "sunset",
        amber: "amber",
        aurora: "aurora",
        ember: "ember",
        citrine: "citrine",
        midnight: "midnight",
        lavender: "lavender",
        stone: "stone",
      }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
