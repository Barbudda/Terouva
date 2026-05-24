import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Privacy } from "@/components/sections/Privacy";
import { Stack } from "@/components/sections/Stack";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Privacy />
        <Stack />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
