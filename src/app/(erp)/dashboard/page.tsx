"use client";

import { AlertTriangle, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { date, money, orderTotal } from "@/lib/format";
import { useErp } from "@/lib/store";

const noopSubscribe = () => () => {};

/** Current "YYYY-MM" in the browser; null during server rendering. */
function useCurrentMonth() {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().toISOString().slice(0, 7),
    () => null,
  );
}

export default function DashboardPage() {
  const { data } = useErp();
  const currentMonth = useCurrentMonth();
  const cur = data.company.currency;

  const stats = useMemo(() => {
    const shipped = data.salesOrders.filter((o) => o.status === "Shipped");
    const salesRevenue = shipped.reduce((s, o) => s + orderTotal(o.lines), 0);
    const otherIncome = data.transactions.filter((t) => t.type === "Income").reduce((s, t) => s + t.amount, 0);
    const purchases = data.purchaseOrders.filter((o) => o.status === "Received").reduce((s, o) => s + orderTotal(o.lines), 0);
    const expenses = data.transactions.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);
    const inventoryValue = data.products.reduce((s, p) => s + p.stock * p.cost, 0);
    const lowStock = data.products.filter((p) => p.stock <= p.reorderLevel);
    const openOrders = data.salesOrders.filter((o) => o.status === "Draft" || o.status === "Confirmed");

    // Revenue by month, 6 months ending at the current month (latest order month during server render)
    const months: { key: string; label: string; value: number }[] = [];
    const anchor = currentMonth ?? data.salesOrders.reduce((m, o) => (o.date > m ? o.date : m), "2000-01").slice(0, 7);
    const [ay, am] = anchor.split("-").map(Number);
    for (let i = 5; i >= 0; i--) {
      const d = new Date(ay, am - 1 - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleDateString("en-US", { month: "short" }),
        value: 0,
      });
    }
    for (const o of shipped) {
      const m = months.find((x) => o.date.startsWith(x.key));
      if (m) m.value += orderTotal(o.lines);
    }

    // Top products by units sold
    const sold = new Map<string, number>();
    for (const o of shipped) for (const l of o.lines) sold.set(l.productId, (sold.get(l.productId) ?? 0) + l.quantity * l.unitPrice);
    const top = [...sold.entries()]
      .map(([id, value]) => ({ product: data.products.find((p) => p.id === id), value }))
      .filter((x) => x.product)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return {
      revenue: salesRevenue + otherIncome,
      costs: purchases + expenses,
      inventoryValue,
      lowStock,
      openOrders,
      months,
      top,
    };
  }, [data, currentMonth]);

  const maxMonth = Math.max(1, ...stats.months.map((m) => m.value));
  const maxTop = Math.max(1, ...stats.top.map((t) => t.value));
  const customerName = (id: string) => data.customers.find((c) => c.id === id)?.name ?? "Unknown";
  const recent = [...data.salesOrders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <>
      <PageHeader title="Dashboard" description={`Overview of ${data.company.name}`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total revenue" value={money(stats.revenue, cur)} hint="Shipped sales + other income" icon={<DollarSign size={20} />} />
        <StatCard
          label="Net profit"
          value={money(stats.revenue - stats.costs, cur)}
          hint={`Costs: ${money(stats.costs, cur)}`}
          icon={<TrendingUp size={20} />}
          tone="emerald"
        />
        <StatCard label="Inventory value" value={money(stats.inventoryValue, cur)} hint={`${data.products.length} products at cost`} icon={<Package size={20} />} tone="amber" />
        <StatCard label="Open sales orders" value={String(stats.openOrders.length)} hint={money(stats.openOrders.reduce((s, o) => s + orderTotal(o.lines), 0), cur) + " pending"} icon={<ShoppingCart size={20} />} tone="rose" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h2 className="font-semibold text-slate-900">Sales revenue, last 6 months</h2>
          <div className="mt-6 flex h-56 items-end gap-3">
            {stats.months.map((m) => (
              <div key={m.key} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs tabular-nums text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">{money(m.value, cur)}</span>
                <div className="w-full max-w-14 rounded-t-md bg-brand-500 transition-colors group-hover:bg-brand-600" style={{ height: `${(m.value / maxMonth) * 100}%`, minHeight: 2 }} title={money(m.value, cur)} />
                <span className="text-xs text-slate-500">{m.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="font-semibold text-slate-900">Low stock alerts</h2>
          </div>
          {stats.lowStock.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">All products are above their reorder level.</p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {stats.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">Reorder at {p.reorderLevel}</p>
                  </div>
                  <Badge color={p.stock === 0 ? "red" : "amber"}>{`${p.stock} left`}</Badge>
                </li>
              ))}
            </ul>
          )}
          <Link href="/purchasing" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
            Create purchase order →
          </Link>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-semibold text-slate-900">Recent sales orders</h2>
            <Link href="/sales" className="text-sm font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {recent.map((o) => (
                  <tr key={o.id}>
                    <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">{o.number}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-700">{customerName(o.customerId)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-500">{date(o.date)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">{money(orderTotal(o.lines), cur)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <Badge>{o.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold text-slate-900">Top products by revenue</h2>
          <ul className="mt-4 space-y-3">
            {stats.top.map((t) => (
              <li key={t.product!.id}>
                <div className="flex justify-between text-sm">
                  <span className="truncate pr-2 text-slate-700">{t.product!.name}</span>
                  <span className="tabular-nums text-slate-900">{money(t.value, cur)}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-brand-500" style={{ width: `${(t.value / maxTop) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
