"use client";

import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { money, date, newId, orderTotal, today } from "@/lib/format";
import { useErp } from "@/lib/store";
import type { OrderLine, PurchaseOrder, SalesOrder } from "@/lib/types";
import { Badge, Button, Card, EmptyState, Field, Modal, PageHeader, inputClass } from "./ui";

type Mode = "sales" | "purchase";
type Order = SalesOrder | PurchaseOrder;

type Draft = {
  id?: string;
  number: string;
  partyId: string;
  date: string;
  status: string;
  lines: OrderLine[];
};

const SETTINGS = {
  sales: {
    key: "salesOrders" as const,
    title: "Sales Orders",
    description: "Quotes and customer orders. Marking an order Shipped deducts stock.",
    singular: "Sales Order",
    party: "Customer",
    prefix: "SO-",
    statuses: ["Draft", "Confirmed", "Shipped", "Cancelled"],
    doneStatus: "Shipped",
  },
  purchase: {
    key: "purchaseOrders" as const,
    title: "Purchase Orders",
    description: "Orders to suppliers. Marking an order Received adds stock.",
    singular: "Purchase Order",
    party: "Supplier",
    prefix: "PO-",
    statuses: ["Draft", "Ordered", "Received", "Cancelled"],
    doneStatus: "Received",
  },
};

function partyIdOf(order: Order) {
  return "customerId" in order ? order.customerId : order.supplierId;
}

