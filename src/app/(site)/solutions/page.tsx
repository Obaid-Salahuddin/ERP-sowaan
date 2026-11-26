import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion/Reveal";
import { HeroScene } from "@/components/three/HeroScene";
import { SOLUTION_GROUPS, solutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "ERP Solutions for Every Industry",
  description: "Explore SowaanERP solutions for manufacturing, retail, distribution, healthcare, education, charities, restaurants and more.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <HeroScene compact className="absolute inset-y-0 right-0 hidden w-[42%] lg:block" />
        <div className="pointer-events-none relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-wider text-accent-500">Solutions</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Solve the Operational Challenges Unique to Your Industry</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-lg text-brand-100">
              SowaanERP brings finance, inventory, sales, procurement and HR into one connected system, configured for the way your sector works.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {SOLUTION_GROUPS.map((group) => (
          <section key={group} className="mb-16 last:mb-0">
            <Reveal>
              <h2 className="text-2xl font-bold text-brand-900">{group}</h2>
            </Reveal>
            <Stagger className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {solutions
                .filter((s) => s.group === group)
                .map(({ slug, name, short, heroTitle, icon: Icon }) => (
                  <StaggerItem key={slug}>
                    <TiltCard className="h-full">
                      <Link
                        href={`/solutions/${slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 transition hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <Icon size={24} />
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-brand-950">{name}</h3>
                        <p className="text-sm font-medium text-accent-500">{short}</p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{heroTitle}</p>
                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                          Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </TiltCard>
                  </StaggerItem>
                ))}
            </Stagger>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-50 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">Not sure which solution fits?</h2>
            <p className="mt-2 text-slate-600">Talk to our UK ERP consultants for a free walkthrough.</p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
            Book a free demo
          </Link>
        </Reveal>
      </section>
    </>
  );
}
