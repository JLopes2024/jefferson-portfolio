import type { Metadata } from "next";

import {
  Inter,
  Space_Grotesk,
} from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { siteConfig } from "@/config/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: "%s | Jefferson Lopes",
  },

  description:
    siteConfig.description,

  applicationName:
    siteConfig.name,

  authors: [
    {
      name: "Jefferson Lopes",
    },
  ],

  creator: "Jefferson Lopes",

  publisher: "Jefferson Lopes",

  keywords:
    siteConfig.keywords,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",

    locale:
      siteConfig.locale,

    url: "/",

    siteName:
      siteConfig.name,

    title:
      siteConfig.title,

    description:
      siteConfig.description,
  },

  twitter: {
    card: "summary",

    title:
      siteConfig.title,

    description:
      siteConfig.description,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.language}
    >
      <body
        className={`${inter.variable} ${spaceGrotesk.variable}`}
      >
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}