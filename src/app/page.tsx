import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#131313] text-white selection:bg-[#F9004D] selection:text-white">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
