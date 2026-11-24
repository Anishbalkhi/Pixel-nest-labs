import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Inter } from "next/font/google";
import { ContactDrawer } from "@/components/layout/ContactDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/effects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Tall condensed type for the big service headlines, and a handwritten face for small notes.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pixel Nest Labs | Custom Software, Web App & Digital Product Studio",
    template: `%s | ${site.name}`,
  },
  description:
    "Pixel Nest Labs is a digital product studio crafting high-performance websites, custom web applications, CRMs, and AI automation tools for growing businesses.",
  keywords: [
    "custom software development",
    "web application development",
    "business website development",
    "Next.js development studio",
    "custom CRM development",
    "Shopify store development",
    "AI automation tools",
    "digital product studio",
    "Pixel Nest Labs",
  ],
  authors: [{ name: "Pixel Nest Labs", url: siteUrl }],
  creator: "Pixel Nest Labs",
  publisher: "Pixel Nest Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Pixel Nest Labs | Custom Software, Web App & Digital Product Studio",
    description:
      "Pixel Nest Labs crafts high-performance websites, web applications, custom CRMs, and AI automation tools for growing businesses.",
    url: siteUrl,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel Nest Labs | Custom Software, Web App & Digital Product Studio",
    description:
      "Design, Development, and AI Solutions for Growing Businesses.",
  },
  verification: {
    google: "lQXJ4JNB12f7BhAVYlWosOFAcoqyF-4lvZmFXeKdXDE",
  },
};

export const viewport: Viewport = { themeColor: "#f4f4f2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds a "js" class before React loads.
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${caveat.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide reveal-on-scroll text only when JavaScript runs, so it can never stay hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>
          <a
            href="#main"
            className="bg-navy sr-only z-50 rounded-lg px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <Navbar />
          <main id="main" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 md:pb-16 lg:px-8">
            {children}
          </main>
          <ContactDrawer />
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
