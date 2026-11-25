export type ServiceItem = {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  intro: string;
  deliverables: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const servicePagesData: Record<string, ServiceItem> = {
  "web-development": {
    slug: "web-development",
    name: "Website Development & Web Design",
    tagline: "High-Performance Websites, Web Applications & Scalable Digital Platforms",
    metaTitle: "Web Development Company | Custom Web Design & Engineering | Pixel Nest Labs",
    metaDescription: "Global web development company. We build high-speed Next.js & React websites, custom web applications, SaaS platforms, and enterprise digital solutions.",
    heroHeadline: "Crafted Websites That Turn Visitors Into Customers Worldwide",
    intro:
      "A great business website is your 24/7 digital storefront. At Pixel Nest Labs, we engineer fast, modern websites tailored for ambitious businesses, startups, and enterprises worldwide. Every line of code is structured for Google speed, mobile usability, and measurable sales conversion.",
    deliverables: [
      { title: "Custom Business Websites", desc: "Handcrafted Next.js & React websites with bespoke designs that reflect your company's prestige and market authority." },
      { title: "High-Converting Landing Pages", desc: "Laser-focused marketing pages built for paid ads and organic campaigns with instant WhatsApp and form integrations." },
      { title: "E-commerce & Online Stores", desc: "Full-featured Shopify and custom stores with international payment gateways, shipping integrations, and inventory control." },
      { title: "Speed & Technical SEO Architecture", desc: "Sub-second load times, clean code, responsive layouts, and technical SEO structure to outrank competitors on Google." },
    ],
    process: [
      { step: "01", title: "Strategy & Discovery", desc: "We study your business goals, target audience, competitive landscape, and define an exact site scope." },
      { step: "02", title: "UI/UX & Wireframes", desc: "Interactive Figma layouts that you can review and click through before any code is written." },
      { step: "03", title: "Development & Speed Tuning", desc: "Clean Next.js implementation with zero bloated templates, ensuring 95+ Core Web Vitals scores." },
      { step: "04", title: "Launch & Training", desc: "Complete domain setup, SSL, Google Search Console submission, and hands-on walkthrough for your team." },
    ],
    faqs: [
      {
        q: "How much does website development cost?",
        a: "Website development costs depend on project scope and technical complexity. Focused business showcase websites typically range from $500 to $1,500 (₹35,000 to ₹90,000), while complex custom web applications, multi-vendor stores, and SaaS portals are quoted based on exact technical specifications. We provide clear, fixed-price proposals with transparent milestones.",
      },
      {
        q: "How long does it take to design and launch a website?",
        a: "A professional landing page or focused business website is typically delivered within 7 to 14 days. Custom enterprise portals and extensive web apps with backend databases take 3 to 6 weeks.",
      },
      {
        q: "Will my website be mobile-friendly and fast globally?",
        a: "Yes. Every website is built mobile-first with static prerendering, edge caching, and modern image compression so pages load in under 1.5 seconds anywhere in the world.",
      },
    ],
  },

  "custom-software": {
    slug: "custom-software",
    name: "Custom Software & Business Applications",
    tagline: "Custom Business Applications, Web Portals & Enterprise Software Engineering",
    metaTitle: "Custom Software Development Company | Pixel Nest Labs",
    metaDescription: "Custom software development company. We build tailored business management systems, custom CRMs, internal tools, ERPs, and cloud applications for growing companies.",
    heroHeadline: "Custom Software Tailored to Your Business Workflows, Not Off-the-Shelf Compromises",
    intro:
      "When generic SaaS tools fail to fit the way your company operates, custom software gives you a decisive advantage. Pixel Nest Labs develops scalable, secure software applications, operational dashboards, and custom management software that eliminate manual overhead.",
    deliverables: [
      { title: "Custom CRMs & Lead Pipelines", desc: "Track inquiries from initial call to final deal with custom pipeline stages, automated reminders, and team assignment rules." },
      { title: "Internal Operations & ERP Tools", desc: "Centralize billing, inventory, staff assignments, and vendor workflows into one intuitive dashboard." },
      { title: "API Development & Third-Party Integrations", desc: "Connect existing billing tools, accounting software, payment processors, and communication channels." },
      { title: "Cloud Database Architecture", desc: "Secure PostgreSQL, MongoDB, and MySQL databases configured for automatic backups, data privacy, and rapid querying." },
    ],
    process: [
      { step: "01", title: "Workflow Audit", desc: "We map your exact operational bottlenecks, spreadsheet dependencies, and data flows." },
      { step: "02", title: "Architecture & Prototype", desc: "Database entity modeling, API contracts, and clickable prototypes showing every screen of your future system." },
      { step: "03", title: "Iterative Sprints", desc: "Bi-weekly demo builds where you test live functionality on a staging URL and provide immediate feedback." },
      { step: "04", title: "Deployment & Data Migration", desc: "Safe import of your historical data, staff user training, and ongoing technical maintenance support." },
    ],
    faqs: [
      {
        q: "Why choose custom software instead of paying monthly for generic SaaS?",
        a: "Off-the-shelf software charges expensive per-user monthly fees forever, forces you to adapt your business to rigid templates, and locks your data. Custom software is 100% owned by your business, tailored exactly to your operations, and scales without per-seat penalty fees.",
      },
      {
        q: "Can you build software that connects with our existing accounting or ERP software?",
        a: "Yes. We regularly build automated synchronization bridges and API hooks that push invoices, customer ledgers, and payments directly between your custom application and accounting software.",
      },
    ],
  },

  "digital-marketing-seo": {
    slug: "digital-marketing-seo",
    name: "Digital Marketing & SEO Services",
    tagline: "Data-Driven SEO, Search Visibility & Growth Marketing for Modern Brands",
    metaTitle: "Digital Marketing & SEO Services | Pixel Nest Labs",
    metaDescription: "Result-oriented digital marketing and SEO services. Technical SEO, search ranking, lead generation funnels, and organic growth strategies for ambitious businesses.",
    heroHeadline: "Get Discovered by High-Intent Buyers Across India & Worldwide",
    intro:
      "Having a brilliant website is only half the battle—your ideal clients need to find it when they search on Google. Pixel Nest Labs delivers technical SEO, organic search optimization, and digital growth strategies that drive qualified inquiries, not vanity impressions.",
    deliverables: [
      { title: "Search Engine Optimization (SEO)", desc: "Comprehensive technical, on-page, and structural SEO to rank for high-intent commercial keywords and outpace competitors." },
      { title: "On-Page & Technical SEO", desc: "Complete structural audits, schema markup, title/description optimization, internal linking, and Core Web Vitals speed tuning." },
      { title: "Conversion Lead Funnels", desc: "Transform website visitors into booked meetings and direct inquiries with strategic call-to-action placement and landing pages." },
      { title: "Content & Authority Strategy", desc: "Targeted content that answers real customer search queries, establishing your company as the premier authority in your field." },
    ],
    process: [
      { step: "01", title: "Search Audit & Keyword Map", desc: "Identify what high-intent customers are searching on Google when looking for your services and products." },
      { step: "02", title: "Technical & On-Page Fixes", desc: "Eliminate indexing roadblocks, fix missing schemas, accelerate page speeds, and align page headings." },
      { step: "03", title: "Authority & Entity Building", desc: "Build structured authority signals, brand footprint consistency, and authoritative backlinks." },
      { step: "04", title: "Monthly Growth & Tracking", desc: "Clear reporting on keyword positions, organic impressions, user inquiries, and conversion metrics." },
    ],
    faqs: [
      {
        q: "How long does it take to see organic rankings improve?",
        a: "Measurable SEO movement typically begins within 6 to 12 weeks as search engines index technical fixes and fresh content. Competitive national and global keywords typically build sustainable authority over 3 to 6 months of steady optimization.",
      },
      {
        q: "How is Pixel Nest Labs different from generic SEO agencies?",
        a: "We are software engineers and technical SEO specialists. Unlike agencies that outsource automated spam links, we optimize the actual codebase, solve performance roadblocks, write genuine industry copy, and focus entirely on generating qualified phone, email, and WhatsApp inquiries.",
      },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    name: "AI Solutions & Business Automation",
    tagline: "Intelligent Workflows, AI Document Assistants & Process Automation for Modern Businesses",
    metaTitle: "AI Solutions & Business Automation Company | Pixel Nest Labs",
    metaDescription: "AI solutions, custom chatbot development, document processing, and workflow automation for growing businesses and modern enterprises.",
    heroHeadline: "Harness AI & Automation to Do More Work with Less Manual Effort",
    intro:
      "Artificial Intelligence is no longer just for tech giants. We build practical, reliable AI tools and workflow automations that save hundreds of hours of repetitive staff work every month—from automated customer assistants to intelligent invoice data extraction.",
    deliverables: [
      { title: "Customer Inquiry AI Chatbots", desc: "24/7 intelligent assistants trained on your product catalog, FAQs, and documentation to qualify leads and answer client queries instantly." },
      { title: "Workflow & Webhook Automations", desc: "Eliminate copy-pasting between spreadsheets, emails, CRMs, and payment gateways using automated trigger flows." },
      { title: "Document & Invoice Processing", desc: "Extract structured data from scanned invoices, purchase orders, and PDF contracts automatically into your database." },
      { title: "Predictive Business Dashboards", desc: "Uncover seasonal inventory patterns, forecast demand, and track sales trends with actionable data science models." },
    ],
    process: [
      { step: "01", title: "Repetitive Task Audit", desc: "We identify the repetitive, error-prone tasks your team spends 5+ hours on every week." },
      { step: "02", title: "AI Model & Workflow Design", desc: "Configure secure LLM integrations, document parser rules, and webhook pipelines using your actual business data." },
      { step: "03", title: "Controlled Testing", desc: "Test the automation rigorously alongside your existing staff to ensure 100% accuracy and zero hallucinations." },
      { step: "04", title: "Full Deployment & Guardrails", desc: "Launch the automation with real-time error logging, fallback channels, and full staff orientation." },
    ],
    faqs: [
      {
        q: "Will our proprietary business data be shared with public AI models?",
        a: "No. We implement private API integrations and enterprise-grade endpoints with strict zero-data-retention policies so your business documents and client communications are never used to train public models.",
      },
      {
        q: "What kind of business tasks can be automated first?",
        a: "The highest ROI automations for businesses are usually: automated inquiry qualification, instant proposal and invoice generation, CRM lead routing, and customer communication workflows.",
      },
    ],
  },
};
