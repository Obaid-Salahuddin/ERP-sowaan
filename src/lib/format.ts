import type { OrderLine } from "./types";

export function money(value: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function date(value: string) {
  if (!value) return "";
  return new Date(value + "T00:00:00").toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

export function orderTotal(lines: OrderLine[]) {
  return lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
}

export function newId(prefix: string) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}
