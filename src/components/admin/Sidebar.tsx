"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Table,
  ChevronDown,
  ChevronRight,
  Info,
  Mail,
  ListPlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_ROUTES } from "@/constant/route";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  submenu?: { title: string; href: string }[];
}

const menuItems: { category?: string; items: MenuItem[] }[] = [
  {
    category: "Navigation",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: ADMIN_ROUTES.DASHBOARD,
      },
      {
        title: "Posts",
        icon: FileText,
        submenu: [
          { title: "All Posts", href: ADMIN_ROUTES.POSTS },
          { title: "Add Post", href: ADMIN_ROUTES.POSTS_NEW },
        ],
      },
      {
        title: "Categories",
        icon: ListPlus,
        submenu: [{ title: "New Category", href: ADMIN_ROUTES.New_CATEGORY }],
      },
    ],
  },
  {
    category: "Components",
    items: [
      {
        title: "Tables",
        icon: Table,
        submenu: [{ title: "Data Tables", href: "/admin/tables" }],
      },
    ],
  },
];

const SidebarItem = ({ item }: { item: MenuItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <li className="mb-1">
      <div
        className={`rounded-t-xl flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-gray-200 ${
          isOpen ? "bg-[#F5F7FB]" : ""
        }`}
        onClick={() => hasSubmenu && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 text-gray-700">
          <item.icon size={18} />
          
          {item.href ? (
            <Link href={item.href} className="font-medium text-sm">{item.title}</Link>
          ) : (
            <span className="font-medium text-sm">{item.title}</span>
          )}
        </div>
        {hasSubmenu && (
          <span className="text-gray-600 ">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#F5F7FB] rounded-b-xl"
          >
            {item.submenu!.map((sub, idx) => (
              <li key={idx}>
                <Link
                  href={sub.href}
                  className=" block pl-12 py-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-white/5 transition-colors"
                >
                  {sub.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default function Sidebar() {
  return (
    <aside className="sticky top-0 w-72 p-4 bg-[#F5F7FB] text-[#2d353c] flex flex-col h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">

      {/* Profile Section */}
      <div className="flex flex-col items-center py-8 shadow-sm bg-white text-[#2d353c] rounded-2xl">
        <div className="flex items-center justify-between w-full px-6 mb-4">
          <button className="p-2 rounded-full text-[#2d353c] hover:bg-white/10 transition-colors">
            <Info size={16} />
          </button>

          <div className="relative w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden">
            <Image
              src="/images/admin.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <button className="p-2 rounded-full border border-white/20 text-[#2d353c] hover:bg-white/10 transition-colors">
            <Mail size={16} />
          </button>
        </div>

        <h2 className="text-lg font-semibold text-[#2d353c] mt-2">Jasmine</h2>
        <p className="text-xs text-gray-700 mt-1">Front-end Developer</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            {section.category && (
              <h3 className="px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                {section.category}
              </h3>
            )}
            <ul>
              {section.items.map((item, itemIdx) => (
                <SidebarItem key={itemIdx} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
