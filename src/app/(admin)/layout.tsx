import Sidebar from "@/components/admin/Sidebar";
import { AppRoutes } from "@/constant/route";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect(AppRoutes.HOME);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-hidden text-gray-800">{children}</main>
      </div>
    </div>
  );
}
