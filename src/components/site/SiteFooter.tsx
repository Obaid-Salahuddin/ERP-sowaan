import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { BRAND, LogoLight } from "@/components/Logo";
import { SOLUTION_GROUPS, solutions } from "@/lib/solutions";

export function SiteFooter() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <LogoLight />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            Cloud ERP that brings finance, inventory, sales, procurement and HR into one connected system for UK small and growing businesses.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail size={16} /> {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                <Phone size={16} /> {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                <MessageCircle size={16} /> WhatsApp us
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-4 text-sm">
            {Object.entries(BRAND.social).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-brand-200 hover:text-white">
                {name}
              </a>
            ))}
          </div>
        </div>

        {SOLUTION_GROUPS.map((group) => (
          <div key={group}>
            <p className="text-sm font-bold text-white">{group}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {solutions
                .filter((s) => s.group === group)
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className="text-brand-200 hover:text-white">
                      {s.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-brand-300 sm:flex-row sm:justify-between sm:px-6">
          <p>© SowaanERP. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
            <Link href="/dashboard" className="hover:text-white">Live Demo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
