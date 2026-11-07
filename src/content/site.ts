/**
 * All editable copy for the Pixel Nest Labs site lives in this file.
 * Change text here; the components read from it. Anything wrapped in
 * [square brackets] is a placeholder the founders should replace.
 */

export const site = {
  name: "Pixel Nest Labs",
  tagline: "We build digital products, pixel by pixel.",
  description:
    "Pixel Nest Labs is a small studio that builds websites, online stores, CRMs, AI tools and custom management software for growing businesses.",
  email: "[hello@yourdomain.com]",
  phone: "[+91 00000 00000]",
  location: "[City, Country]",
  // Replace with your Cal.com / Calendly link. Leave "" to hide the booking button.
  bookingUrl: "https://cal.com/[your-handle]",
  // WhatsApp number in international format without "+" or spaces, e.g. "919876543210". Leave "" to hide.
  whatsapp: "",
  socials: {
    instagram: "https://instagram.com/[your-handle]",
    linkedin: "https://linkedin.com/company/[your-company]",
    github: "https://github.com/[your-org]",
  },
};

/** A setting counts as filled in once it's non-empty and has no [placeholder] brackets. */
const isFilled = (value: string) => Boolean(value) && !/[[\]]/.test(value);

/**
 * The contact details the site actually shows. Anything still a placeholder is left
 * out, so the live site never links to "[hello@yourdomain.com]" or a broken booking page.
 */
export const contact = {
  email: isFilled(site.email) ? site.email : "",
  phone: isFilled(site.phone) ? site.phone : "",
  location: isFilled(site.location) ? site.location : "",
  bookingUrl: isFilled(site.bookingUrl) ? site.bookingUrl : "",
  whatsapp: isFilled(site.whatsapp) ? site.whatsapp : "",
  socials: (Object.entries(site.socials) as [keyof typeof site.socials, string][]).filter(([, url]) => isFilled(url)),
};

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Lab", href: "/#lab" },
  { label: "About", href: "/#about" },
  { label: "Products", href: "/products" },
];

export const hero = {
  eyebrow: "Design · Development · AI",
  title: "We build digital products, pixel by pixel.",
  subtitle:
    "From your first Instagram grid to a full CRM, Pixel Nest Labs designs and builds the digital pieces a growing business needs.",
  // Words that rotate after "We make" under the headline.
  rotating: ["websites", "Shopify stores", "CRMs", "AI tools", "custom software"],
  primaryCta: { label: "Explore services", href: "/#services" },
  secondaryCta: { label: "Talk to us", href: "#contact" },
};

export type Service = {
  slug: string;
  title: string;
  icon: "megaphone" | "shopping" | "cloud" | "brain" | "coffee";
  summary: string;
  included: string[];
  tech: string[];
  /** Photo for the service panel, e.g. "/images/services/digital-presence.jpg". Leave "" for the built-in artwork. */
  image: string;
};

