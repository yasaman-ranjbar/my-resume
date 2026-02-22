import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const page = () => {
  return (
    <>
      <header className="m-6 rounded-3xl bg-[#F5F7FB] p-5">
        <Input
          placeholder="Search"
          icon={<Search />}
        />
      </header>
      <div className="m-6 min-h-[600px] rounded-4xl bg-[#F5F7FB] p-5">dashboard</div>
    </>
  );
};

export default page;
