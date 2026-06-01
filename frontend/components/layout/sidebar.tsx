"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Target,
  Wallet,
  Trophy,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Sinais", icon: Target, href: "/signals" },
  { label: "Banca", icon: Wallet, href: "/bank" },
  { label: "Rankings", icon: Trophy, href: "/rankings" },
  { label: "Histórico", icon: Clock, href: "/history" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col p-6">
        {/* Logo */}
        <Link href="/" className="mb-12 flex items-center gap-2">
          <div className="text-2xl">⚽</div>
          <div>
            <div className="font-bold text-white text-sm">Elite Tips</div>
            <div className="text-xs text-slate-400">Scanner BR</div>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">v1.0.0</p>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <div className="md:hidden fixed top-0 left-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
