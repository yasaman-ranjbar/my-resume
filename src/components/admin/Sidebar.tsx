"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Palette,
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

const menuItems: {
  category?: string;
  items: MenuItem[];
}[] = [
  {
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
          {
            title: "Add Post",
            href: ADMIN_ROUTES.POSTS_NEW,
          },
        ],
      },
      {
        title: "Categories",
        icon: ListPlus,
        submenu: [
          {
            title: "New Category",
            href: ADMIN_ROUTES.New_CATEGORY,
          },
        ],
      },
      {
        title: "Projects",
        icon: Palette,
        submenu: [
          {
            title: "All Projects",
            href: ADMIN_ROUTES.PROJECTS,
          },
          {
            title: "Add Project",
            href: ADMIN_ROUTES.PROJECTS_NEW,
          },
        ],
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
      <div className="bg-bgLight p-3 shadow-md md:hidden">
        <button
          className="cursor-pointer py-5"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={clsx(
          "scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent fixed z-50 h-screen overflow-y-auto bg-[#F5F7FB] text-[#2d353c] transition-all duration-300 md:static",
          "top-0 left-0",
          mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
          "md:w-72 md:translate-x-0"
        )}>
        <div className="flex h-full flex-col p-4">
          <div
            className={clsx(
              "mb-6 flex-col items-center rounded-2xl bg-white py-8 shadow-sm",
              mobileOpen || !isMobile() ? "flex" : "hidden"
            )}>
            <div className="mb-4 flex w-full items-center justify-between px-6">
              <button className="rounded-full p-2 text-[#2d353c] hover:bg-white/10">
                <Info size={16} />
              </button>

              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/10">
                <Image
                  src="/images/admin.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              <button className="rounded-full border border-white/20 p-2 text-[#2d353c] hover:bg-white/10">
                <Mail size={16} />
              </button>
            </div>

            <h2 className="mt-2 text-lg font-semibold">Jasmine</h2>
            <p className="mt-1 text-xs text-gray-700">Front-end Developer</p>
          </div>

          {!mobileOpen && isMobile() && (
            <div className="flex flex-col items-center gap-6 py-6">
              {menuItems
                .flatMap((section) => section.items)
                .map((item) => (
                  <div
                    key={item.title}
                    className="group relative">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-gray-700 transition-colors hover:text-blue-600">
                        <item.icon size={24} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="text-gray-700 transition-colors hover:text-blue-600">
                        <item.icon size={24} />
                      </button>
                    )}

                    {item.submenu && openSubmenus[item.title] && (
                      <div className="absolute top-0 left-full z-50 ml-3 min-w-[180px] rounded-lg bg-white py-2 shadow-xl md:hidden">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileOpen(false)}>
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
                <div
                  key={idx}
                  className="mb-6">
                  {section.category && (
                    <h3 className="mb-3 px-4 text-xs font-semibold tracking-wider text-gray-700 uppercase">
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
                              "flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-colors",
                              isSubOpen ? "bg-white shadow-sm" : "hover:bg-white/60"
                            )}
                            onClick={() => hasSubmenu && toggleSubmenu(item.title)}>
                            <div className="flex items-center gap-3 text-gray-700">
                              <item.icon size={20} />
                              <span className="text-sm font-medium">
                                {item.href ? (
                                  <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}>
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
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                className="overflow-hidden rounded-b-xl bg-white/70">
                                {item.submenu!.map((sub) => (
                                  <li key={sub.title}>
                                    <Link
                                      href={sub.href}
                                      className="block py-2.5 pl-14 text-sm text-gray-600 transition-colors hover:bg-white/50 hover:text-gray-900"
                                      onClick={() => setMobileOpen(false)}>
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