export function OrdersPage({ mode }: { mode: Mode }) {
  const s = SETTINGS[mode];
  const { data, add, update, remove } = useErp();
  const orders = data[s.key] as Order[];
  const parties = mode === "sales" ? data.customers : data.suppliers;
  const productById = useMemo(() => new Map(data.products.map((p) => [p.id, p])), [data.products]);
  const partyName = (id: string) => parties.find((p) => p.id === id)?.name ?? "Unknown";

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const visible = orders.filter((o) => {
    const q = query.trim().toLowerCase();
    if (q && !`${o.number} ${partyName(partyIdOf(o))}`.toLowerCase().includes(q)) return false;
    return status === "All" || o.status === status;
  });

  function nextNumber() {
    const max = orders.reduce((m, o) => Math.max(m, Number(o.number.replace(/\D/g, "")) || 0), mode === "sales" ? 1000 : 2000);
    return `${s.prefix}${max + 1}`;
  }

  function openNew() {
    setError("");
    setDraft({ number: nextNumber(), partyId: parties[0]?.id ?? "", date: today(), status: s.statuses[0], lines: [] });
  }

  function openEdit(o: Order) {
    setError("");
    setDraft({ id: o.id, number: o.number, partyId: partyIdOf(o), date: o.date, status: o.status, lines: o.lines.map((l) => ({ ...l })) });
  }

  function addLine() {
    if (!draft) return;
    const p = data.products[0];
    if (!p) return;
    setDraft({ ...draft, lines: [...draft.lines, { productId: p.id, quantity: 1, unitPrice: mode === "sales" ? p.price : p.cost }] });
  }

  function setLine(i: number, patch: Partial<OrderLine>) {
    if (!draft) return;
    setDraft({ ...draft, lines: draft.lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    if (!draft.partyId) return setError(`Add a ${s.party.toLowerCase()} first.`);
    if (draft.lines.length === 0) return setError("Add at least one line item.");

    // Prevent shipping more than is in stock (account for stock this order already deducted).
    if (mode === "sales" && draft.status === "Shipped") {
      const prev = draft.id ? orders.find((o) => o.id === draft.id) : undefined;
      const already = new Map<string, number>();
      if (prev?.status === "Shipped") for (const l of prev.lines) already.set(l.productId, (already.get(l.productId) ?? 0) + l.quantity);
      const need = new Map<string, number>();
      for (const l of draft.lines) need.set(l.productId, (need.get(l.productId) ?? 0) + l.quantity);
      for (const [pid, qty] of need) {
        const p = productById.get(pid);
        const available = (p?.stock ?? 0) + (already.get(pid) ?? 0);
        if (qty > available) return setError(`Not enough stock for ${p?.name}: ${available} available, ${qty} requested.`);
      }
    }

    const base = { id: draft.id ?? newId(mode === "sales" ? "so" : "po"), number: draft.number, date: draft.date, lines: draft.lines };
    const record =
      mode === "sales"
        ? ({ ...base, customerId: draft.partyId, status: draft.status } as SalesOrder)
        : ({ ...base, supplierId: draft.partyId, status: draft.status } as PurchaseOrder);
    if (draft.id) update(s.key, record as never);
    else add(s.key, record as never);
    setDraft(null);
  }

  const totalOpen = orders.filter((o) => o.status !== s.doneStatus && o.status !== "Cancelled").reduce((sum, o) => sum + orderTotal(o.lines), 0);

  return (
    <>
      <PageHeader
        title={s.title}
        description={s.description}
        action={
          <Button onClick={openNew}>
            <Plus size={16} /> New {s.singular}
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {s.statuses.map((st) => (
          <Card key={st} className="p-4">
            <p className="text-sm text-slate-500">{st}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{orders.filter((o) => o.status === st).length}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className={inputClass + " pl-9"} placeholder={`Search by number or ${s.party.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <select className={inputClass + " sm:w-44"} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
            <option value="All">All statuses</option>
            {s.statuses.map((st) => (
              <option key={st}>{st}</option>
            ))}
          </select>
          <span className="text-sm text-slate-500">Open value: {money(totalOpen, data.company.currency)}</span>
        </div>
        <div className="overflow-x-auto">
          {visible.length === 0 ? (
            <EmptyState message="No orders found." />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">{s.party}</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{o.number}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{partyName(partyIdOf(o))}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{date(o.date)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{o.lines.reduce((n, l) => n + l.quantity, 0)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-slate-900">{money(orderTotal(o.lines), data.company.currency)}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Badge>{o.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(o)} aria-label="Edit">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(o)} aria-label="Delete">
                        <Trash2 size={14} className="text-rose-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <Modal wide open={draft !== null} title={draft?.id ? `Edit ${draft.number}` : `New ${s.singular}`} onClose={() => setDraft(null)}>
        {draft && (
          <form onSubmit={save} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <Field label="Number">
                <input className={inputClass} value={draft.number} onChange={(e) => setDraft({ ...draft, number: e.target.value })} required />
              </Field>
              <Field label={s.party}>
                <select className={inputClass} value={draft.partyId} onChange={(e) => setDraft({ ...draft, partyId: e.target.value })} required>
                  {parties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Date">
                <input type="date" className={inputClass} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} required />
              </Field>
              <Field label="Status">
                <select className={inputClass} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
                  {s.statuses.map((st) => (
                    <option key={st}>{st}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Line items</h3>
                <Button type="button" size="sm" variant="secondary" onClick={addLine} disabled={data.products.length === 0}>
                  <Plus size={14} /> Add item
                </Button>
              </div>
              {draft.lines.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">No items yet.</p>
              ) : (
                <div className="space-y-2">
                  {draft.lines.map((l, i) => (
                    <div key={i} className="grid grid-cols-12 items-center gap-2">
                      <select
                        className={inputClass + " col-span-12 sm:col-span-5"}
                        value={l.productId}
                        aria-label="Product"
                        onChange={(e) => {
                          const p = productById.get(e.target.value);
                          setLine(i, { productId: e.target.value, unitPrice: p ? (mode === "sales" ? p.price : p.cost) : l.unitPrice });
                        }}
                      >
                        {data.products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.stock} in stock)
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min={1}
                        aria-label="Quantity"
                        className={inputClass + " col-span-3 sm:col-span-2"}
                        value={l.quantity}
                        onChange={(e) => setLine(i, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                      />
                      <input
                        type="number"
                        min={0}
                        step="any"
                        aria-label="Unit price"
                        className={inputClass + " col-span-4 sm:col-span-2"}
                        value={l.unitPrice}
                        onChange={(e) => setLine(i, { unitPrice: Number(e.target.value) || 0 })}
                      />
                      <span className="col-span-4 text-right text-sm tabular-nums text-slate-700 sm:col-span-2">{money(l.quantity * l.unitPrice, data.company.currency)}</span>
                      <button
                        type="button"
                        className="col-span-1 justify-self-end rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                        onClick={() => setDraft({ ...draft, lines: draft.lines.filter((_, idx) => idx !== i) })}
                        aria-label="Remove line"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 flex justify-end border-t border-slate-200 pt-3 text-sm">
                <span className="text-slate-500">Total:&nbsp;</span>
                <span className="font-semibold tabular-nums text-slate-900">{money(orderTotal(draft.lines), data.company.currency)}</span>
              </div>
            </div>

            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">Save order</Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={confirmDelete !== null} title="Delete order?" onClose={() => setConfirmDelete(null)}>
        <p className="text-sm text-slate-600">
          {confirmDelete?.status === s.doneStatus
            ? `This order is ${s.doneStatus.toLowerCase()}, so deleting it will reverse its stock movement.`
            : "This order will be permanently removed."}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmDelete) remove(s.key, confirmDelete.id);
              setConfirmDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
