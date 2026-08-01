import { Poppins, Audiowide } from "next/font/google";
import { Toaster } from "sonner";

import AuthSessionProvider from "@/components/providers/SessionProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400", // Regular 400
  display: "swap",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-audiowide",
});

export const metadata = {
  title: "DevBoard",
  description: "A Task Management SaaS Website",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.className} ${audiowide.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}

