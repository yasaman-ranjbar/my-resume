import React from "react";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-hidden text-gray-800">
          <header className="m-6 rounded-3xl bg-[#F5F7FB] p-5">
            <h1>Admin Dashboard</h1>
          </header>
          <div className="m-6 min-h-[600px] rounded-4xl bg-[#F5F7FB]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
