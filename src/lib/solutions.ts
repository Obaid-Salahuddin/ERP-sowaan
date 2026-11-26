/**
 * SowaanERP solution pages content.
 * Structure, headings and calls to action follow https://www.sowaanerp.co.uk/ solution pages.
 * Body copy is condensed; review before publishing.
 */
import {
  Bot,
  Building,
  Calculator,
  Factory,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Package,
  ShoppingBag,
  Sprout,
  Truck,
  UserCheck,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type SolutionGroup = "Industry ERP" | "Sector & Operations" | "Business Software";

export type Section = {
  heading: string;
  body: string;
  points?: string[];
  cta?: string;
};

export type Solution = {
  slug: string;
  name: string;
  group: SolutionGroup;
  short: string;
  icon: LucideIcon;
  metaTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  sections: Section[];
  steps?: { title: string; heading: string; items: { title: string; text: string }[] };
  why: { heading: string; items: { title: string; text: string }[] };
  faqs: { q: string; a: string }[];
  closing: { heading: string; cta: string };
};

export const SOLUTION_GROUPS: SolutionGroup[] = ["Industry ERP", "Sector & Operations", "Business Software"];

export const solutions: Solution[] = [
  // ───────────────────────────── Industry ERP ─────────────────────────────
  {
    slug: "manufacturing",
    name: "Manufacturing ERP",
    group: "Industry ERP",
    short: "BOMs, production planning & shop floor",
    icon: Factory,
    metaTitle: "Manufacturing ERP Software UK",
    heroTitle: "Manufacturing ERP Software That Keeps Production on Track",
    heroSubtitle: "Do you have setbacks in production, lack of materials, and higher costs?",
    heroCta: "Request a Demo",
    sections: [
      {
        heading: "The Real Value of ERP Software for Manufacturing",
        body: "Bring production, materials, purchasing, quality and finance into one connected system so planners, buyers and managers work from the same live information instead of spreadsheets.",
      },
      {
        heading: "Manufacturing ERP System Features That Solve Operational Challenges",
        body: "Practical tools for the problems that slow manufacturers down, from material shortages to rework.",
        points: [
          "Materials and supply: inventory management, waste reduction, supplier collaboration and supply chain coordination",
          "Orders, distribution and cost: link customer orders to production schedules and track the true cost of every job",
          "Quality and compliance: quality control, quality monitoring, compliance documentation and rework reduction",
        ],
      },
      {
        heading: "Manufacturing ERP Systems UK Businesses Can Evaluate for Local Operations",
        body: "When comparing systems, check that they fit the way UK manufacturers operate.",
        points: ["Currency needs", "Reporting requirements", "Deployment needs", "UK accounting features", "UK tax features", "Integration features"],
      },
      {
        heading: "Turn Manufacturing Costs Into Clearer Profit Margins",
        body: "Track materials, labour and overheads against every production order so you can see which products and customers are genuinely profitable.",
        cta: "Gain Better Control Over Manufacturing Costs",
      },
      {
        heading: "Manufacturing ERP Benefits That Go Beyond Automation",
        body: "The benefits reach every part of the business, not just the shop floor.",
        points: [
          "Enhanced performance",
          "Stronger inventory control",
          "Better cost management",
          "Informed decision-making",
          "Quality and record management",
          "Cloud-based ERP systems for manufacturing",
        ],
      },
    ],
    why: {
      heading: "Why Choose SowaanERP for Manufacturing Companies?",
      items: [
        { title: "Connected operations", text: "Production, stock, purchasing and finance share one source of data." },
        { title: "Improve cost visibility", text: "See material and labour costs by job, product and customer." },
        { title: "Informed planning", text: "Plan production around real demand, capacity and stock levels." },
        { title: "Business workflow", text: "Configure approvals and processes around how your factory works." },
      ],
    },
    faqs: [
      { q: "What is manufacturing ERP software?", a: "It is a system that manages the core processes of a manufacturing business (bills of materials, production planning, inventory, purchasing, quality and finance) in one place." },
      { q: "Why do manufacturing companies need ERP software?", a: "Disconnected spreadsheets lead to material shortages, missed deadlines and unclear costs. ERP connects these processes so problems are spotted early." },
      { q: "How does manufacturing ERP software improve production efficiency?", a: "By planning production against real stock and capacity, automating purchase suggestions and giving supervisors live visibility of work in progress." },
      { q: "How does manufacturing ERP support Industry 4.0?", a: "A connected ERP provides the central data layer that machines, sensors and analytics tools can feed into and draw from." },
      { q: "What features should the best manufacturing ERP software include?", a: "BOM management, production planning, inventory, purchasing, quality control, costing and financial reporting, with integration options for your other systems." },
      { q: "How much does manufacturing ERP software cost in the UK?", a: "Cost depends on the modules, number of users and implementation scope. Contact SowaanERP for a quote based on your requirements." },
    ],
    closing: { heading: "Discuss Your Manufacturing Requirements with SowaanERP", cta: "Request a Demo" },
  },
  {
    slug: "retail",
    name: "Retail ERP",
    group: "Industry ERP",
    short: "POS, stores & omnichannel sales",
    icon: ShoppingBag,
    metaTitle: "Retail ERP & POS Software UK",
    heroTitle: "Retail ERP Software That Prevents Stockouts and Lost Sales",
    heroSubtitle: "Empty shelves are the cost of sales. Overstocking is a cash tie-up. Unconnected systems slow down your growth.",
    heroCta: "Book Your Retail ERP Demo",
    sections: [
      { heading: "Retail Management Software for Faster, Error-Free Checkout", body: "A point of sale connected to live stock and pricing keeps queues moving and reduces checkout mistakes.", cta: "Upgrade Your Retail Checkout" },
      { heading: "Retail ERP Systems That Keep Every Store in Sync", body: "Stock, prices and promotions update across every branch and channel from one central system.", cta: "Connect Your Retail Stores" },
      { heading: "ERP for Retail to Control Costs and Protect Profit Margins", body: "Compare sales against purchase costs, discounts and overheads to see where margin is being lost.", cta: "Improve Retail Cost Control" },
      { heading: "Retail Management System for Smarter Stock Replenishment", body: "Reorder levels and sales history help you replenish the right products before they run out, without overstocking.", cta: "Optimise Your Stock Replenishment" },
      { heading: "Retail ERP Solutions That Turn Sales Data into Better Decisions", body: "Reports on best sellers, slow movers and store performance help you decide what to stock and where.", cta: "Make Better Retail Decisions" },
      { heading: "ERP Software for Retail to Simplify Billing and Pricing", body: "Manage price lists, promotions and VAT centrally so every till charges correctly.", cta: "Simplify Retail Billing" },
      { heading: "Cloud Retail ERP for Real-Time Control Across Locations", body: "Check sales and stock for any store, from anywhere, with a cloud-based system.", cta: "Explore Cloud Retail ERP" },
      { heading: "Retail ERP System to Build Customer Loyalty and Repeat Sales", body: "Keep customer purchase history in one place to run loyalty schemes and targeted offers.", cta: "Strengthen Customer Retention" },
    ],
    why: {
      heading: "Why Choose SowaanERP for Your Retail Business?",
      items: [
        { title: "Linked operations", text: "POS, inventory, purchasing and accounts work as one system." },
        { title: "Enhanced stock control", text: "Live stock levels across stores and warehouses." },
        { title: "Margin oversight", text: "See sales alongside costs to understand profit by product and store." },
        { title: "Standardised processes", text: "Consistent pricing, returns and procedures in every branch." },
        { title: "A growth-oriented configuration", text: "Add stores, users and modules as your retail business grows." },
      ],
    },
    faqs: [
      { q: "What can SowaanERP retail software manage?", a: "Point of sale, multi-store inventory, purchasing, pricing and promotions, customers and loyalty, and financial reporting." },
      { q: "How do I choose the right retail ERP system?", a: "Look for live stock across all locations, a reliable POS, strong reporting, and the ability to grow with new stores and channels." },
      { q: "Can retail ERP manage multiple stores?", a: "Yes. Each store's stock and sales are tracked separately and consolidated centrally." },
    ],
    closing: { heading: "Discuss Your Retail Requirements", cta: "Book Your Retail ERP Demo" },
  },
  {
    slug: "distribution",
    name: "Distribution ERP",
    group: "Industry ERP",
    short: "Wholesale, warehousing & delivery",
    icon: Truck,
    metaTitle: "Distribution ERP Software for UK Wholesalers",
    heroTitle: "Distribution ERP Software That Protects Margins and Accelerates Fulfilment",
    heroSubtitle: "Move More Stock. Fulfil Orders Faster. Protect Every Margin.",
    heroCta: "Request a Distribution ERP Demo",
    sections: [
      {
        heading: "Solve Costly Distribution Challenges with ERP Software",
        body: "Distribution ERP tackles the problems that quietly eat into wholesale profits.",
        points: ["Stock imbalances that tie up capital", "Orders delayed by disconnected workflows", "Hidden costs that erode margins"],
        cta: "See How Distribution ERP Can Help",
      },
      {
        heading: "Control Every Critical Distribution Process with Wholesale Distribution ERP Software",
        body: "One system for the full order-to-cash and procure-to-pay cycle.",
        points: ["Multi-warehouse inventory management", "Procurement and supplier management", "Order and warehouse management", "Distribution finance and analytics"],
        cta: "Request a Personalised Demo",
      },
      {
        heading: "Connect Your Systems with Cloud ERP for Distribution Companies",
        body: "Integrate the tools your warehouse and sales teams already use.",
        points: ["API connections", "Barcode scanning and labels", "E-commerce and EDI", "Data synchronisation"],
        cta: "Explore Cloud ERP for Distribution",
      },
      {
        heading: "Strengthen Compliance with Distribution ERP Software",
        body: "Keep accurate, auditable records across the business.",
        points: ["VAT and financial records", "HMRC reporting support", "Role-based permissions", "Audit trails", "Data protection and UK GDPR"],
        cta: "Discuss Your ERP Requirements",
      },
      {
        heading: "Track Distribution KPIs with ERP for Wholesale Distribution",
        body: "Monitor the measures that matter: inventory turnover, order fill rate, picking accuracy, order-to-dispatch time, carrying cost and gross margin.",
      },
    ],
    steps: {
      title: "Implementation roadmap",
      heading: "Distribution ERP Implementation Roadmap: Go Live with a Controlled Transition",
      items: [
        { title: "Process and Data Discovery", text: "Map your current workflows and the data that needs to move." },
        { title: "Configuration and Integration", text: "Set up the system and connect it to your existing tools." },
        { title: "Validation and User Acceptance", text: "Test real scenarios with your team before go-live." },
        { title: "Controlled Go-Live and Stabilisation", text: "Switch over in a planned way, with support while teams settle in." },
      ],
    },
    why: {
      heading: "Why Choose SowaanERP Distribution ERP Software for Growth?",
      items: [
        { title: "Multi-warehouse visibility", text: "Know exactly what stock is where." },
        { title: "Faster fulfilment", text: "Connected order, pick and dispatch workflows." },
        { title: "Margin protection", text: "Costs and pricing tracked on every order." },
        { title: "Room to grow", text: "Add warehouses, users and channels as you expand." },
      ],
    },
    faqs: [
      { q: "What is distribution ERP software?", a: "Software that manages purchasing, inventory, warehousing, sales orders, delivery and finance for wholesale and distribution businesses." },
      { q: "Can distribution ERP software manage multiple warehouses?", a: "Yes. Stock, transfers and fulfilment can be managed across multiple warehouses from one system." },
    ],
    closing: { heading: "Book Your Distribution ERP Demo", cta: "Talk to Our ERP Team" },
  },
  {
    slug: "agriculture",
    name: "Agriculture ERP",
    group: "Industry ERP",
    short: "Crops, farms & supply chain",
    icon: Sprout,
    metaTitle: "Agriculture ERP Software UK | Farm & Livestock Management ERP",
    heroTitle: "Farm Management Software to Reduce Operating Costs and Protect Profit Margins",
    heroSubtitle: "Are rising input costs, lost resources and untracked spending reducing your farm's profit?",
    heroCta: "Take control of your farm's profitability with SowaanERP",
    sections: [
      { heading: "Agriculture ERP Software to Control Purchasing, Inventory and Supplier Costs", body: "Track seed, feed, fertiliser and other inputs from purchase to use, and compare supplier prices over time." },
      { heading: "Farm Management Software UK Businesses Need to Manage Multiple Sites", body: "Manage several farms, fields or sites in one system, with costs and stock tracked per location." },
      {
        heading: "Agricultural Software to Connect Field Operations with Finance and Payroll",
        body: "Link what happens in the field to the numbers in your accounts.",
        points: ["Record activities", "Associate transactions", "Review performance"],
      },
      { heading: "Crop Management Software to Plan Planting, Monitor Growth and Reduce Crop Loss", body: "Plan planting schedules, record treatments and monitor crop progress season by season." },
      { heading: "Field Mapping Software to Improve Land Allocation and Track Field Activities", body: "Organise land by field and record the work and inputs applied to each." },
      { heading: "Soil Analysis Software to Guide Fertiliser Use and Improve Soil Productivity", body: "Store soil test results alongside field records. Recommendations should always be confirmed by qualified agronomists and validated testing." },
      {
        heading: "Farm Management System to Track Machinery, Labour and Equipment Utilisation",
        body: "Get more from your people and machines.",
        points: ["Equipment management", "Labour allocation", "Utilisation monitoring", "Maintenance planning"],
      },
      { heading: "Farm Business Management Software to Forecast Budgets and Measure Farm Performance", body: "Set budgets, compare actual spend and measure profitability by crop, field or enterprise." },
    ],
    steps: {
      title: "Getting started",
      heading: "Agriculture Management Software from SowaanERP to Streamline Your Entire Farm Business",
      items: [
        { title: "Assess your operations", text: "Understand how your farm runs today." },
        { title: "Set up relevant modules", text: "Choose only the modules you need." },
        { title: "Link business workflows", text: "Connect field, stock and finance processes." },
        { title: "Improve management visibility", text: "Use reports to make better decisions." },
      ],
    },
    why: {
      heading: "Why Choose SowaanERP for Agriculture?",
      items: [
        { title: "Input cost control", text: "Track every purchase and its use." },
        { title: "Multi-site management", text: "All farms and fields in one place." },
        { title: "Connected finance", text: "Field activity flows into accounts and payroll." },
      ],
    },
    faqs: [
      { q: "Does your field mapping software include GIS capabilities?", a: "Talk to our team about your mapping requirements and the integrations available for your setup." },
      { q: "Can agriculture ERP manage livestock as well as crops?", a: "Contact SowaanERP to discuss how the system can be configured for mixed farming operations." },
    ],
    closing: { heading: "Contact SowaanERP to discuss your agriculture ERP requirements", cta: "Book a Demo" },
  },
  {
    slug: "healthcare",
    name: "Healthcare ERP",
    group: "Industry ERP",
    short: "Patients, appointments & billing",
    icon: HeartPulse,
    metaTitle: "Healthcare Management Software UK",
    heroTitle: "Healthcare Management Software That Reduces Operational Delays",
    heroSubtitle: "Are fragmented systems and administrative inefficiencies slowing down your healthcare services?",
    heroCta: "Request a Healthcare ERP Consultation",
    sections: [
      { heading: "Healthcare Management System That Eliminates Operational Delays", body: "Replace disconnected tools with one system for administration, resources and finance.", cta: "Streamline Your Healthcare Operations" },
      { heading: "Hospital Management Software That Controls Costs and Resources", body: "Track supplies, staffing and spending across departments." },
      { heading: "Clinic Management Software That Simplifies Daily Operations", body: "Appointments, billing and records handled in one place for busy clinics." },
      {
        heading: "Healthcare ERP Software That Connects Finance, HR and Inventory",
        body: "The back office of your organisation, connected.",
        points: ["Financial management", "HR management", "Inventory management", "Business intelligence"],
        cta: "Explore Our Healthcare ERP Solution",
      },
      { heading: "Patient Management Software That Improves Patient Flow", body: "Manage registrations, appointments and billing to reduce waiting and admin.", cta: "Improve Patient Administration" },
      { heading: "Practice Management Software That Maximises Staff Productivity", body: "Rotas, schedules and tasks organised so staff spend more time with patients." },
      { heading: "Hospital Information System That Unifies Healthcare Data", body: "Bring operational data together for reporting across the organisation.", cta: "Connect Your Healthcare Systems" },
      {
        heading: "Healthcare Administration Software That Simplifies Compliance",
        body: "Tools to support your data protection and governance obligations, including access controls and audit trails.",
        points: ["Role-based access", "Audit trails", "Information security controls"],
        cta: "Review Your Healthcare Compliance Needs",
      },
    ],
    steps: {
      title: "Our methodology",
      heading: "How Our Healthcare ERP Implementation Methodology Works",
      items: [
        { title: "Analyse Your Healthcare Workflows", text: "Understand your current processes and pain points." },
        { title: "Configure Your ERP Solution", text: "Tailor modules and workflows to your organisation." },
        { title: "Integrate and Validate Your Data", text: "Migrate and check data before go-live." },
        { title: "Deploy Through a Controlled Rollout", text: "Introduce the system in managed stages." },
        { title: "Monitor and Optimise Performance", text: "Keep improving after go-live." },
      ],
    },
    why: {
      heading: "Why Choose SowaanERP for Smarter Healthcare Software UK?",
      items: [
        { title: "Integrated business processes", text: "Finance, HR and inventory connected." },
        { title: "Adaptable workflows", text: "Configured to how your organisation works." },
        { title: "Centralised reporting", text: "One view across departments and sites." },
        { title: "Integration capabilities", text: "Connect with your existing systems." },
        { title: "Room to expand", text: "Add sites, users and modules over time." },
        { title: "Governance controls", text: "Permissions and audit trails built in." },
      ],
    },
    faqs: [
      { q: "What is healthcare ERP software?", a: "A system that connects the administrative side of healthcare (finance, HR, inventory, scheduling and billing) in one platform." },
      { q: "Is healthcare ERP suitable for small clinics?", a: "Yes. Clinics can start with the modules they need and add more as they grow." },
    ],
    closing: { heading: "Plan Your Healthcare ERP Implementation", cta: "Request a Healthcare ERP Consultation" },
  },

  // ───────────────────────────── Sector & Operations ─────────────────────────────
  {
    slug: "education",
    name: "Education ERP",
    group: "Sector & Operations",
    short: "Students, fees, timetables & exams",
    icon: GraduationCap,
    metaTitle: "Education Software UK | School Management Software",
    heroTitle: "Education Management Software That Simplifies Daily Operations",
    heroSubtitle: "Are disconnected systems slowing down your institution's growth?",
    heroCta: "Book Your SowaanERP Demo",
    sections: [
      { heading: "School Management System for Faster Admissions and Enrolments", body: "Handle applications, admissions and enrolment digitally, with student records created automatically.", cta: "Streamline Your Admissions Process with SowaanERP" },
      { heading: "School Management Software UK for Smarter Fee and Finance Control", body: "Issue fee invoices, track payments and see outstanding balances at a glance.", cta: "Improve Fee Collection and Financial Visibility" },
      { heading: "Education Management System That Connects Staff, Students and Parents", body: "Share information and updates across your school community from one system.", cta: "Connect Your Education Operations" },
      { heading: "School Administration Software to Eliminate Manual Workflows", body: "Replace paper forms and spreadsheets with digital, automated processes.", cta: "Reduce Administrative Workload with Our Education Software" },
      { heading: "Education ERP Software for Accurate Attendance and Academic Records", body: "Record attendance and keep academic records accurate and accessible.", cta: "Strengthen Attendance Tracking and Student Record Accuracy" },
      { heading: "School ERP to Streamline Exams, Grading and Student Performance", body: "Schedule exams, record grades and report on student progress.", cta: "Bring Greater Control to Examinations and Academic Reporting" },
      { heading: "University Management Software for Complex Campus Operations", body: "Support multiple faculties, departments and campuses in one platform.", cta: "Discuss Your University's Requirements" },
      { heading: "School Software That Scales with Your Institution's Growth", body: "Add students, staff, sites and modules as your institution grows.", cta: "Plan a Scalable Education Solution" },
    ],
    why: {
      heading: "Why Choose SowaanERP for Education?",
      items: [
        { title: "One connected system", text: "Admissions, fees, attendance and exams together." },
        { title: "Less admin", text: "Automated workflows free up staff time." },
        { title: "Scalable", text: "From single schools to multi-campus institutions." },
      ],
    },
    faqs: [
      { q: "What is education ERP software?", a: "A system that manages the administration of schools, colleges and universities, from admissions and fees to attendance and exams." },
      { q: "Can it handle multiple campuses?", a: "Yes. Data can be managed per campus and reported centrally." },
    ],
    closing: { heading: "Take Control of Your Institution's Operations", cta: "Book Your SowaanERP Demo" },
  },
  {
    slug: "nonprofit",
    name: "Non-profit ERP",
    group: "Sector & Operations",
    short: "Donors, grants & fund accounting",
    icon: HeartHandshake,
    metaTitle: "Charity Software UK | Nonprofit ERP",
    heroTitle: "Charity Software and ERP for UK Nonprofits and NGOs",
    heroSubtitle: "Are you keeping tabs on funding, dealing with limited budgets, or wasting time on tedious reports?",
    heroCta: "Book Your Charity ERP Consultation",
    sections: [
      {
        heading: "What Is ERP Software for Charities and Nonprofits?",
        body: "A single system for the financial and operational information a charity depends on.",
        points: ["Manage financial and operational information", "Monitor the use of restricted resources", "Track budgets and programme spend", "Prepare trustee and funder reports"],
      },
      {
        heading: "One Charity Management System for Donors, Finance and Operations",
        body: "Bring donors, funding and spending together.",
        points: ["Donor and funding records", "Linked budgets and spend", "Shared reporting", "Greater transparency"],
      },
      { heading: "Donor and Supporter Management", body: "Keep supporter records, donation history and communications in one place." },
      {
        heading: "Financial Management for Donations, Grants and Budgets",
        body: "Fund accounting built for charities.",
        points: ["Fund and cost-centre tracking", "Budget allocation", "Reconciliation", "Trustee and management reporting"],
        cta: "Improve Charity Financial Control",
      },
      { heading: "Grant, Programme and Project Tracking", body: "Track each grant's budget, spend and outcomes against funder requirements." },
      {
        heading: "Volunteer and Membership Management",
        body: "Organise the people who power your charity.",
        points: ["Volunteer and member records", "Assignments", "Renewals", "Workforce reporting"],
      },
      { heading: "Audit-Ready Reporting and Transparency", body: "Clear records and audit trails make year-end and funder reporting simpler." },
      {
        heading: "NGO Management Software for Charities, Foundations and Associations",
        body: "Suitable for many types of not-for-profit organisation.",
        points: ["Charities", "Foundations", "Associations", "NGOs"],
      },
    ],
    why: {
      heading: "Why Choose SowaanERP for Charity Software?",
      items: [
        { title: "Integrated operations", text: "Donors, finance and programmes connected." },
        { title: "Visible funding", text: "See restricted and unrestricted funds clearly." },
        { title: "Accountability and control", text: "Approvals, permissions and audit trails." },
        { title: "Flexible operations", text: "Configured to how your organisation works." },
        { title: "Informed decisions", text: "Reports for trustees, funders and managers." },
      ],
    },
    faqs: [
      { q: "What is charity software?", a: "Software that helps charities manage donors, funds, grants, volunteers and finances in one place." },
      { q: "Does charity software used by UK organisations need to support Gift Aid?", a: "Many UK charities claim Gift Aid, so it is worth checking how any system records eligible donations. Speak to our team about your requirements." },
    ],
    closing: { heading: "Select the Right Charity Management Software", cta: "Book Your Charity ERP Consultation" },
  },
  {
    slug: "restaurant-pos-software",
    name: "Restaurant POS",
    group: "Sector & Operations",
    short: "Orders, tables, kitchen & delivery",
    icon: UtensilsCrossed,
    metaTitle: "Restaurant POS Software UK",
    heroTitle: "Restaurant POS Software That Speeds Up Every Order",
    heroSubtitle: "Stop losing time and revenue to slow order processing, billing mistakes and disconnected restaurant operations.",
    heroCta: "Streamline Your Restaurant Operations",
    sections: [
      {
        heading: "POS System for Restaurants That Eliminates Billing Errors",
        body: "Accurate bills, every time.",
        points: ["Itemised bills", "Cash, card and other payments", "Complete sales records", "Less manual reconciliation"],
      },
      { heading: "Restaurant POS System for Faster Kitchen Coordination", body: "Orders go straight from the till to the kitchen, reducing mistakes and wait times.", cta: "Accelerate Order-to-Kitchen Workflows" },
      { heading: "Restaurant POS Systems That Keep Stock and Sales in Sync", body: "Ingredients are deducted as dishes are sold, so you always know what's running low.", cta: "Connect Restaurant Sales with Inventory Control" },
      { heading: "Restaurant EPOS That Simplifies Payments and Checkout", body: "Split bills, take payments quickly and close tables faster.", cta: "Optimise Your Restaurant Checkout Process" },
      { heading: "Restaurant Point of Sale Software for Dine-In and Takeaway", body: "Handle table service, takeaway and delivery orders from one system." },
      { heading: "Restaurant Billing Software That Improves Sales Accuracy", body: "Consistent pricing, discounts and tax on every order." },
      { heading: "Restaurant POS Systems UK for Multi-Location Control", body: "Manage menus, prices and performance across all your sites centrally.", cta: "Bring Your Restaurant Locations Under Centralised Control" },
      {
        heading: "POS System for Restaurant That Scales With Growth",
        body: "Start with POS and add more as you grow.",
        points: ["POS and billing", "Inventory", "Accounting", "HR and payroll"],
      },
    ],
    why: {
      heading: "Why Choose SowaanERP Restaurant POS Software UK?",
      items: [
        { title: "Operational visibility", text: "Live sales and stock across sites." },
        { title: "Better financial control", text: "Sales flow straight into your accounts." },
        { title: "Service efficiency", text: "Faster orders and checkout." },
        { title: "Flexible operations", text: "Dine-in, takeaway and delivery." },
        { title: "Connected management", text: "POS, stock, finance and staff together." },
      ],
    },
    faqs: [
      { q: "Does the POS work for takeaway and delivery?", a: "Yes. Dine-in, takeaway and delivery orders can all be managed from the same system." },
      { q: "Can I manage more than one restaurant?", a: "Yes. Menus, prices, stock and reports can be managed centrally across locations." },
    ],
    closing: { heading: "Ready to talk about your restaurant?", cta: "Streamline Your Restaurant Operations" },
  },
  {
    slug: "facilities-management",
    name: "Facility Management",
    group: "Sector & Operations",
    short: "Assets, maintenance & work orders",
    icon: Building,
    metaTitle: "Facilities Management Software UK",
    heroTitle: "Facilities Management Software That Eliminates Operational Delays and Service Gaps",
    heroSubtitle: "Are maintenance delays and inefficient facility operations slowing your business down?",
    heroCta: "Book a Demo",
    sections: [
      { heading: "Manage Every Property, Asset and Maintenance Task Through One Facility Management System", body: "Keep a single register of your properties, assets and maintenance history." },
      { heading: "Prevent Costly Equipment Failures with Proactive Facilities Management Software", body: "Schedule planned maintenance so equipment is serviced before it breaks down." },
      {
        heading: "Take Control of Work Orders, Repairs and Contractor Performance",
        body: "A clear process from request to completion.",
        points: ["Record", "Assign", "Track", "Review", "Monitor contractors"],
      },
      { heading: "Building Facility Management Software to Improve Space Utilisation and Resource Planning", body: "Understand how space and resources are used to plan more effectively." },
      { heading: "Track Maintenance Costs and Budgets with a Facilities Management System", body: "Compare maintenance spending against budget by site, asset or contractor." },
      { heading: "Connect Teams, Locations and Facility Operations with Cloud Based Facility Management Software", body: "Teams on every site work from the same up-to-date information." },
      { heading: "Gain Complete Operational Visibility with Enterprise Facility Management Software", body: "Dashboards and reports across your entire estate." },
      { heading: "Scale Your Operations with Facilities Management Software UK Businesses Can Rely On", body: "Add sites, assets and users as your portfolio grows." },
    ],
    why: {
      heading: "Why Choose SowaanERP for Smarter Facilities Management?",
      items: [
        { title: "Integrated management", text: "Assets, maintenance and finance connected." },
        { title: "Flexible configuration", text: "Set up around your processes." },
        { title: "Cloud accessibility", text: "Access from any site or device." },
        { title: "Centralised reporting", text: "One view across every location." },
        { title: "Implementation support", text: "Guidance from setup to go-live." },
        { title: "Continuous support", text: "Help whenever you need it." },
      ],
    },
    faqs: [
      { q: "What is facilities management software?", a: "Software that manages buildings, assets, maintenance and work orders, helping keep facilities safe and running efficiently." },
      { q: "Can I track contractor performance?", a: "Yes. Work orders record who did the work, when, and at what cost." },
    ],
    closing: { heading: "Ready to improve your facility management?", cta: "Book a Demo" },
  },
  {
    slug: "visitor-management-software",
    name: "Visitor Management",
    group: "Sector & Operations",
    short: "Check-ins, passes & front desk",
    icon: UserCheck,
    metaTitle: "Visitor Management System UK",
    heroTitle: "Visitor Management System UK That Stops Unauthorised Access Before It Happens",
    heroSubtitle: "Can your reception confirm every visitor before they enter your workplace?",
    heroCta: "Strengthen your entry management with SowaanERP",
    sections: [
      { heading: "Replace Reception Bottlenecks with Smarter Visitor Management Software", body: "Digital sign-in keeps reception moving and records every visit.", cta: "Make Reception More Efficient" },
      { heading: "Visitor Sign In Software That Makes Every Check-In Faster and Easier", body: "Pre-registration and quick check-in reduce waiting at the front desk." },
      { heading: "Track Every Entry and Exit with a Centralised Visitor Management System", body: "Keep every visit documented and accessible through one centralised system." },
      {
        heading: "Visitor Management Solutions That Strengthen Workplace Security and Compliance",
        body: "Know who is on site at all times.",
        points: ["Visitor verification", "Controlled approvals", "Record management"],
      },
      { heading: "Automate Visitor Approvals, Appointment Scheduling and Reception Notifications", body: "Hosts are notified automatically and approvals happen without phone calls.", cta: "Simplify the management of visitors in your business" },
      { heading: "Visitor Management Software UK That Adapts to Multiple Sites and Industries", body: "Use one system across offices, factories, schools and healthcare sites." },
      { heading: "Get Complete Visibility into Visitor Activity with Real Time Reports", body: "See who is on site now and review visitor history at any time." },
      { heading: "Understand Visitor Management System Cost and Choose the Right Solution for Your Business", body: "Pricing depends on your sites and requirements.", cta: "Request a consultation to discuss your needs" },
    ],
    steps: {
      title: "How it works",
      heading: "How Our Digital Sign-In Process Works",
      items: [
        { title: "Visitor registration", text: "Visitors register in advance or on arrival." },
        { title: "Host identification", text: "The visitor selects who they are meeting." },
        { title: "Arrival confirmation", text: "Reception confirms and checks the visitor in." },
        { title: "Employee notification", text: "The host is notified automatically." },
        { title: "Departure recording", text: "Sign-out is recorded when the visitor leaves." },
      ],
    },
    why: {
      heading: "Why Choose SowaanERP as Your Visitor Management Solution in the UK?",
      items: [
        { title: "Centralised visitor administration", text: "All visits in one system." },
        { title: "Structured access workflows", text: "Approvals before entry." },
        { title: "Improved departmental coordination", text: "Hosts and reception stay in sync." },
        { title: "Multi-location visibility", text: "Every site in one view." },
        { title: "Operational reporting", text: "Visitor history and trends." },
        { title: "Business-aligned configuration", text: "Set up around your policies." },
      ],
    },
    faqs: [
      { q: "What is a visitor management system?", a: "A digital system that registers, checks in and records visitors, replacing paper sign-in books." },
      { q: "Can it work across multiple sites?", a: "Yes. Each site can have its own reception while visit records are reported centrally." },
    ],
    closing: { heading: "Strengthen Your Entry Management", cta: "Book a Demo" },
  },

  // ───────────────────────────── Business Software ─────────────────────────────
  {
    slug: "inventory-management-software",
    name: "Inventory Management",
    group: "Business Software",
    short: "Real-time stock across locations",
    icon: Package,
    metaTitle: "Inventory Management Software UK",
    heroTitle: "Inventory Management Software to Prevent Stockouts and Overstocking",
    heroSubtitle: "Is there excess inventory or are there stock shortages that are delaying orders?",
    heroCta: "Discuss your stock management requirements",
    sections: [
      {
        heading: "Inventory Management System for Faster Order Fulfilment",
        body: "Get orders out of the door quickly and accurately.",
        points: ["Faster order processing", "Fewer fulfilment errors", "Optimised warehouse coordination"],
        cta: "Speak to our team about your warehouse workflow",
      },
      { heading: "ERP Inventory Management Software for Connected Business Operations", body: "Stock is linked to sales, purchasing and accounts, so every team sees the same numbers." },
      { heading: "Cloud Inventory Management Software for Centralised Stock Control", body: "Manage stock for every location from anywhere.", cta: "Talk to SowaanERP about your cloud inventory needs" },
      { heading: "Real Time Inventory Management Software for Accurate Stock Visibility", body: "Stock levels update instantly as items are sold, received or moved.", cta: "Explore real-time inventory capabilities" },
      { heading: "Multi Location Inventory Management Software for Seamless Stock Transfers", body: "Move stock between warehouses and stores with full traceability.", cta: "Discuss your multi-warehouse requirements" },
      { heading: "Inventory Control System to Reduce Waste and Protect Profit Margins", body: "Reorder levels and stock reports help reduce dead stock, expiry and waste." },
      { heading: "Inventory Tracking Software for Complete Stock Traceability", body: "Follow items from supplier to customer with batch and serial tracking.", cta: "Discuss Your Tracking Needs" },
      { heading: "Inventory Reporting Software to Improve Purchasing Decisions", body: "Turn inventory data into better buying decisions.", cta: "Request a SowaanERP demonstration" },
    ],
    why: {
      heading: "Why Choose SowaanERP for Inventory Management?",
      items: [
        { title: "Real-time stock", text: "Always-accurate stock levels." },
        { title: "Multi-location", text: "Warehouses and stores in one system." },
        { title: "Connected", text: "Linked to sales, purchasing and finance." },
        { title: "Scalable", text: "Grows with your product range." },
      ],
    },
    faqs: [
      { q: "What is inventory management software?", a: "Software that tracks stock levels, movements and valuation across your business." },
      { q: "Can it manage multiple warehouses?", a: "Yes. Stock can be tracked and transferred across multiple locations." },
    ],
    closing: { heading: "Call SowaanERP to enhance your inventory management", cta: "Book a Demo" },
  },
  {
    slug: "accounting-erp-software",
    name: "Accounting Software",
    group: "Business Software",
    short: "Ledgers, VAT & financial reports",
    icon: Calculator,
    metaTitle: "ERP Accounting Software UK",
    heroTitle: "Control Financial Errors with ERP Accounting Software",
    heroSubtitle: "Master your finances with ERP accounting software. Control accounting, inventory, supply chain and cash flow with one software program.",
    heroCta: "Book Your ERP Demo",
    sections: [
      {
        heading: "Eliminate Costly Errors with an ERP Accounting System",
        body: "When finance is connected to the rest of the business, there's less re-keying and fewer mistakes.",
        points: ["Minimise reconciliation errors", "Gain better control over cash flow", "Protect profitability"],
      },
      {
        heading: "Accelerate Financial Operations with Accounting ERP Software",
        body: "Speed up the finance work your team does every day.",
        points: ["Automated financial reporting", "Cash flow and financial management", "Inventory cost and valuation control", "Multi-department financial oversight"],
        cta: "Explore Our Accounting Capabilities",
      },
      { heading: "Automate Reporting with Accounting and Financial Management Software", body: "Profit and loss, balance sheet and management reports generated from live data.", cta: "Simplify Financial Reporting" },
      {
        heading: "Strengthen Financial Compliance with Integrated Accounting Software",
        body: "Controls that support good financial governance.",
        points: ["UK VAT workflows", "Financial auditability", "Access governance", "Digital tax workflows", "Data protection", "Financial governance"],
      },
      {
        heading: "Turn Business Accounting Software into Measurable Results",
        body: "Spend less time on admin and more on decisions.",
        points: ["Reduce financial administration", "Enhance cash flow visibility", "Strengthen financial decision-making"],
      },
    ],
    steps: {
      title: "Implementation",
      heading: "Implement Your Financial Management System with Minimal Disruption",
      items: [
        { title: "Assess Your Current Setup", text: "Review your chart of accounts and processes." },
        { title: "Configure Your ERP", text: "Set up ledgers, tax and reporting." },
        { title: "Validate Every Workflow", text: "Test with real transactions." },
        { title: "Launch with Confidence", text: "Go live with support from our team." },
      ],
    },
    why: {
      heading: "Choose SowaanERP to Take Control of Your Finances",
      items: [
        { title: "Connected finance", text: "Sales, purchasing and stock post straight to your ledgers." },
        { title: "Live reporting", text: "Up-to-date financial reports at any time." },
        { title: "Strong controls", text: "Permissions, approvals and audit trails." },
      ],
    },
    faqs: [
      { q: "What is ERP accounting software?", a: "Accounting software that is part of a wider ERP, so finance is connected to sales, purchasing, inventory and HR." },
      { q: "Does it support UK VAT?", a: "The system supports VAT workflows. Speak to our team about your specific VAT and reporting needs." },
    ],
    closing: { heading: "Take Control of Your Finances", cta: "Request Your Personalised Demo" },
  },
  {
    slug: "hr-software",
    name: "HR Software",
    group: "Business Software",
    short: "Payroll, attendance & leave",
    icon: Users,
    metaTitle: "HR Software UK | HR & Payroll Software",
    heroTitle: "HR Software UK That Replaces Manual Employee Administration",
    heroSubtitle: "Are spreadsheets, scattered employee records and manual approvals slowing down your HR team?",
    heroCta: "Book Your HR Software Demo",
    sections: [
      { heading: "HR and Payroll Software for Accurate, On-Time Salary Processing", body: "Attendance, leave and pay data come together for accurate payroll runs.", cta: "Streamline Your Payroll Operations" },
      { heading: "HR Management Software That Keeps Employee Records Under Control", body: "One secure place for every employee record and document.", cta: "Bring Your Employee Records into One System" },
      { heading: "HR Payroll Software That Simplifies UK Payroll Compliance", body: "Supports PAYE, National Insurance and workplace pension processes. Statutory calculations depend on your setup and payroll provider.", cta: "Strengthen Payroll Accuracy and Control" },
      { heading: "Cloud Based HR Software for Connected, Multi Location Teams", body: "Manage staff across every site from one cloud system.", cta: "Connect Your Workforce Across Locations" },
      { heading: "Human Resource Management Software That Speeds Up Onboarding and Leave Approvals", body: "Digital onboarding and approval workflows replace emails and paper forms." },
      { heading: "Best HR Software UK Businesses Can Scale Without Operational Bottlenecks", body: "Grow your workforce without growing your admin.", cta: "Find the Right HR Setup for Your Business" },
      { heading: "HR Cloud Software That Gives Employees More Control Over Daily HR Tasks", body: "Self-service for leave requests, personal details and payslips.", cta: "Empower Employees With Digital HR Workflows" },
      { heading: "HR Reporting Software for Faster, Data-Driven Workforce Decisions", body: "Headcount, absence and cost reports at your fingertips.", cta: "Improve Workforce Visibility With HR Reporting" },
    ],
    steps: {
      title: "45-minute demo",
      heading: "Book an HR Software Demo to See How SowaanERP Fits Your Business",
      items: [
        { title: "Challenges and priorities", text: "We start with what matters to your HR team." },
        { title: "Employee records and access", text: "See how records and permissions work." },
        { title: "Leave, attendance and approvals", text: "Walk through day-to-day workflows." },
        { title: "Reporting and next steps", text: "Review reports and plan your next steps." },
      ],
    },
    why: {
      heading: "Why Choose SowaanERP HR Software?",
      items: [
        { title: "All-in-one", text: "HR, payroll, attendance and leave together." },
        { title: "Self-service", text: "Employees handle routine tasks themselves." },
        { title: "Connected", text: "Payroll flows into your accounts." },
      ],
    },
    faqs: [
      { q: "What does HR software do?", a: "It manages employee records, attendance, leave, onboarding and payroll in one system." },
      { q: "Can employees request leave themselves?", a: "Yes. Employees submit requests and managers approve them digitally." },
    ],
    closing: { heading: "See How SowaanERP Fits Your Business", cta: "Book Your SowaanERP HR Software Demo" },
  },
  {
    slug: "ai-productivity",
    name: "AI Productivity",
    group: "Business Software",
    short: "AI assistants, automation & insights",
    icon: Bot,
    metaTitle: "AI Tools for Business Productivity",
    heroTitle: "AI Tools for Business Productivity That Save Time",
    heroSubtitle: "Are siloed systems, repetitive work and manual reporting slowing your business down?",
    heroCta: "Book a Demo",
    sections: [
      { heading: "ERP Automation Software That Eliminates Manual Work", body: "Automate repetitive tasks such as data entry, approvals and notifications." },
      {
        heading: "Business Process Automation Software for Fewer Errors",
        body: "Automated processes are consistent and traceable.",
        points: ["Record", "Share", "Keep consistent", "Give visibility", "Report"],
      },
      { heading: "AI Workflow Automation UK Businesses Need to Scale Faster", body: "Handle more work without adding headcount." },
      { heading: "AI Workflow Automation Software for Smoother Operations", body: "Workflows move between teams automatically, without chasing." },
      { heading: "AI Automation for Small Business Without Extra Costs", body: "Automation built into the ERP you already use, with no separate tools to buy." },
      { heading: "AI ERP Software for Smarter Business Decisions", body: "AI-assisted insights highlight trends and exceptions in your data." },
      { heading: "AI Productivity Tools That Improve Team Efficiency", body: "Assistants that help teams find information and complete tasks faster." },
      { heading: "AI Automation Software That Connects Business Operations", body: "Automation that works across sales, stock, finance and HR." },
    ],
    why: {
      heading: "Why Choose SowaanERP for AI Productivity Solutions?",
      items: [
        { title: "Integrated systems", text: "AI works on your connected ERP data." },
        { title: "Workflow flexibility", text: "Automate the processes that matter to you." },
        { title: "Cloud access", text: "Available wherever your team works." },
        { title: "AI insights", text: "Spot trends and issues sooner." },
      ],
    },
    faqs: [
      { q: "What can AI automate in an ERP?", a: "Routine tasks like data entry, approvals, notifications and report generation, plus insights that highlight trends in your data." },
      { q: "Do I need technical skills to use it?", a: "No. Automations are configured with our team around your existing workflows." },
    ],
    closing: { heading: "Find the Right Approach for Your Business", cta: "Book a Demo" },
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
