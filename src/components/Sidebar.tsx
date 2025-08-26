"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  sidebarState: "expanded" | "collapsed";
  onToggleSidebar: () => void;
}

export default function Sidebar({
  sidebarState,
  onToggleSidebar,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 dark:bg-gray-200 rounded-md"
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-white dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar fixed  lg:static inset-0 z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          sidebarState === "collapsed" ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Top section */}
          <div className="sidebar__top p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="brand flex items-center gap-3">
              <button
                className="iconbtn p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={onToggleSidebar}
                aria-label="Collapse sidebar"
                title="Collapse"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {sidebarState === "expanded" && (
                <div className="brand__name flex items-center m-0"></div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar__nav flex-1  space-y-2 ">
            <button className="navitem w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              {sidebarState === "expanded" && (
                <h2 className="list-title text-sm font-medium">New chat</h2>
              )}
            </button>

            <Link
              href="/login"
              className="navitem flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v4"></path>
                <path d="M10 14L21 3"></path>
                <path d="M21 10v10a2 2 0 0 1-2 2H9"></path>
              </svg>
              {sidebarState === "expanded" && (
                <h2 className="list-title text-sm font-medium">Log in</h2>
              )}
            </Link>

            <Link
              href="/signup"
              className="navitem flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              {sidebarState === "expanded" && (
                <h2 className="list-title text-sm font-medium">Sign up</h2>
              )}
            </Link>

            {sidebarState === "expanded" && (
              <div className="divider h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
            )}

            <button className="navitem w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18"></path>
                <path d="M12 3v18"></path>
              </svg>
              {sidebarState === "expanded" && (
                <h2 className="list-title text-sm font-medium">
                  Business and Thinking
                </h2>
              )}
            </button>
          </nav>

          {/* Chat history */}
          {sidebarState === "expanded" && (
            <div className="sidebar__list p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="list-title text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                Chats
              </div>
              <div className="space-y-2">
                <button className="conv w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Build lead desk product
                </button>
                <button className="conv w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Master prompt Next.js ChatGPT
                </button>
                <button className="conv w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Mail draft for resume
                </button>
                <button className="conv w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Email draft for application
                </button>
                <button className="conv w-full text-left p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Six-figure job websites
                </button>
              </div>
            </div>
          )}

          {/* Bottom section */}
          <div className="sidebar__bottom p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="me flex items-center gap-3">
              <div className="dot w-3 h-3 bg-green-500 rounded-full"></div>
              {sidebarState === "expanded" && (
                <div className="me__name text-sm">Guest</div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}
