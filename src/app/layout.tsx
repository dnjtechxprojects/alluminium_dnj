import "./globals.css";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/context/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import { Plus_Jakarta_Sans } from "next/font/google";
import PageLoader from "@/components/PageLoader";
import { Suspense } from "react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Natraj Aluform Private Limited",
  description: "India’s largest aluminium extrusion company delivering precision engineered aluminium profiles for industrial, architectural and automotive applications.",

  keywords: [
    "Aluminium extrusion",
    "Aluminium profiles",
    "Industrial aluminium",
    "Aluminium manufacturer in India",
    "Natraj Aluform",
    "Aluminium sections",
    "Extruded aluminium"
  ],

  authors: [{ name: "Natraj Aluform Pvt Ltd" }],
  creator: "Natraj Aluform Private Limited",
  publisher: "Natraj Aluform Private Limited",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Natraj Aluform Private Limited",
    description:
      "India’s largest aluminium extrusion company delivering precision engineered aluminium profiles.",
    url: "https://www.natrajaluform.com",
    siteName: "Natraj Aluform",
   
    locale: "en_IN",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/svg/favicon.svg", sizes: "32x32" },
      { url: "/svg/favicon.svg", sizes: "16x16" },
    ],
    apple: "/svg/favicon.svg",
    shortcut: "/svg/favicon.svg",
  },

  alternates: {
    canonical: "https://www.natrajaluform.com",
  },

  category: "Manufacturing",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={plusJakarta.variable}>
        <Providers>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

