"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    disableTransitionOnChange
    themes={["dark", "light"]}
    value={{
      dark: "dark",
      light: "light",
    }}>{children}</NextThemesProvider>;
}
