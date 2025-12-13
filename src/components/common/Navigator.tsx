import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Navigator = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
        <Link href="/" className="text-gray-400 hover:text-white text-sm font-medium ">Home</Link>
        <ChevronRight size={16} />
        {children}
    </div>
  )
}

export default Navigator              