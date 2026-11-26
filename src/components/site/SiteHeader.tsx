"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { SOLUTION_GROUPS, solutions } from "@/lib/solutions";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Live Demo" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menus after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="SowaanERP home">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-brand-950 lg:flex">
          <Link href="/" className="rounded-md px-3 py-2 hover:text-brand-600">
            Home
          </Link>
          <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
            <div className="flex items-center rounded-md px-3 py-2">
              <Link href="/solutions" className="hover:text-brand-600">
                Solutions
              </Link>
              <button className="ml-1 hover:text-brand-600" aria-expanded={menuOpen} aria-label="Show solutions menu" onClick={() => setMenuOpen((o) => !o)}>
                <ChevronDown size={16} className={menuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
            </div>
            {menuOpen && (
              <div className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-2">
                <div className="grid grid-cols-3 gap-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-xl shadow-brand-900/10">
                  {SOLUTION_GROUPS.map((group) => (
                    <div key={group}>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent-500">{group}</p>
                      <ul className="space-y-1">
                        {solutions
                          .filter((s) => s.group === group)
                          .map(({ slug, name, short, icon: Icon }) => (
                            <li key={slug}>
                              <Link href={`/solutions/${slug}`} className="flex gap-3 rounded-lg p-2 hover:bg-brand-50">
                                <Icon size={18} className="mt-0.5 shrink-0 text-brand-600" />
                                <span>
                                  <span className="block font-medium text-brand-950">{name}</span>
                                  <span className="block text-xs font-normal text-slate-500">{short}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {LINKS.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 hover:text-brand-600">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 sm:inline-block">
            Try it free
          </Link>
          <button className="rounded-md p-2 text-brand-950 lg:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-brand-100 bg-white px-4 pb-6 lg:hidden">
          <nav className="flex flex-col py-2 text-sm font-medium">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="border-b border-slate-100 py-3">
                {l.label}
              </Link>
            ))}
            <Link href="/solutions" className="py-3">
              All solutions
            </Link>
          </nav>
          {SOLUTION_GROUPS.map((group) => (
            <div key={group} className="mt-3">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-accent-500">{group}</p>
              {solutions
                .filter((s) => s.group === group)
                .map(({ slug, name, icon: Icon }) => (
                  <Link key={slug} href={`/solutions/${slug}`} className="flex items-center gap-2 py-2 text-sm text-brand-950">
                    <Icon size={16} className="text-brand-600" /> {name}
                  </Link>
                ))}
            </div>
          ))}
          <Link href="/contact" className="mt-4 block rounded-lg bg-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-white">
            Try it free
          </Link>
        </div>
      )}
    </header>
  );
}
