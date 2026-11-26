import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Reveal, Stagger, StaggerItem, TiltCard } from "@/components/motion/Reveal";
import { HeroScene } from "@/components/three/HeroScene";
import { getSolution, solutions } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.heroSubtitle };
}

export default function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  // Pages are prerendered via generateStaticParams; Suspense keeps client navigation instant.
  return (
    <Suspense fallback={<HeroPlaceholder />}>
      <SolutionContent params={params} />
    </Suspense>
  );
}

function HeroPlaceholder() {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600">
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 sm:py-24">
        <div className="h-4 w-48 rounded bg-white/20" />
        <div className="mt-10 h-12 max-w-3xl rounded bg-white/20" />
        <div className="mt-4 h-6 max-w-xl rounded bg-white/10" />
      </div>
    </section>
  );
}

async function SolutionContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const Icon = s.icon;
  const related = solutions.filter((x) => x.group === s.group && x.slug !== s.slug);

  return (
    <>
      {/* Hero with 3D motion graphic (desktop) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <HeroScene compact className="absolute inset-y-0 right-0 hidden w-[42%] lg:block" />
        <div className="pointer-events-none relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 [&_a]:pointer-events-auto">
          <nav className="flex items-center gap-1 text-sm text-brand-200" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <ChevronRight size={14} />
            <span className="text-white">{s.name}</span>
          </nav>
          <Reveal className="mt-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Icon size={22} />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-accent-500">{s.name}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{s.heroTitle}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg text-brand-100">{s.heroSubtitle}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold shadow-lg shadow-accent-500/30 transition hover:-translate-y-0.5 hover:bg-accent-600"
            >
              {s.heroCta} <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              Try the live demo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Feature sections */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {s.sections.map((sec, i) => (
            <StaggerItem key={sec.heading}>
              <TiltCard max={4} className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-7 hover:shadow-xl hover:shadow-brand-900/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-xl font-bold leading-snug text-brand-900">{sec.heading}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{sec.body}</p>
                {sec.points && (
                  <ul className="mt-4 space-y-2">
                    {sec.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" /> {p}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.cta && (
                  <Link href="/contact" className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-accent-500 hover:text-accent-600">
                    {sec.cta} <ArrowRight size={16} />
                  </Link>
                )}
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Steps */}
      {s.steps && (
        <section className="bg-brand-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-wider text-accent-500">{s.steps.title}</p>
              <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-tight text-brand-900">{s.steps.heading}</h2>
            </Reveal>
            <ol className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex">
              {s.steps.items.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.12} direction="left" className="relative rounded-2xl bg-white p-6 shadow-sm lg:flex-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 font-bold text-brand-950">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="max-w-3xl text-3xl font-black tracking-tight text-brand-900">{s.why.heading}</h2>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.why.items.map((w) => (
            <StaggerItem
              key={w.title}
              className="rounded-2xl border-l-4 border-accent-500 bg-white p-6 shadow-sm ring-1 ring-brand-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-bold text-brand-950">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{w.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-black tracking-tight text-brand-900">Frequently Asked Questions</h2>
          </Reveal>
          <Stagger className="mt-10 space-y-3">
            {s.faqs.map((f) => (
              <StaggerItem key={f.q}>
                <details className="group rounded-xl bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-950">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="rounded-3xl bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-14 text-center text-white sm:px-16">
          <h2 className="text-3xl font-black tracking-tight">{s.closing.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">Talk to our UK ERP consultants for a free, personalised walkthrough.</p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold hover:bg-accent-600">
            {s.closing.cta} <ArrowRight size={18} />
          </Link>
        </Reveal>

        {related.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="text-xl font-bold text-brand-900">More {s.group} solutions</h2>
            </Reveal>
            <Stagger className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(({ slug, name, short, icon: RIcon }) => (
                <StaggerItem key={slug}>
                  <Link href={`/solutions/${slug}`} className="flex h-full gap-3 rounded-xl border border-brand-100 p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50">
                    <RIcon size={20} className="mt-0.5 shrink-0 text-brand-600" />
                    <span>
                      <span className="block font-semibold text-brand-950">{name}</span>
                      <span className="block text-xs text-slate-500">{short}</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </section>
    </>
  );
}
