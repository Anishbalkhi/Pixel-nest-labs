import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { About, CTASection, LabProjects, ProductsPreview, WhyUs } from "@/components/sections/HomeSections";
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
      <LabProjects />
      <About />
      <FAQ />
      <CTASection />
    </>
  );
}
