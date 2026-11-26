import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Briefcase,
  Calculator,
  Cloud,
  Eye,
  Handshake,
  Layers,
  Settings2,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion/Reveal";
import { ScrollTilt } from "@/components/motion/ScrollEffects";
import { HeroScene } from "@/components/three/HeroScene";
import { SOLUTION_GROUPS, solutions } from "@/lib/solutions";

const modules = [
  { icon: Calculator, title: "Accounts and Finance", text: "Ledgers, VAT, cash flow and financial reports from live data." },
  { icon: Boxes, title: "Inventory and Stock Management", text: "Real-time stock across warehouses, stores and locations." },
  { icon: Handshake, title: "Customer Relationship Management", text: "Customers, quotes, orders and follow-ups in one place." },
  { icon: ShoppingCart, title: "Purchasing and Supplier Management", text: "Purchase orders, supplier records and goods received." },
  { icon: Users, title: "HR and Payroll", text: "Employee records, attendance, leave and payroll." },
  { icon: Briefcase, title: "Project and Asset Management", text: "Track projects, assets, costs and maintenance." },
];

const reasons = [
  { icon: Layers, title: "Industry-focused functionality", text: "Features built for the way your sector operates." },
  { icon: Settings2, title: "Integrated business processes", text: "Finance, stock, sales and HR share one system." },
  { icon: Cloud, title: "Cloud-based flexibility", text: "Access your business from any location or device." },
  { icon: Wrench, title: "Configurable workflows", text: "Approvals and processes set up around how you work." },
  { icon: BadgeCheck, title: "Implementation assistance", text: "Guidance from planning through to go-live." },
  { icon: Eye, title: "Business-wide visibility", text: "Real-time reports across every department and site." },
];

const faqs = [
  { q: "What is ERP software?", a: "Enterprise Resource Planning (ERP) software connects core business processes (finance, inventory, sales, purchasing and HR) in one system so everyone works from the same data." },
  { q: "What is cloud ERP?", a: "Cloud ERP is hosted online rather than on your own servers, so you can access it securely from anywhere without managing hardware." },
  { q: "Is SowaanERP suitable for small businesses?", a: "Yes. SowaanERP is designed for UK small and growing businesses. Start with the modules you need and add more as you grow." },
  { q: "Can SowaanERP be configured for my industry?", a: "Yes. We offer solutions for manufacturing, retail, distribution, healthcare, education, charities, restaurants and more." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <Reveal delay={0}><p className="text-sm font-bold uppercase tracking-wider text-accent-500">ERP Software UK</p></Reveal>
            <Reveal delay={0.1}><h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">ERP Software UK to Fix Operational Inefficiency</h1></Reveal>
            <Reveal delay={0.2}><p className="mt-6 text-xl font-semibold text-brand-100">Is operational inefficiency slowing your business growth?</p>
            <p className="mt-4 max-w-xl text-brand-200">
              SowaanERP&apos;s cloud ERP brings finance, inventory, sales, procurement and HR into one system for UK small and growing businesses.
            </p></Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold shadow-lg shadow-accent-500/30 transition hover:-translate-y-0.5 hover:bg-accent-600">
                Book Your Personalised Demo <ArrowRight size={18} />
              </Link>
              <Link href="/solutions" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
                Explore SowaanERP Solutions
              </Link>
            </Reveal>
          </div>

          {/* 3D motion graphic */}
          <HeroScene className="relative h-[340px] sm:h-[440px] lg:h-[540px]" />
        </div>
      </section>

      {/* Dashboard preview, tilts into place on scroll */}
      <section className="bg-gradient-to-b from-brand-600 to-white px-4 pb-8 sm:px-6">
        <ScrollTilt className="mx-auto max-w-5xl">
          <Link href="/dashboard" className="group block rounded-2xl bg-white/20 p-3 shadow-2xl shadow-brand-900/30 ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25">
            <div className="rounded-xl bg-white p-4 text-brand-950 shadow-2xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Revenue", "£48.2k", "text-brand-600"],
                  ["Net profit", "£12.9k", "text-emerald-600"],
                  ["Open orders", "14", "text-amber-600"],
                  ["Low stock", "3", "text-accent-500"],
                ].map(([label, value, color]) => (
                  <div key={label} className="rounded-lg bg-brand-50 p-3">
                    <p className="text-[11px] text-slate-500">{label}</p>
                    <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-36 items-end gap-2 rounded-lg bg-brand-50 p-4">
                {[40, 55, 48, 70, 62, 85, 78, 92, 88, 100, 94, 110].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-brand-500" style={{ height: `${(h / 110) * 100}%` }} />
                ))}
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-brand-600 group-hover:underline">Open the live demo →</p>
            </div>
          </Link>
        </ScrollTilt>
      </section>

      {/* Solutions */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-500">Solutions</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">Solve the Operational Challenges Unique to Your Industry</h2>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {SOLUTION_GROUPS.map((group) => (
            <StaggerItem key={group} className="rounded-2xl border border-brand-100 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-brand-900/5">
              <h3 className="font-bold text-brand-900">{group}</h3>
              <ul className="mt-4 space-y-1">
                {solutions
                  .filter((s) => s.group === group)
                  .map(({ slug, name, short, icon: Icon }) => (
                    <li key={slug}>
                      <Link href={`/solutions/${slug}`} className="group flex items-center gap-3 rounded-lg p-2 hover:bg-brand-50">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                          <Icon size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-brand-950">{name}</span>
                          <span className="block truncate text-xs text-slate-500">{short}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-50 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-brand-900">Not sure which solution fits?</p>
            <p className="text-sm text-slate-600">Talk to our UK ERP consultants for a free walkthrough.</p>
          </div>
          <Link href="/contact" className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600">
            Book a free demo
          </Link>
        </Reveal>
      </section>

      {/* Modules */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-500">Modules</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">Comprehensive ERP Software Solutions for Every Department</h2>
            <p className="mt-4 text-slate-600">Bring finance, stock, sales and HR into one connected system.</p>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
              <TiltCard className="h-full rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-brand-900/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-bold text-brand-950">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Link href="/dashboard" className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:underline">
              Find the Right ERP Modules for Your Business: try the live demo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-brand-900 sm:text-4xl">Why Choose SowaanERP? The Right ERP Fit for Your Business</h2>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className="flex gap-4 rounded-2xl border border-brand-100 p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
              <Icon size={24} className="shrink-0 text-accent-500" />
              <div>
                <h3 className="font-bold text-brand-950">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-black tracking-tight text-brand-900">Frequently Asked Questions</h2>
          <Stagger className="mt-10 space-y-3">
            {faqs.map((f) => (
              <StaggerItem key={f.q}><details className="group rounded-xl bg-white p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-950">
                  {f.q}
                  <span className="text-brand-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="rounded-3xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-14 text-center text-white sm:px-16">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Book a Personalised ERP Demo</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">See how SowaanERP connects your operations in real time.</p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold hover:bg-accent-600">
            Discuss Your Industry Requirements <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
