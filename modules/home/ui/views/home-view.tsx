import { HeroSlider } from "../components/HeroSlider";
import { IndustriesGallerySection } from "../components/GallerySection";
import { WelcomeSection } from "../components/WelcomeSection";
import { FeaturedProductsSection } from "../components/FeaturedProducts";
import { WhyChooseUsHome } from "../components/WhyChooseUsHome";
import { GlobalReachSection } from "../components/GlobalReachSection";
import { CTASection } from "../components/CTASection";

export default function HomeView() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <WelcomeSection />
      <WhyChooseUsHome />
      <FeaturedProductsSection />
      <IndustriesGallerySection />
      <GlobalReachSection />
      <CTASection />
    </main>
  );
}
