import { Hero } from "@/components/landing-page/Hero";
import { Higlight } from "@/components/landing-page/Highlight";
import { Explore } from "@/components/landing-page/Explore";
import { Reviews } from "@/components/landing-page/Reviews";

export default function LandingPage() {
  return (
    <div className="flex flex-col px-5 pb-5">
      <Hero />
      <Higlight />
      <Explore />
      <Reviews />
    </div>
  );
}
