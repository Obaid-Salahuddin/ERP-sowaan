"use client";

import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { newId } from "@/lib/format";
import { useErp } from "@/lib/store";
import type { CollectionKey, ErpData } from "@/lib/types";
import { Button, Card, EmptyState, Field, Modal, PageHeader, inputClass } from "./ui";

type Item<K extends CollectionKey> = ErpData[K][number];

export type Column<T> = { header: string; render: (item: T) => React.ReactNode; align?: "right" };

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "date" | "select";
  options?: readonly string[];
  required?: boolean;
  wide?: boolean;
};

export type ResourceConfig<K extends CollectionKey> = {
  collection: K;
  title: string;
  description: string;
  singular: string;
  idPrefix: string;
  columns: Column<Item<K>>[];
  fields: FormField[];
  blank: () => Omit<Item<K>, "id">;
  searchText: (item: Item<K>) => string;
  filter?: { field: string; label: string; options: readonly string[] };
  summary?: (items: Item<K>[]) => React.ReactNode;
};

type FormState = Record<string, string | number>;

export function ResourcePage<K extends CollectionKey>({ config }: { config: ResourceConfig<K> }) {
  const { data, add, update, remove } = useErp();
  const items = data[config.collection] as Item<K>[];

  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [editing, setEditing] = useState<FormState | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Item<K> | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (q && !config.searchText(item).toLowerCase().includes(q)) return false;
      if (config.filter && filterValue !== "All") {
        return String((item as Record<string, unknown>)[config.filter.field]) === filterValue;
      }
      return true;
    });
  }, [items, query, filterValue, config]);

  function openNew() {
    setEditing({ ...(config.blank() as FormState) });
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    const record: FormState = { ...editing };
    for (const f of config.fields) if (f.type === "number") record[f.name] = Number(record[f.name]) || 0;
    if (record.id) {
      update(config.collection, record as unknown as Item<K>);
    } else {
      add(config.collection, { ...record, id: newId(config.idPrefix) } as unknown as Item<K>);
    }
    setEditing(null);
  }

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          <Button onClick={openNew}>
            <Plus size={16} /> New {config.singular}
          </Button>
        }
      />

      {config.summary?.(items)}

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className={inputClass + " pl-9"}
              placeholder={`Search ${config.title.toLowerCase()}…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {config.filter && (
            <select className={inputClass + " sm:w-48"} value={filterValue} onChange={(e) => setFilterValue(e.target.value)} aria-label={config.filter.label}>
              <option value="All">All {config.filter.label.toLowerCase()}</option>
              {config.filter.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          )}
          <span className="text-sm text-slate-500">{visible.length} records</span>
        </div>

        <div className="overflow-x-auto">
          {visible.length === 0 ? (
            <EmptyState message={items.length === 0 ? `No ${config.title.toLowerCase()} yet.` : "No records match your search."} />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                <tr>
                  {config.columns.map((c) => (
                    <th key={c.header} className={"whitespace-nowrap px-4 py-3 " + (c.align === "right" ? "text-right" : "")}>
                      {c.header}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    {config.columns.map((c) => (
                      <td key={c.header} className={"whitespace-nowrap px-4 py-3 text-slate-700 " + (c.align === "right" ? "text-right tabular-nums" : "")}>
                        {c.render(item)}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setEditing({ ...(item as unknown as FormState) })} aria-label="Edit">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(item)} aria-label="Delete">
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

      <Modal open={editing !== null} title={editing?.id ? `Edit ${config.singular}` : `New ${config.singular}`} onClose={() => setEditing(null)}>
        {editing && (
          <form onSubmit={save} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {config.fields.map((f) => (
              <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
                <Field label={f.label}>
                  {f.type === "select" ? (
                    <select
                      className={inputClass}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      required={f.required}
                    >
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className={inputClass}
                      type={f.type ?? "text"}
                      step={f.type === "number" ? "any" : undefined}
                      min={f.type === "number" ? 0 : undefined}
                      value={editing[f.name] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                      required={f.required}
                    />
                  )}
                </Field>
              </div>
            ))}
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={confirmDelete !== null} title={`Delete ${config.singular}?`} onClose={() => setConfirmDelete(null)}>
        <p className="text-sm text-slate-600">This record will be permanently removed. This can&apos;t be undone.</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmDelete) remove(config.collection, confirmDelete.id);
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
