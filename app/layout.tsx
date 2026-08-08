import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentationProvider from "@/components/AgentationProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bruantech.vercel.app"),
  title: {
    default: "Bruantech | Seamless Business Solutions",
    template: "%s | Bruantech",
  },
  description: "We handle your technology so you can focus on what matters. From IT support to digital transformation, we deliver reliable solutions that keep your business moving forward.",
  openGraph: {
    title: "Bruantech | Technology Partner For A Complex World",
    description: "Reliable, results-driven technology solutions tailored to your business goals. We take a client-first approach to provide honest advice and practical solutions.",
    url: "https://bruantech.vercel.app",
    siteName: "Bruantech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bruantech IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruantech | Technology Partner",
    description: "Reliable, results-driven technology solutions tailored to your business goals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LayoutShell navbar={<Navbar />} footer={<Footer />}>
          {children}
        </LayoutShell>
        <AgentationProvider />
      </body>
    </html>
  );
}