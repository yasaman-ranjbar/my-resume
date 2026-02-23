"use client";

import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useUserById } from "@/hooks/useGetUserById";

const TopBar = () => {
  const { data } = useUserById("2");
  const user = data?.user;

  return (
    <header className="flex flex-col-reverse gap-4 rounded-3xl bg-[#F5F7FB] p-5 md:flex-row md:justify-between mx-5 mt-3">
      <Input
        placeholder="Search"
        icon={<Search />}
        className="md:w-[200px]"
      />
      <div className="flex flex-row-reverse items-center justify-between gap-2 md:justify-start">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Mail
              size={18}
              color="gray"
            />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Bell
              size={18}
              color="gray"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/admin.jpg"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-medium">{user?.name}</h3>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
