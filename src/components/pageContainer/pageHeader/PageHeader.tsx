import Navigator from "@/components/common/Navigator";
import { PageHeaderProps } from "./type";
import Link from "next/link";
import clsx from "clsx";

const PageHeader = ({ title, pageName, className }: PageHeaderProps) => {
  return (
    <div
      className={clsx("flex min-h-[200px] flex-col items-center justify-center gap-4", className)}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <Navigator>
        <Link href={pageName}>{pageName}</Link>
      </Navigator>
    </div>
  );
};

export default PageHeader;
