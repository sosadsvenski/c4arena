import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Zones from "@/components/Zones";
import Pricing from "@/components/Pricing";
import Bar from "@/components/Bar";
import CtaBand from "@/components/CtaBand";
import StickyCta from "@/components/StickyCta";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Zones />
        <Pricing />
        <CtaBand />
        <Bar />
        <Contacts />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
