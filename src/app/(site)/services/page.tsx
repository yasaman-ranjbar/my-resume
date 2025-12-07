import Header from "@/components/layout/Header";
import About from "@/components/pageContainer/About/About";
import Experience from "@/components/pageContainer/Experience";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <div className="pt-20">
        <About />
        <Experience />
      </div>
    </main>
  );
}
