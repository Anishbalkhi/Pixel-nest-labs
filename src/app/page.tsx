import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { About, CTASection, ProductsPreview, WhyUs } from "@/components/sections/HomeSections";
import { LabShowcase } from "@/components/sections/LabShowcase";
import { ScrollTextBand } from "@/components/motion/ScrollTextBand";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServicesScroll } from "@/components/sections/ServicesScroll";
import { TechMarquee } from "@/components/sections/TechMarquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesScroll />
      <WhyUs />
      <ScrollTextBand words={["Design", "Build", "Launch", "Grow"]} />
      <ProcessTimeline />
      <TechMarquee />
      <ProductsPreview />
      <LabShowcase />
      <About />
      <FAQ />
      <CTASection />
    </>
  );
}
