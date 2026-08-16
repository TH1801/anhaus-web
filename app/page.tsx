import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Gallery } from "@/components/home/Gallery";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Process } from "@/components/home/Process";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <BeforeAfter />
      <Process />
      <CtaBanner />
    </>
  );
}
