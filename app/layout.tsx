import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
  title: "Aditya Raj — Full Stack Developer | CSE Student, SRM University",
  description:
    "Portfolio of Aditya Raj, a Computer Science Engineering student focused on backend architecture, scalable systems, production-ready REST APIs, data workflows, and end-to-end applications.",
  metadataBase: new URL("https://www.adityarajgupta.online"),
  openGraph: {
    title: "Aditya Raj — Full Stack Developer Portfolio",
    description:
      "Full stack developer portfolio showcasing election analytics platforms, campus management systems, e-commerce solutions, and REST API expertise. Experience with Node.js, Express, React, Next.js, PostgreSQL, and Supabase.",
    url: "https://www.adityarajgupta.online",
    siteName: "Aditya Raj Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aditya Raj Full Stack Developer Portfolio"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj — Full Stack Developer Portfolio",
    description:
      "Backend-focused full-stack developer building production web apps, REST APIs, and data-heavy platforms.",
    images: ["/og-image.svg"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}>
        <Script
          defer
          data-domain="adityarajgupta.online"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
