"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";

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
        <header className="topbar flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <ChatInterface />
      </main>
    </div>
  );
}
