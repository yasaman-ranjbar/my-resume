import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header className="bg-[#F5F7FB] text-gray-600" />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
