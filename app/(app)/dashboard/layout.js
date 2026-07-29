import { Poppins, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import AuthSessionProvider from "@/components/providers/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400", // Regular 400
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${poppins.className} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
