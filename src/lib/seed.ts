import type { ErpData } from "./types";

export const seedData: ErpData = {
  company: {
    name: "Acme Trading Co.",
    currency: "GBP",
    address: "120 Market Street, Springfield",
    email: "admin@acme.example",
  },
  products: [
    { id: "p1", sku: "LAP-001", name: "Business Laptop 14\"", category: "Electronics", price: 1199, cost: 860, stock: 42, reorderLevel: 10 },
    { id: "p2", sku: "MON-027", name: "27\" 4K Monitor", category: "Electronics", price: 389, cost: 255, stock: 8, reorderLevel: 12 },
    { id: "p3", sku: "CHR-110", name: "Ergonomic Office Chair", category: "Furniture", price: 299, cost: 170, stock: 25, reorderLevel: 8 },
    { id: "p4", sku: "DSK-140", name: "Standing Desk", category: "Furniture", price: 549, cost: 340, stock: 4, reorderLevel: 5 },
    { id: "p5", sku: "PAP-500", name: "A4 Paper (Box of 5)", category: "Supplies", price: 34, cost: 19, stock: 180, reorderLevel: 50 },
    { id: "p6", sku: "KBD-220", name: "Wireless Keyboard", category: "Electronics", price: 79, cost: 41, stock: 63, reorderLevel: 20 },
    { id: "p7", sku: "HDS-310", name: "Noise-Cancelling Headset", category: "Electronics", price: 149, cost: 88, stock: 17, reorderLevel: 10 },
    { id: "p8", sku: "PRN-090", name: "Laser Printer", category: "Electronics", price: 429, cost: 300, stock: 6, reorderLevel: 4 },
  ],
  customers: [
    { id: "c1", name: "Northwind Traders", email: "orders@northwind.example", phone: "555-0101", city: "Seattle", status: "Active" },
    { id: "c2", name: "Blue Harbor Logistics", email: "buy@blueharbor.example", phone: "555-0144", city: "Boston", status: "Active" },
    { id: "c3", name: "Summit Health Clinic", email: "admin@summit.example", phone: "555-0178", city: "Denver", status: "Active" },
    { id: "c4", name: "Greenleaf Schools", email: "it@greenleaf.example", phone: "555-0123", city: "Austin", status: "Inactive" },
    { id: "c5", name: "Riverside Architects", email: "office@riverside.example", phone: "555-0199", city: "Portland", status: "Active" },
  ],
  suppliers: [
    { id: "s1", name: "TechSource Distribution", contact: "Maria Lopez", email: "sales@techsource.example", phone: "555-0201", country: "USA" },
    { id: "s2", name: "Nordic Furniture AB", contact: "Erik Lund", email: "export@nordicf.example", phone: "555-0233", country: "Sweden" },
    { id: "s3", name: "OfficePlus Wholesale", contact: "Kenji Sato", email: "trade@officeplus.example", phone: "555-0256", country: "Japan" },
  ],
  salesOrders: [
    { id: "so1", number: "SO-1001", customerId: "c1", date: "2026-06-04", status: "Shipped", lines: [{ productId: "p1", quantity: 10, unitPrice: 1199 }, { productId: "p6", quantity: 10, unitPrice: 79 }] },
    { id: "so2", number: "SO-1002", customerId: "c2", date: "2026-07-12", status: "Shipped", lines: [{ productId: "p3", quantity: 15, unitPrice: 299 }] },
    { id: "so3", number: "SO-1003", customerId: "c3", date: "2026-08-21", status: "Shipped", lines: [{ productId: "p2", quantity: 12, unitPrice: 389 }, { productId: "p7", quantity: 12, unitPrice: 149 }] },
    { id: "so4", number: "SO-1004", customerId: "c5", date: "2026-09-09", status: "Shipped", lines: [{ productId: "p4", quantity: 6, unitPrice: 549 }, { productId: "p3", quantity: 6, unitPrice: 299 }] },
    { id: "so5", number: "SO-1005", customerId: "c1", date: "2026-10-15", status: "Shipped", lines: [{ productId: "p8", quantity: 5, unitPrice: 429 }, { productId: "p5", quantity: 40, unitPrice: 34 }] },
    { id: "so6", number: "SO-1006", customerId: "c2", date: "2026-11-18", status: "Confirmed", lines: [{ productId: "p1", quantity: 8, unitPrice: 1199 }] },
    { id: "so7", number: "SO-1007", customerId: "c3", date: "2026-11-24", status: "Draft", lines: [{ productId: "p7", quantity: 20, unitPrice: 149 }] },
  ],
  purchaseOrders: [
    { id: "po1", number: "PO-2001", supplierId: "s1", date: "2026-09-02", status: "Received", lines: [{ productId: "p1", quantity: 30, unitPrice: 860 }] },
    { id: "po2", number: "PO-2002", supplierId: "s2", date: "2026-10-11", status: "Received", lines: [{ productId: "p3", quantity: 20, unitPrice: 170 }] },
    { id: "po3", number: "PO-2003", supplierId: "s1", date: "2026-11-20", status: "Ordered", lines: [{ productId: "p2", quantity: 20, unitPrice: 255 }] },
  ],
  employees: [
    { id: "e1", name: "Sarah Chen", email: "sarah@acme.example", department: "Management", position: "General Manager", salary: 98000, joinDate: "2019-03-01", status: "Active" },
    { id: "e2", name: "David Okafor", email: "david@acme.example", department: "Sales", position: "Sales Lead", salary: 72000, joinDate: "2020-07-15", status: "Active" },
    { id: "e3", name: "Priya Nair", email: "priya@acme.example", department: "Finance", position: "Accountant", salary: 68000, joinDate: "2021-01-10", status: "Active" },
    { id: "e4", name: "Tom Becker", email: "tom@acme.example", department: "Warehouse", position: "Warehouse Supervisor", salary: 54000, joinDate: "2018-11-05", status: "On Leave" },
    { id: "e5", name: "Lina Haddad", email: "lina@acme.example", department: "Purchasing", position: "Buyer", salary: 58000, joinDate: "2022-05-23", status: "Active" },
    { id: "e6", name: "Marco Rossi", email: "marco@acme.example", department: "Sales", position: "Account Executive", salary: 61000, joinDate: "2023-09-12", status: "Active" },
  ],
  transactions: [
    { id: "t1", date: "2026-06-30", description: "Office rent - June", category: "Rent", type: "Expense", amount: 4500 },
    { id: "t2", date: "2026-07-31", description: "Office rent - July", category: "Rent", type: "Expense", amount: 4500 },
    { id: "t3", date: "2026-08-31", description: "Payroll - August", category: "Payroll", type: "Expense", amount: 34250 },
    { id: "t4", date: "2026-09-15", description: "Consulting services", category: "Services", type: "Income", amount: 6200 },
    { id: "t5", date: "2026-10-05", description: "Utilities", category: "Utilities", type: "Expense", amount: 890 },
    { id: "t6", date: "2026-11-03", description: "Marketing campaign", category: "Marketing", type: "Expense", amount: 2400 },
  ],
};
