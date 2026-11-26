"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { seedData } from "./seed";
import type { CollectionKey, Company, ErpData, PurchaseOrder, SalesOrder } from "./types";

const STORAGE_KEY = "erp-data-v1";

type Item<K extends CollectionKey> = ErpData[K][number];

type Action =
  | { type: "load"; data: ErpData }
  | { type: "reset" }
  | { type: "company"; company: Company }
  | { type: "add"; key: CollectionKey; item: { id: string } }
  | { type: "update"; key: CollectionKey; item: { id: string } }
  | { type: "remove"; key: CollectionKey; id: string };

/** Adjust stock when an order moves into or out of its "stock-moving" status. */
function applyStockMovement(state: ErpData, key: CollectionKey, before: unknown, after: unknown): ErpData {
  if (key !== "salesOrders" && key !== "purchaseOrders") return state;
  const doneStatus = key === "salesOrders" ? "Shipped" : "Received";
  const sign = key === "salesOrders" ? -1 : 1;
  const prev = before as SalesOrder | PurchaseOrder | undefined;
  const next = after as SalesOrder | PurchaseOrder | undefined;

  const delta = new Map<string, number>();
  if (prev?.status === doneStatus) for (const l of prev.lines) delta.set(l.productId, (delta.get(l.productId) ?? 0) - sign * l.quantity);
  if (next?.status === doneStatus) for (const l of next.lines) delta.set(l.productId, (delta.get(l.productId) ?? 0) + sign * l.quantity);
  if (delta.size === 0) return state;

  return {
    ...state,
    products: state.products.map((p) => (delta.has(p.id) ? { ...p, stock: p.stock + (delta.get(p.id) ?? 0) } : p)),
  };
}

function reducer(state: ErpData, action: Action): ErpData {
  switch (action.type) {
    case "load":
      return action.data;
    case "reset":
      return seedData;
    case "company":
      return { ...state, company: action.company };
    case "add": {
      const list = state[action.key] as { id: string }[];
      const next = { ...state, [action.key]: [action.item, ...list] } as ErpData;
      return applyStockMovement(next, action.key, undefined, action.item);
    }
    case "update": {
      const list = state[action.key] as { id: string }[];
      const before = list.find((i) => i.id === action.item.id);
      const next = { ...state, [action.key]: list.map((i) => (i.id === action.item.id ? action.item : i)) } as ErpData;
      return applyStockMovement(next, action.key, before, action.item);
    }
    case "remove": {
      const list = state[action.key] as { id: string }[];
      const before = list.find((i) => i.id === action.id);
      const next = { ...state, [action.key]: list.filter((i) => i.id !== action.id) } as ErpData;
      return applyStockMovement(next, action.key, before, undefined);
    }
  }
}

type StoreValue = {
  data: ErpData;
  add: <K extends CollectionKey>(key: K, item: Item<K>) => void;
  update: <K extends CollectionKey>(key: K, item: Item<K>) => void;
  remove: (key: CollectionKey, id: string) => void;
  setCompany: (company: Company) => void;
  reset: () => void;
  ready: boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

type StoreState = { data: ErpData; loaded: boolean };

function storeReducer(state: StoreState, action: Action): StoreState {
  // "load" also marks the store as hydrated from browser storage.
  if (action.type === "load") return { data: action.data, loaded: true };
  return { ...state, data: reducer(state.data, action) };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [{ data, loaded }, dispatch] = useReducer(storeReducer, { data: seedData, loaded: false });

  // Load saved data once on the client.
  useEffect(() => {
    let saved = seedData;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = { ...seedData, ...JSON.parse(raw) };
    } catch {
      // ignore corrupt or unavailable storage
    }
    dispatch({ type: "load", data: saved });
  }, []);

  // Persist after the initial load.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or unavailable
    }
  }, [data, loaded]);

  const value: StoreValue = {
    data,
    add: (key, item) => dispatch({ type: "add", key, item: item as { id: string } }),
    update: (key, item) => dispatch({ type: "update", key, item: item as { id: string } }),
    remove: (key, id) => dispatch({ type: "remove", key, id }),
    setCompany: (company) => dispatch({ type: "company", company }),
    reset: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      dispatch({ type: "reset" });
    },
    ready: loaded,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useErp() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useErp must be used inside <StoreProvider>");
  return ctx;
}
