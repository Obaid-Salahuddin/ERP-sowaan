"use client";

import { ResourcePage, type ResourceConfig } from "@/components/ResourcePage";
import { Badge, Card, Money } from "@/components/ui";

const CATEGORIES = ["Electronics", "Furniture", "Supplies", "Other"] as const;

const config: ResourceConfig<"products"> = {
  collection: "products",
  title: "Inventory",
  description: "Products, pricing and stock levels.",
  singular: "Product",
  idPrefix: "p",
  searchText: (p) => `${p.sku} ${p.name} ${p.category}`,
  filter: { field: "category", label: "Categories", options: CATEGORIES },
  blank: () => ({ sku: "", name: "", category: "Electronics", price: 0, cost: 0, stock: 0, reorderLevel: 5 }),
  fields: [
    { name: "name", label: "Product name", required: true, wide: true },
    { name: "sku", label: "SKU", required: true },
    { name: "category", label: "Category", type: "select", options: CATEGORIES },
    { name: "price", label: "Sale price", type: "number", required: true },
    { name: "cost", label: "Unit cost", type: "number", required: true },
    { name: "stock", label: "Quantity on hand", type: "number" },
    { name: "reorderLevel", label: "Reorder level", type: "number" },
  ],
  columns: [
    { header: "SKU", render: (p) => <span className="font-mono text-xs text-slate-500">{p.sku}</span> },
    { header: "Product", render: (p) => <span className="font-medium text-slate-900">{p.name}</span> },
    { header: "Category", render: (p) => p.category },
    { header: "Price", render: (p) => <Money value={p.price} />, align: "right" },
    { header: "Cost", render: (p) => <Money value={p.cost} />, align: "right" },
    { header: "Margin", render: (p) => (p.price ? `${Math.round(((p.price - p.cost) / p.price) * 100)}%` : "—"), align: "right" },
    { header: "Stock", render: (p) => p.stock, align: "right" },
    {
      header: "Status",
      render: (p) => <Badge>{p.stock === 0 ? "Out of stock" : p.stock <= p.reorderLevel ? "Low stock" : "In stock"}</Badge>,
    },
  ],
  summary: (items) => (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="p-4">
        <p className="text-sm text-slate-500">Total units</p>
        <p className="mt-1 text-xl font-semibold tabular-nums">{items.reduce((s, p) => s + p.stock, 0).toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-slate-500">Stock value (at cost)</p>
        <p className="mt-1 text-xl font-semibold tabular-nums"><Money value={items.reduce((s, p) => s + p.stock * p.cost, 0)} /></p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-slate-500">Need reorder</p>
        <p className="mt-1 text-xl font-semibold tabular-nums text-amber-600">{items.filter((p) => p.stock <= p.reorderLevel).length}</p>
      </Card>
    </div>
  ),
};

export default function InventoryPage() {
  return <ResourcePage config={config} />;
}
