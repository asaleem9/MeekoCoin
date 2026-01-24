import Hero from "@/components/Hero";
import About from "@/components/About";
import Tokenomics from "@/components/Tokenomics";
import HowToBuy from "@/components/HowToBuy";
import ContractAddress from "@/components/ContractAddress";
import LiveChart from "@/components/LiveChart";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <About />
      <Tokenomics />
      <ContractAddress />
      <LiveChart />
      <HowToBuy />
      <Roadmap />
      <Footer />
    </main>
  );
}
