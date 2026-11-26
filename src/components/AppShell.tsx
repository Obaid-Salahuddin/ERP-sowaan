"use client";

import {
  Boxes,
  LayoutDashboard,
  Menu,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  UserSquare2,
  Wallet,
  Factory,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useErp } from "@/lib/store";
import { LogoLight } from "./Logo";
import { cn } from "./ui";

export const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/sales", label: "Sales", icon: ShoppingCart },
  { href: "/purchasing", label: "Purchasing", icon: Truck },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/suppliers", label: "Suppliers", icon: Factory },
  { href: "/hr", label: "Human Resources", icon: UserSquare2 },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/settings", label: "Settings", icon: Settings },
];

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { data } = useErp();
  return (
    <div className="flex h-full flex-col bg-brand-900 text-brand-100">
      <Link href="/" className="flex items-center px-5 py-5" aria-label="SowaanERP home">
        <LogoLight />
      </Link>
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon size={18} className={active ? "text-accent-500" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 px-5 py-4 text-xs">
        <p className="font-medium text-white">{data.company.name}</p>
        <p className="text-brand-300">{data.company.email}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ready } = useErp();
  const current = NAV.find((n) => pathname.startsWith(n.href))?.label ?? "";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64">
            <button className="absolute right-3 top-5 text-slate-400" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-slate-500">{current}</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right text-xs leading-tight">
              <p className="font-medium text-slate-800">Admin User</p>
              <p className="text-slate-500">Administrator</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">AU</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Pages always render; they stay hidden until saved browser data has loaded. */}
          {!ready && <div className="py-24 text-center text-sm text-slate-400">Loading…</div>}
          <div className={ready ? "" : "hidden"}>{children}</div>
        </main>
      </div>
    </div>
  );
}
