import { Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { BRAND } from "@/components/Logo";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Book a Demo",
  description: "Book a personalised SowaanERP demo or talk to our UK ERP consultants.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-500">Contact Us</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Book Your Personalised Demo</h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100">Tell us about your business and our UK ERP consultants will show you how SowaanERP fits.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
            { icon: Phone, label: "Phone", value: BRAND.phone, href: BRAND.phoneHref },
            { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: BRAND.whatsapp },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} className="flex items-center gap-4 rounded-2xl border border-brand-100 p-5 hover:border-brand-300 hover:bg-brand-50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
                <span className="block font-semibold text-brand-950">{value}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="rounded-2xl border border-brand-100 p-6 shadow-sm sm:p-8 lg:col-span-2">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
