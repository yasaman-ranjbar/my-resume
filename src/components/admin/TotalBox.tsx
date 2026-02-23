import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";

interface TotalBoxProps {
  title: string;
  value: string;
  percentage: string;
}

const TotalBox = ({ title, value, percentage }: TotalBoxProps) => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary flex flex-col gap-2 rounded-2xl p-4 text-white">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Button
          variant="default"
          size="icon"
          className="flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:bg-gray-200">
          <ArrowUpRight
            size={22}
            color="black"
          />
        </Button>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <div className="flex items-center gap-2">
        <p className="rounded-full border border-white px-2 py-1 text-xs font-medium">
          {percentage}
        </p>
        <p className="text-xs text-gray-200">Increased from last month</p>
      </div>
    </div>
  );
};

export default TotalBox;
