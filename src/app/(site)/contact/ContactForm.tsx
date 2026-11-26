"use client";

import { useState } from "react";
import { BRAND } from "@/components/Logo";
import { solutions } from "@/lib/solutions";

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

/**
 * There is no backend yet, so submitting opens the visitor's email app with the
 * details filled in. Replace with a server action or API route to store enquiries.
 */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", solution: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.solution || "Not sure"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent("Demo request: " + (form.company || form.name))}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <h2 className="text-xl font-bold text-brand-900 sm:col-span-2">Request a demo</h2>
      <label className="block text-sm font-medium text-slate-700">
        Full name
        <input className={field + " mt-1"} value={form.name} onChange={set("name")} required />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Work email
        <input type="email" className={field + " mt-1"} value={form.email} onChange={set("email")} required />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Company
        <input className={field + " mt-1"} value={form.company} onChange={set("company")} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Phone
        <input type="tel" className={field + " mt-1"} value={form.phone} onChange={set("phone")} />
      </label>
      <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
        Which solution are you interested in?
        <select className={field + " mt-1"} value={form.solution} onChange={set("solution")}>
          <option value="">Not sure yet</option>
          {solutions.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
        Tell us about your business
        <textarea rows={5} className={field + " mt-1"} value={form.message} onChange={set("message")} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
          Book Your Personalised Demo
        </button>
      </div>
    </form>
  );
}
