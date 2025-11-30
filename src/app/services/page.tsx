import Header from "@/components/Header";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <Header />
      <div className="pt-20">
        <About />
        <Experience />
      </div>
      <Footer />
    </main>
  );
}
