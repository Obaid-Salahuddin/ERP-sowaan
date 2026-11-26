"use client";

import { ResourcePage, type ResourceConfig } from "@/components/ResourcePage";

const config: ResourceConfig<"suppliers"> = {
  collection: "suppliers",
  title: "Suppliers",
  description: "Vendors you purchase stock from.",
  singular: "Supplier",
  idPrefix: "s",
  searchText: (s) => `${s.name} ${s.contact} ${s.email} ${s.country}`,
  blank: () => ({ name: "", contact: "", email: "", phone: "", country: "" }),
  fields: [
    { name: "name", label: "Company name", required: true, wide: true },
    { name: "contact", label: "Contact person" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone" },
    { name: "country", label: "Country" },
  ],
  columns: [
    { header: "Name", render: (s) => <span className="font-medium text-slate-900">{s.name}</span> },
    { header: "Contact", render: (s) => s.contact },
    { header: "Email", render: (s) => s.email },
    { header: "Phone", render: (s) => s.phone },
    { header: "Country", render: (s) => s.country },
  ],
};

export default function SuppliersPage() {
  return <ResourcePage config={config} />;
}
