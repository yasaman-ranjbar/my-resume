"use client";

import { Input } from "@/components/ui/input";
import { useUserById } from "@/hooks/useGetUserById";
import { Search, Mail, Bell } from "lucide-react";

const AdminPage = () => {

  const { data } = useUserById("2");
  const user = data?.user;
  console.log(user);

  return (
    <>
      <header className="m-6 flex justify-between rounded-3xl bg-[#F5F7FB] p-5">
        <Input
          placeholder="Search"
          icon={<Search />}
          className="w-[200px]"
        />
        <div className="flex items-center gap-4">
          <Mail size={20} color="gray"/>
          <Bell size={20} color="gray" />
        </div>
      </header>
      <div className="m-6 min-h-[600px] rounded-4xl bg-[#F5F7FB] p-5">dashboard</div>
    </>
  );
};

export default AdminPage;
