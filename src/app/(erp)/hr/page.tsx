"use client";

import { ResourcePage, type ResourceConfig } from "@/components/ResourcePage";
import { Badge, Card, Money } from "@/components/ui";
import { date, today } from "@/lib/format";

const DEPARTMENTS = ["Management", "Sales", "Finance", "Purchasing", "Warehouse", "IT", "Other"] as const;
const STATUSES = ["Active", "On Leave", "Terminated"] as const;

const config: ResourceConfig<"employees"> = {
  collection: "employees",
  title: "Human Resources",
  description: "Employee directory and payroll overview.",
  singular: "Employee",
  idPrefix: "e",
  searchText: (e) => `${e.name} ${e.email} ${e.department} ${e.position}`,
  filter: { field: "department", label: "Departments", options: DEPARTMENTS },
  blank: () => ({ name: "", email: "", department: "Sales", position: "", salary: 0, joinDate: today(), status: "Active" }),
  fields: [
    { name: "name", label: "Full name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "department", label: "Department", type: "select", options: DEPARTMENTS },
    { name: "position", label: "Position", required: true },
    { name: "salary", label: "Annual salary", type: "number" },
    { name: "joinDate", label: "Join date", type: "date" },
    { name: "status", label: "Status", type: "select", options: STATUSES },
  ],
  columns: [
    {
      header: "Employee",
      render: (e) => (
        <div>
          <p className="font-medium text-slate-900">{e.name}</p>
          <p className="text-xs text-slate-500">{e.email}</p>
        </div>
      ),
    },
    { header: "Department", render: (e) => e.department },
    { header: "Position", render: (e) => e.position },
    { header: "Joined", render: (e) => date(e.joinDate) },
    { header: "Salary", render: (e) => <Money value={e.salary} />, align: "right" },
    { header: "Status", render: (e) => <Badge>{e.status}</Badge> },
  ],
  summary: (items) => {
    const active = items.filter((e) => e.status !== "Terminated");
    const payroll = active.reduce((s, e) => s + e.salary, 0);
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-slate-500">Headcount</p>
          <p className="mt-1 text-xl font-semibold tabular-nums">{active.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Annual payroll</p>
          <p className="mt-1 text-xl font-semibold tabular-nums"><Money value={payroll} /></p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">On leave</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-amber-600">{items.filter((e) => e.status === "On Leave").length}</p>
        </Card>
      </div>
    );
  },
};

export default function HrPage() {
  return <ResourcePage config={config} />;
}
