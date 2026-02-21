import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#131313] text-white selection:bg-[#F9004D] selection:text-white">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
