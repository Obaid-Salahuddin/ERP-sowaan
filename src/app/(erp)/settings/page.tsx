"use client";

import { useState } from "react";
import { Button, Card, Field, Modal, PageHeader, inputClass } from "@/components/ui";
import { useErp } from "@/lib/store";

const CURRENCIES = ["GBP", "USD", "EUR", "INR", "BDT", "AED", "JPY", "CAD", "AUD"];

export default function SettingsPage() {
  const { ready, reset } = useErp();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      <PageHeader title="Settings" description="Company profile and data management." />

      {/* Remount once saved data loads so the form starts from the stored company profile. */}
      <CompanyForm key={ready ? "loaded" : "initial"} />

      <Card className="mt-6 max-w-2xl border-rose-200 p-6">
        <h2 className="font-semibold text-slate-900">Reset sample data</h2>
        <p className="mt-1 text-sm text-slate-500">
          Data is currently stored in this browser. Resetting restores the original sample records and removes everything you&apos;ve added.
        </p>
        <Button variant="danger" className="mt-4" onClick={() => setConfirmReset(true)}>
          Reset all data
        </Button>
      </Card>

      <Modal open={confirmReset} title="Reset all data?" onClose={() => setConfirmReset(false)}>
        <p className="text-sm text-slate-600">Every change you&apos;ve made will be lost.</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmReset(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // reset() clears saved data first, so the reload starts from the sample data.
              reset();
              setConfirmReset(false);
              window.location.reload();
            }}
          >
            Reset
          </Button>
        </div>
      </Modal>
    </>
  );
}

function CompanyForm() {
  const { data, setCompany } = useErp();
  const [form, setForm] = useState(data.company);
  const [saved, setSaved] = useState(false);

  return (
    <Card className="max-w-2xl p-6">
      <h2 className="font-semibold text-slate-900">Company profile</h2>
      <form
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setCompany(form);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
      >
        <div className="sm:col-span-2">
          <Field label="Company name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
        </div>
        <Field label="Email">
          <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Currency">
          <select className={inputClass} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address">
            <input className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
        </div>
      </form>
    </Card>
  );
}
