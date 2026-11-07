import type { Metadata, Viewport } from "next";
import { Anton, Caveat, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ContactDrawer } from "@/components/layout/ContactDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/effects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
// Tall condensed type for the big service headlines, and a handwritten face for small notes.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "./" },
  // The share image comes from src/app/opengraph-image.tsx.
  openGraph: { title: site.name, description: site.description, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a1445" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds a "js" class before React loads.
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${anton.variable} ${caveat.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide reveal-on-scroll text only when JavaScript runs, so it can never stay hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
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
