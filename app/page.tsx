import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import GemsDirectory from "@/components/GemsDirectory";
import Testimonials from "@/components/Testimonials";
import ContactBanner from "@/components/ContactBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Collections />
      <FeaturedProducts />
      <GemsDirectory />
      <Testimonials />
      <ContactBanner />
      <Footer />
    </main>
  );
}
