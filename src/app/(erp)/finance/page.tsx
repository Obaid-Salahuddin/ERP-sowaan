"use client";

import { ResourcePage, type ResourceConfig } from "@/components/ResourcePage";
import { Badge, Card, Money } from "@/components/ui";
import { date, orderTotal, today } from "@/lib/format";
import { useErp } from "@/lib/store";

const CATEGORIES = ["Rent", "Payroll", "Utilities", "Marketing", "Services", "Travel", "Other"] as const;

const config: ResourceConfig<"transactions"> = {
  collection: "transactions",
  title: "Finance",
  description: "Income and expenses that aren't sales or purchase orders.",
  singular: "Transaction",
  idPrefix: "t",
  searchText: (t) => `${t.description} ${t.category}`,
  filter: { field: "type", label: "Types", options: ["Income", "Expense"] },
  blank: () => ({ date: today(), description: "", category: "Other", type: "Expense", amount: 0 }),
  fields: [
    { name: "description", label: "Description", required: true, wide: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "type", label: "Type", type: "select", options: ["Expense", "Income"] },
    { name: "category", label: "Category", type: "select", options: CATEGORIES },
    { name: "amount", label: "Amount", type: "number", required: true },
  ],
  columns: [
    { header: "Date", render: (t) => date(t.date) },
    { header: "Description", render: (t) => <span className="font-medium text-slate-900">{t.description}</span> },
    { header: "Category", render: (t) => t.category },
    { header: "Type", render: (t) => <Badge>{t.type}</Badge> },
    {
      header: "Amount",
      align: "right",
      render: (t) => <span className={t.type === "Income" ? "text-emerald-600" : "text-rose-600"}>{t.type === "Income" ? "+" : "−"}
          <Money value={t.amount} /></span>,
    },
  ],
};

function ProfitAndLoss() {
  const { data } = useErp();
  const sales = data.salesOrders.filter((o) => o.status === "Shipped").reduce((s, o) => s + orderTotal(o.lines), 0);
  const otherIncome = data.transactions.filter((t) => t.type === "Income").reduce((s, t) => s + t.amount, 0);
  const purchases = data.purchaseOrders.filter((o) => o.status === "Received").reduce((s, o) => s + orderTotal(o.lines), 0);
  const expenses = data.transactions.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);
  const net = sales + otherIncome - purchases - expenses;

  const rows = [
    { label: "Sales revenue (shipped orders)", value: sales },
    { label: "Other income", value: otherIncome },
    { label: "Purchases (received orders)", value: -purchases },
    { label: "Operating expenses", value: -expenses },
  ];

  return (
    <Card className="mb-6 p-5">
      <h2 className="font-semibold text-slate-900">Profit &amp; loss summary</h2>
      <dl className="mt-4 divide-y divide-slate-100 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-2">
            <dt className="text-slate-600">{r.label}</dt>
            <dd className={"tabular-nums " + (r.value < 0 ? "text-rose-600" : "text-slate-900")}><Money value={r.value} /></dd>
          </div>
        ))}
        <div className="flex justify-between py-3 text-base font-semibold">
          <dt>Net profit</dt>
          <dd className={"tabular-nums " + (net < 0 ? "text-rose-600" : "text-emerald-600")}><Money value={net} /></dd>
        </div>
      </dl>
    </Card>
  );
}

export default function FinancePage() {
  return <ResourcePage config={{ ...config, summary: () => <ProfitAndLoss /> }} />;
}
