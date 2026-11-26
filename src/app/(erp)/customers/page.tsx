"use client";

import { ResourcePage, type ResourceConfig } from "@/components/ResourcePage";
import { Badge } from "@/components/ui";

const config: ResourceConfig<"customers"> = {
  collection: "customers",
  title: "Customers",
  description: "Everyone you sell to.",
  singular: "Customer",
  idPrefix: "c",
  searchText: (c) => `${c.name} ${c.email} ${c.city}`,
  filter: { field: "status", label: "Statuses", options: ["Active", "Inactive"] },
  blank: () => ({ name: "", email: "", phone: "", city: "", status: "Active" }),
  fields: [
    { name: "name", label: "Company name", required: true, wide: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone" },
    { name: "city", label: "City" },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
  ],
  columns: [
    { header: "Name", render: (c) => <span className="font-medium text-slate-900">{c.name}</span> },
    { header: "Email", render: (c) => c.email },
    { header: "Phone", render: (c) => c.phone },
    { header: "City", render: (c) => c.city },
    { header: "Status", render: (c) => <Badge>{c.status}</Badge> },
  ],
};

export default function CustomersPage() {
  return <ResourcePage config={config} />;
}
