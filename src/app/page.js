import { HeaderLanding } from "@/components/layout/HeaderLanding";
import { Hero } from "@/components/landing-page/Hero";
import { Higlight } from "@/components/landing-page/Highlight";

export default function LandingPage() {
  return (
    <div className="flex flex-col px-5">
      <HeaderLanding />
      <Hero />
      <Higlight />
    </div>
  );
}
