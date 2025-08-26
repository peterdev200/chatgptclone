"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";

export default function Home() {
  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed">(
    "expanded"
  );
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Restore persisted sidebar state
    const savedSidebarState =
      localStorage.getItem("ditto-sidebar-state") || "expanded";
    setSidebarState(savedSidebarState as "expanded" | "collapsed");

    // Restore persisted theme
    const savedTheme = localStorage.getItem("ditto-theme") || "dark";
    setTheme(savedTheme as "light" | "dark");
  }, []);

  const toggleSidebar = () => {
    const newState = sidebarState === "expanded" ? "collapsed" : "expanded";
    setSidebarState(newState);
    localStorage.setItem("ditto-sidebar-state", newState);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("ditto-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={`app min-h-screen flex ${
        sidebarState === "collapsed" ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar sidebarState={sidebarState} onToggleSidebar={toggleSidebar} />

      <main className="main flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        <header className="topbar flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700 fixed w-full bg-[#101829]">
          <div className="title_roll flex justify-center">
            <div className="our_logo_div flex justify-center items-center rounded-md bg-white">
              <Image
                src="/logofinal.PNG"
                alt="Ditto GPT Logo"
                width={100}
                height={100}
                className="lo_go px-3 h-13 py-1 w-full "
              />
            </div>
          </div>
          <div className=" fixed right-7 items-center">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        <ChatInterface />
      </main>
    </div>
  );
}
