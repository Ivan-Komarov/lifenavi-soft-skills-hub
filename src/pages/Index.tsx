import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DescriptionSection from '@/components/DescriptionSection';
import ExploreSection from '@/components/ExploreSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DescriptionSection />
      <ExploreSection />
      <Footer />
    </div>
  );
};

export default Index;
