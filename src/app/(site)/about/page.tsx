import AboutContent from "@/components/pageContainer/About/About";
import WorkExperience from "@/components/pageContainer/WorkExperience";

export default function About() {
  return (
    <main className="min-h-screen bg-[#131313] text-white">
      <AboutContent />
      <WorkExperience />
    </main>
  );
}