export const services: Service[] = [
  {
    slug: "digital-presence",
    title: "Digital Presence",
    icon: "megaphone",
    summary:
      "Look credible everywhere customers find you, with an Instagram presence, landing pages and product catalogues that match your brand.",
    included: [
      "Instagram profile setup and post templates",
      "Landing pages that load fast",
      "Digital and print-ready catalogues",
      "Basic SEO and Google Business profile",
    ],
    tech: ["Figma", "Next.js", "Canva", "Google Business"],
    image: "",
  },
  {
    slug: "web-commerce",
    title: "Web & E-commerce",
    icon: "shopping",
    summary: "Custom web apps on the MERN stack and Shopify stores that are easy for you to run day to day.",
    included: [
      "MERN web applications and dashboards",
      "Shopify store setup and theme customisation",
      "Payments, shipping and inventory integration",
      "Performance and accessibility checks",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Shopify", "Liquid"],
    image: "",
  },
  {
    slug: "crm-salesforce",
    title: "CRM & Salesforce",
    icon: "cloud",
    summary: "Track leads, customers and follow-ups in one place, on Salesforce or as a lightweight custom CRM.",
    included: [
      "Salesforce setup and customisation",
      "Apex, Flows and Lightning components",
      "Data migration from spreadsheets",
      "Custom CRM for smaller teams",
    ],
    tech: ["Salesforce", "Apex", "LWC", "Flows", "REST APIs"],
    image: "",
  },
  {
    slug: "ai-data",
    title: "AI / ML & Data Science",
    icon: "brain",
    summary: "Put your data to work with dashboards, forecasting and AI assistants built around your real workflows.",
    included: [
      "Data cleaning and analysis",
      "Dashboards and reporting",
      "Prediction and classification models",
      "AI chat assistants on your own documents",
    ],
    tech: ["Python", "Pandas", "scikit-learn", "LLM APIs", "Power BI"],
    image: "",
  },
  {
    slug: "java-enterprise",
    title: "Java & Enterprise",
    icon: "coffee",
    summary: "Reliable back-end services and integrations for systems that need to scale and stay maintainable.",
    included: [
      "Spring Boot REST services",
      "System integrations and APIs",
      "Database design and optimisation",
      "Code reviews and modernisation",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "PostgreSQL", "Docker"],
    image: "",
  },
];

export const whyUs = [
  {
    title: "Founders on every project",
    text: "You work directly with the people who design and write the code. No hand-offs.",
  },
  {
    title: "Clear scope and pricing",
    text: "We agree what will be built and what it costs before work starts.",
  },
  {
    title: "Built to be handed over",
    text: "Clean code and short guides, so your team can keep running it.",
  },
  {
    title: "One partner, full stack",
    text: "Branding, web, CRM and AI under one roof, so the pieces fit together.",
  },
];

// Steps in "How we work". `gets` is what you have at the end of the step.
// `image`: optional photo for the step (shown in black and white). Leave "" for the built-in icon.
export const process = [
  {
    title: "Discover",
    text: "A free call to understand your business, goals and budget.",
    gets: "A written scope and a fixed quote",
    image: "",
  },
  {
    title: "Design",
    text: "Wireframes and visual designs you can review before any code.",
    gets: "Designs you can click through and comment on",
    image: "",
  },
  {
    title: "Build",
    text: "Short build cycles with a preview link you can try every week.",
    gets: "A preview link that updates every week",
    image: "",
  },
  {
    title: "Launch",
    text: "Testing, deployment and a walkthrough for your team.",
    gets: "Your project live, plus a walkthrough for your team",
    image: "",
  },
  {
    title: "Support",
    text: "Fixes, improvements and monthly care plans if you need them.",
    gets: "Fixes and improvements, monthly if you like",
    image: "",
  },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Shopify",
  "Liquid",
  "Salesforce",
  "Apex",
  "Python",
  "TensorFlow",
  "Pandas",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "Figma",
  "Vercel",
];

export type Product = {
  slug: string;
  name: string;
  icon: "microscope" | "users" | "utensils" | "graduation";
  summary: string;
  audience: string;
  features: string[];
  /** Screenshot or photo for the product, e.g. "/images/products/path-lab.jpg". "" shows the built-in artwork. */
  image: string;
};

export const products: Product[] = [
  {
    slug: "path-lab",
    name: "Path Lab Manager",
    icon: "microscope",
    summary: "Patient registration, test orders, sample tracking and reports for pathology labs.",
    audience: "Pathology labs and diagnostic centres",
    features: [
      "Patient and test registration",
      "Sample tracking with barcodes",
      "Report templates and PDF delivery",
      "Billing and daily summaries",
    ],
    image: "",
  },
  {
    slug: "crm",
    name: "Simple CRM",
    icon: "users",
    summary: "Leads, follow-ups and customer history for small sales teams, without the clutter.",
    audience: "Small businesses and sales teams",
    features: [
      "Lead pipeline board",
      "Follow-up reminders",
      "Customer notes and history",
      "WhatsApp and email templates",
    ],
    image: "",
  },
  {
    slug: "restaurant",
    name: "Restaurant Manager",
    icon: "utensils",
    summary: "Orders, tables, menu and kitchen tickets for restaurants and cafés.",
    audience: "Restaurants, cafés and cloud kitchens",
    features: [
      "Table and takeaway orders",
      "Kitchen order tickets",
      "Menu and pricing management",
      "Daily sales reports",
    ],
    image: "",
  },
  {
    slug: "admission",
    name: "Admission Manager",
    icon: "graduation",
    summary: "Enquiries, applications, documents and fee tracking for schools and institutes.",
    audience: "Schools, colleges and coaching institutes",
    features: ["Enquiry and application forms", "Document collection", "Admission status tracking", "Fee receipts"],
    image: "",
  },
];

export const plans = [
  {
    name: "Starter",
    text: "One product for a single location or small team.",
    points: ["Core features", "Email support", "Monthly updates"],
  },
  {
    name: "Growth",
    text: "More users, more locations and integrations.",
    points: ["Everything in Starter", "Multiple users and branches", "WhatsApp and SMS alerts"],
  },
  {
    name: "Pro",
    text: "Customisation and priority help for larger teams.",
    points: ["Everything in Growth", "Custom fields and reports", "Priority support"],
  },
];

export type LabProject = {
  title: string;
  label: "Demo" | "Concept";
  summary: string;
  // Two short points shown on the card.
  highlights: string[];
  tech: string[];
  // Which animated preview to show: storefront, calendar, forecast or flow.
  preview: "storefront" | "calendar" | "forecast" | "flow";
  // Optional links. Leave "" until the demo is live.
  liveUrl: string;
  githubUrl: string;
};

// These are the studio's own demo and concept builds, not client work.
export const labProjects: LabProject[] = [
  {
    title: "Café storefront on Shopify",
    label: "Demo",
    summary: "A Shopify theme for a small coffee brand with subscriptions and a fast product page.",
    highlights: ["Subscribe-and-save checkout", "Product page tuned for speed"],
    tech: ["Shopify", "Liquid", "JavaScript"],
    preview: "storefront",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Clinic appointment dashboard",
    label: "Demo",
    summary: "A MERN dashboard for booking, rescheduling and reminding patients about appointments.",
    highlights: ["Drag-to-reschedule calendar", "Automatic SMS and WhatsApp reminders"],
    tech: ["React", "Node.js", "MongoDB"],
    preview: "calendar",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Sales forecast assistant",
    label: "Concept",
    summary: "A data notebook and chat assistant that answers questions about monthly sales trends.",
    highlights: ["Monthly trend and forecast charts", "Ask questions in plain English"],
    tech: ["Python", "Pandas", "LLM API"],
    preview: "forecast",
    liveUrl: "",
    githubUrl: "",
  },
  {
    title: "Lead-to-cash on Salesforce",
    label: "Concept",
    summary: "A Salesforce flow that turns web enquiries into opportunities, quotes and invoices.",
    highlights: ["Web form to opportunity in one step", "Quote and invoice created automatically"],
    tech: ["Salesforce", "Flows", "Apex"],
    preview: "flow",
    liveUrl: "",
    githubUrl: "",
  },
];

export const about = {
  title: "Two founders, one small lab.",
  story:
    "[Write your story here: how the two of you met, why you started Pixel Nest Labs, and the kind of businesses you want to help.]",
  mission: "[One line on what you do for your clients.]",
  vision: "[One line on where you want the studio to go.]",
  // Photo of the two of you together for the tall tile, e.g. "/images/about/team.jpg". "" shows the built-in artwork.
  teamImage: "",
  // Keep this honest: use real numbers or leave the placeholder.
  experienceStrip: ["2 founders", "[X]+ years combined experience", "5 service areas", "4 products in development"],
  founders: [
    {
      name: "[Founder name]",
      role: "Co-founder · [Role]",
      bio: "[Short bio: what you work on and what you enjoy building.]",
      skills: ["[Skill]", "[Skill]", "[Skill]"],
      linkedin: "",
      // Portrait, e.g. "/images/about/founder-1.jpg". Shown in black and white with a colour block.
      image: "",
    },
    {
      name: "[Founder name]",
      role: "Co-founder · [Role]",
      bio: "[Short bio: what you work on and what you enjoy building.]",
      skills: ["[Skill]", "[Skill]", "[Skill]"],
      linkedin: "",
      // Portrait, e.g. "/images/about/founder-1.jpg". Shown in black and white with a colour block.
      image: "",
    },
  ],
};

/**
 * Cards in the curved strip of the closing "Let's build it" section.
 * Each card shows `image` when you add one (e.g. "/images/gallery/shop.jpg");
 * until then it shows `label` on a brand-coloured tile.
 */
export const ctaGallery = [
  { label: "Websites", image: "", alt: "" },
  { label: "Shopify stores", image: "", alt: "" },
  { label: "CRMs", image: "", alt: "" },
  { label: "AI tools", image: "", alt: "" },
  { label: "Dashboards", image: "", alt: "" },
  { label: "Catalogues", image: "", alt: "" },
  { label: "Instagram grids", image: "", alt: "" },
  { label: "Custom software", image: "", alt: "" },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope. After a free discovery call we send a fixed quote, so you know the price before we start.",
  },
  {
    q: "How long does a website take?",
    a: "A landing page usually takes one to two weeks. Larger web apps and stores are planned in milestones you can review.",
  },
  {
    q: "Do you work with businesses outside my city?",
    a: "Yes. We work remotely and keep in touch over calls, WhatsApp and a shared project board.",
  },
  {
    q: "Can you take over an existing website or Salesforce org?",
    a: "Yes. We start with a short review and tell you what we recommend keeping, fixing or rebuilding.",
  },
  {
    q: "Are the products ready to use?",
    a: "Not yet. They are in development. Join the waitlist and we will contact you when early access opens.",
  },
];

export const contactServiceOptions = [
  ...services.map((s) => s.title),
  "A product (Path Lab, CRM, Restaurant, Admission)",
  "Not sure yet",
];

export const budgetOptions = ["Not sure yet", "Under ₹50k", "₹50k – ₹2L", "₹2L – ₹5L", "₹5L+"];

export const waitlistProductOptions = [...products.map((p) => p.name), "More than one"];

export const businessTypes = [
  "Pathology lab",
  "Clinic / hospital",
  "Restaurant / café",
  "School / institute",
  "Retail / e-commerce",
  "Other",
];
