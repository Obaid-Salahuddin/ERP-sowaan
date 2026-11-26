export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderLevel: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "Active" | "Inactive";
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
};

export type OrderLine = { productId: string; quantity: number; unitPrice: number };

export type SalesOrder = {
  id: string;
  number: string;
  customerId: string;
  date: string;
  status: "Draft" | "Confirmed" | "Shipped" | "Cancelled";
  lines: OrderLine[];
};

export type PurchaseOrder = {
  id: string;
  number: string;
  supplierId: string;
  date: string;
  status: "Draft" | "Ordered" | "Received" | "Cancelled";
  lines: OrderLine[];
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: "Active" | "On Leave" | "Terminated";
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "Income" | "Expense";
  amount: number;
};

export type Company = {
  name: string;
  currency: string;
  address: string;
  email: string;
};

export type ErpData = {
  company: Company;
  products: Product[];
  customers: Customer[];
  suppliers: Supplier[];
  salesOrders: SalesOrder[];
  purchaseOrders: PurchaseOrder[];
  employees: Employee[];
  transactions: Transaction[];
};

export type CollectionKey = Exclude<keyof ErpData, "company">;
