import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Stats } from "@/components/sections/Stats";
import { Showcase } from "@/components/sections/Showcase";
import { Services } from "@/components/sections/Services";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Manifesto />
        <Stats />
        <Showcase />
        <Services />
        <WhyUs />
        <Testimonials />
        <ServiceArea />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
