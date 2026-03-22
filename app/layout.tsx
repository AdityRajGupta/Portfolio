import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"]
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Aditya Raj — Full Stack Developer",
  description:
    "Portfolio of Aditya Raj, a full stack developer focused on backend architecture, REST APIs, and scalable systems.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Aditya Raj — Portfolio",
    description:
      "Full stack developer portfolio with projects, experience, and backend-focused engineering work.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
