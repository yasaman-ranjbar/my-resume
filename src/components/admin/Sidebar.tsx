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
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ADMIN_ROUTES } from "@/constant/route";
import clsx from "clsx";

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
      { title: "Dashboard", icon: LayoutDashboard, href: ADMIN_ROUTES.DASHBOARD },
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

type OpenSubmenus = Record<string, boolean>;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<OpenSubmenus>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <div
        className="md:hidden bg-bgLight p-3 shadow-md"
      >
        <button className="cursor-pointer py-5" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={26} /></button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={clsx(
          "bg-[#F5F7FB] text-[#2d353c] h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent transition-all duration-300 fixed md:static z-50",
          "top-0 left-0",
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full w-72",
          "md:translate-x-0 md:w-72"
        )}
      >
        <div className="flex flex-col h-full p-4">

          <div
            className={clsx(
              "flex-col items-center py-8 shadow-sm bg-white rounded-2xl mb-6",
              mobileOpen || !isMobile() ? "flex" : "hidden"
            )}
          >
            <div className="flex items-center justify-between w-full px-6 mb-4">
              <button className="p-2 rounded-full text-[#2d353c] hover:bg-white/10">
                <Info size={16} />
              </button>

              <div className="relative w-20 h-20 rounded-full border-4 border-white/10 overflow-hidden">
                <Image src="/images/admin.jpg" alt="Profile" fill className="object-cover" />
              </div>

              <button className="p-2 rounded-full border border-white/20 text-[#2d353c] hover:bg-white/10">
                <Mail size={16} />
              </button>
            </div>

            <h2 className="text-lg font-semibold mt-2">Jasmine</h2>
            <p className="text-xs text-gray-700 mt-1">Front-end Developer</p>
          </div>

          {!mobileOpen && isMobile() && (
            <div className="flex flex-col items-center gap-6 py-6">
              {menuItems.flatMap((section) => section.items).map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                >
                  {item.href ? (
                    <Link href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors">
                      <item.icon size={24} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <item.icon size={24} />
                    </button>
                  )}

                  {item.submenu && openSubmenus[item.title] && (
                    <div className="absolute left-full top-0 ml-3 bg-white shadow-xl rounded-lg py-2 min-w-[180px] z-50 md:hidden">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {(mobileOpen || !isMobile()) && (
            <nav className="flex-1">
              {menuItems.map((section, idx) => (
                <div key={idx} className="mb-6">
                  {section.category && (
                    <h3 className="px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                      {section.category}
                    </h3>
                  )}
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const hasSubmenu = !!item.submenu?.length;
                      const isSubOpen = openSubmenus[item.title] ?? false;

                      return (
                        <li key={item.title}>
                          <div
                            className={clsx(
                              "flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors",
                              isSubOpen ? "bg-white shadow-sm" : "hover:bg-white/60"
                            )}
                            onClick={() => hasSubmenu && toggleSubmenu(item.title)}
                          >
                            <div className="flex items-center gap-3 text-gray-700">
                              <item.icon size={20} />
                              <span className="font-medium text-sm">
                                {item.href ? (
                                  <Link href={item.href} onClick={() => setMobileOpen(false)}>
                                    {item.title}
                                  </Link>
                                ) : (
                                  item.title
                                )}
                              </span>
                            </div>

                            {hasSubmenu && (
                              <span className="text-gray-500">
                                {isSubOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              </span>
                            )}
                          </div>

                          <AnimatePresence>
                            {hasSubmenu && isSubOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-white/70 rounded-b-xl"
                              >
                                {item.submenu!.map((sub) => (
                                  <li key={sub.title}>
                                    <Link
                                      href={sub.href}
                                      className="block pl-14 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-colors"
                                      onClick={() => setMobileOpen(false)}
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
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
}