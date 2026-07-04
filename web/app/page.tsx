import Hero from "@/components/sections/Hero";
import Lore from "@/components/sections/Lore";
import Tokenomics from "@/components/sections/Tokenomics";
import ContractShrine from "@/components/sections/ContractShrine";
import LiveChart from "@/components/sections/LiveChart";
import HowToBuy from "@/components/sections/HowToBuy";
import Roadmap from "@/components/sections/Roadmap";
import Footer from "@/components/sections/Footer";
import MarqueeRibbon from "@/components/ui/MarqueeRibbon";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Hero />
      <MarqueeRibbon
        items={["smol but fierce", "$meeko", "no rugs ever", "420.69m supply"]}
      />
      <Lore />
      <Tokenomics />
      <MarqueeRibbon
        items={["0% tax", "mint revoked", "freeze revoked", "fair launch"]}
        tone="zap"
        tilt={2}
        reverse
      />
      <ContractShrine />
      <LiveChart />
      <HowToBuy />
      <Roadmap />
      <MarqueeRibbon
        items={["the prophecy is live", "$meeko", "ascend", "meow"]}
      />
      <Footer />
    </main>
  );
}
