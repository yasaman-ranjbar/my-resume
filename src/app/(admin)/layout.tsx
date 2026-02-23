import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col gap-5">
        <TopBar />
        <main className="mx-5 min-h-screen overflow-hidden rounded-4xl bg-[#F5F7FB] p-5 text-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}
