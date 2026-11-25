export type IndustryItem = {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  problems: { title: string; desc: string }[];
  solutions: { title: string; desc: string; tech: string[] }[];
  features: { title: string; desc: string }[];
  benefits: { title: string; stat: string }[];
  faqs: { q: string; a: string }[];
};

export const industriesData: Record<string, IndustryItem> = {
  "schools-education": {
    slug: "schools-education",
    name: "Schools & Educational Institutes",
    tagline: "Custom School Websites, Admission Portals & Fee Management Systems",
    metaTitle: "School Website Development & Educational Management Software | Pixel Nest Labs",
    metaDescription: "Custom school website development, student admission portals, online fee payment systems and cloud management software for educational institutions.",
    heroHeadline: "Modern Websites & Operational Systems for Forward-Thinking Schools",
    problems: [
      { title: "Manual Paper-Based Admissions", desc: "Long parent queues, paper inquiry forms, and misplaced student documents cause operational chaos during peak session intakes." },
      { title: "Delayed Fee Tracking & Reconciliation", desc: "Chasing cash and offline bank receipts creates endless manual ledger reconciliations and cash flow blind spots." },
      { title: "Dated, Non-Mobile School Websites", desc: "Most school websites are slow, outdated, and fail to inspire confidence in parents evaluating institutions on their smartphones." },
      { title: "Scattered Parent Communication", desc: "Notices, holiday alerts, and exam schedules get lost across fragmented SMS blasts or informal messaging groups." },
    ],
    solutions: [
      {
        title: "Digital Admission & Inquiry Workflow",
        desc: "Interactive online registration forms with document uploads, automated merit lists, instant SMS/email confirmations, and admin tracking dashboards.",
        tech: ["Next.js", "React", "PostgreSQL", "Node.js"],
      },
      {
        title: "Automated Fee Collection & Receipts",
        desc: "Secure payment gateway integrations with automated receipt generation and instant payment reminders to parents.",
        tech: ["Payment APIs", "Node.js", "Webhook Automation"],
      },
      {
        title: "High-Performance School Portals",
        desc: "Fast, accessible, mobile-first websites showcasing curriculum, campus virtual tours, achievements, faculty credentials, and active noticeboards.",
        tech: ["Next.js", "Tailwind CSS", "CDN Caching", "Responsive UI"],
      },
      {
        title: "Staff & Attendance Management",
        desc: "Lightweight cloud records for daily student attendance, teacher timetables, student report cards, and automated digital notice distribution.",
        tech: ["REST APIs", "Cloud SQL", "Role-Based Access Control"],
      },
    ],
    features: [
      { title: "Instant Digital Fee Collections", desc: "Zero-friction payments via UPI, cards, and net banking with automated ledger reconciliation." },
      { title: "Student Document Vault", desc: "Secure digital storage of birth certificates, transfer certificates, and grade cards." },
      { title: "Mobile Noticeboard", desc: "Instant announcements that parents can access right from their phone without downloading heavy apps." },
      { title: "Exam & Report Card Engine", desc: "Generate standards-aligned report cards and marks sheets automatically from grade records." },
    ],
    benefits: [
      { title: "Fee Reconciliation Time", stat: "Saved 80%" },
      { title: "Parent Inquiries Conversion", stat: "+45% Growth" },
      { title: "Page Speed Score", stat: "98+ on Mobile" },
      { title: "Paper Waste Reduction", stat: "100% Digital" },
    ],
    faqs: [
      {
        q: "Can you integrate with our existing school fee bank accounts?",
        a: "Yes. We integrate verified payment gateways and direct bank APIs so fee settlements land directly into your institutional bank account with automatic digital receipts.",
      },
      {
        q: "Do you design websites compliant with mandatory educational disclosures?",
        a: "Yes. We structure educational websites with dedicated, easily updatable sections for mandatory public disclosures, governance committees, fee structures, and academic calendars.",
      },
      {
        q: "Can our non-technical administrative staff update notices and photos?",
        a: "Absolutely. We build clean, intuitive administrative panels so front-desk staff or teachers can post notices, upload photos to the gallery, and announce holidays in seconds.",
      },
    ],
  },

  "colleges-universities": {
    slug: "colleges-universities",
    name: "Colleges & Universities",
    tagline: "University Portals, Campus ERPs & Accreditation-Ready Digital Systems",
    metaTitle: "College Website Development & Campus ERP Software | Pixel Nest Labs",
    metaDescription: "High-performance college website design, university admission ERPs, student portals, and accreditation-ready digital infrastructure.",
    heroHeadline: "Scalable Portals & Systems for Colleges, Universities & Higher Ed",
    problems: [
      { title: "Sub-par Campus First Impressions", desc: "Prospective undergraduate and postgraduate candidates compare campus websites before visiting. Sluggish or confusing sites turn students away." },
      { title: "Multi-Departmental Silos", desc: "Engineering, management, arts, and professional departments operate on isolated sheets, making centralized institutional reporting difficult." },
      { title: "Complex Semester Examinations", desc: "Managing roll numbers, admit cards, hall tickets, internal marks, and backlog exams on spreadsheets leads to costly errors." },
      { title: "Accreditation Documentation Overhead", desc: "Gathering departmental faculty data, research papers, and placement statistics for inspections is a massive manual drain." },
    ],
    solutions: [
      {
        title: "Brand-Defining Institutional Portals",
        desc: "Editorial-grade institutional websites designed to attract top student applicants, showcase academic rankings, campus life, and placement statistics.",
        tech: ["Next.js", "Server-Side Rendering", "Tailwind CSS"],
      },
      {
        title: "Admissions & Counseling Workflow",
        desc: "End-to-end applicant tracking, document verification, quota allocations (merit, international, athletic), and fee collection.",
        tech: ["PostgreSQL", "Prisma / TypeORM", "Secure Auth"],
      },
      {
        title: "Examination & Grade Management",
        desc: "Credit-based evaluation engines, hall ticket generation, internal marks submission, and automated grade point average calculations.",
        tech: ["Node.js", "Distributed Database", "PDF Generation"],
      },
      {
        title: "Placement Cell & Recruiter Dashboard",
        desc: "Student resume builders, company drive registrations, eligibility filters, and live interview scheduling dashboards.",
        tech: ["React", "Express", "Role RBAC"],
      },
    ],
    features: [
      { title: "Departmental Sub-sites", desc: "Each academic department maintains its syllabus, faculty profiles, and lab facilities under a unified brand design." },
      { title: "Student Self-Service Portal", desc: "Single sign-on for attendance tracking, exam fee payment, admit card downloads, and grade history." },
      { title: "Alumni Network Hub", desc: "Directory, mentorship request boards, and donation records for institutional alumni associations." },
      { title: "Accreditation Data Vault", desc: "Structured digital evidence collection for academic audits and statutory accreditation visits." },
    ],
    benefits: [
      { title: "Admissions Processing", stat: "3x Faster" },
      { title: "Examination Accuracy", stat: "99.9% Error-Free" },
      { title: "Mobile Experience", stat: "100% Fluid" },
      { title: "Recruiter Engagement", stat: "+60% Applications" },
    ],
    faqs: [
      {
        q: "Can the college website handle heavy traffic spikes during result announcements?",
        a: "Yes. We build using Next.js on modern edge-caching architectures that effortlessly scale to handle tens of thousands of simultaneous students checking exam results or cutoff lists without server crashes.",
      },
      {
        q: "Can you migrate legacy student records from our older college software?",
        a: "Yes. Our team handles data sanitation, schema mapping, and secure database migrations from legacy databases or Excel sheets into modern, robust databases.",
      },
    ],
  },

  "hospitals-clinics": {
    slug: "hospitals-clinics",
    name: "Hospitals & Healthcare Clinics",
    tagline: "Healthcare Websites, Doctor Appointment Schedulers & Clinic Management Software",
    metaTitle: "Hospital Website Development & Clinic Management Software | Pixel Nest Labs",
    metaDescription: "Custom hospital website design, doctor appointment booking systems, patient inquiry portals, and clinic workflow software for healthcare providers.",
    heroHeadline: "Trust-Building Healthcare Portals & Frictionless Patient Workflows",
    problems: [
      { title: "Chaotic Patient Appointment Lines", desc: "Reception desks inundated with phone calls while patients endure frustrating wait times in crowded OPD waiting rooms." },
      { title: "Lack of Clear Doctor Credibility", desc: "Patients researching specialists, procedures, and credentials online find vague details and fail to book consultations." },
      { title: "No Show Appointments & Lost Inquiries", desc: "Without automated confirmations and reminders, appointment no-shows waste valuable specialist consulting hours." },
      { title: "Disjointed Diagnostic & Prescription Records", desc: "Patients losing printed prescriptions and test reports between follow-up consultations." },
    ],
    solutions: [
      {
        title: "Doctor Profile & OPD Scheduling Engine",
        desc: "Intuitive doctor search by specialty, real-time consultation slot selection, instant booking confirmation, and automated appointment reminders.",
        tech: ["Next.js", "Node.js", "Messaging API", "Calendar Slots"],
      },
      {
        title: "High-Trust Hospital Web Portals",
        desc: "Accessible, clean healthcare websites detailing treatment departments, emergency services, doctor qualifications, insurance panels, and patient testimonials.",
        tech: ["Next.js", "WCAG 2.1 Accessibility", "SEO Schema"],
      },
      {
        title: "Digital Prescription & Report Portals",
        desc: "Secure patient portals where patients can download lab test results, pathology reports, and doctor prescriptions using their mobile number and OTP.",
        tech: ["Encrypted S3/Cloud Storage", "OTP Auth", "Fast PDF Delivery"],
      },
      {
        title: "Tele-consultation Integration",
        desc: "Video consultation booking with integrated digital payments for remote patients seeking specialist medical opinions.",
        tech: ["WebRTC / Video API", "Payment Integration"],
      },
    ],
    features: [
      { title: "One-Click Emergency Call Button", desc: "Instant ambulance and emergency room connection prominently displayed for mobile visitors." },
      { title: "Insurance & TPA Empanelment Guide", desc: "Comprehensive, searchable list of cashless mediclaim providers and healthcare coverage options." },
      { title: "Departmental Treatment Guides", desc: "Clear, patient-friendly medical explanations that educate patients and rank prominently in organic health searches." },
      { title: "Doctor Holiday & Leave Management", desc: "Doctors or hospital admin can block unavailable slots with one click to prevent accidental overbooking." },
    ],
    benefits: [
      { title: "Front Desk Call Volume", stat: "Reduced 40%" },
      { title: "Patient Appointment Show-rate", stat: "92% Attendance" },
      { title: "Healthcare Search Visibility", stat: "Top Tier" },
      { title: "Digital Report Access", stat: "Instant 24/7" },
    ],
    faqs: [
      {
        q: "Can the website highlight insurance networks and coverage panels?",
        a: "Yes. We create clear, dedicated informational sections for empanelled insurance providers, corporate TPAs, and public health schemes so patients immediately understand their coverage.",
      },
      {
        q: "Is patient medical data kept secure and confidential?",
        a: "Yes. All patient record storage uses encrypted cloud buckets, role-restricted administrative access, and HTTPS data-in-transit encryption to uphold healthcare privacy standards.",
      },
    ],
  },

  "real-estate": {
    slug: "real-estate",
    name: "Real Estate & Property Developers",
    tagline: "Property Listing Portals, Real Estate CRMs & Project Websites",
    metaTitle: "Real Estate Website Development & Property CRM | Pixel Nest Labs",
    metaDescription: "Custom real estate website development, luxury project landing pages, property listing portals, and lead management CRMs for developers and brokers.",
    heroHeadline: "High-Converting Digital Assets for Real Estate Developers & Builders",
    problems: [
      { title: "Leads Leaking Through Broken Spreadsheets", desc: "High-value inquiries from digital ads and property portals get neglected without an automated CRM pipeline." },
      { title: "Slow, Uninspiring Project Websites", desc: "High-ticket villas, luxury apartments, and commercial projects presented on slow, generic templates fail to convey architectural prestige." },
      { title: "Broker & Channel Partner Disconnect", desc: "Real estate brokers lack real-time visibility into available inventory, price sheets, and commission tracking." },
      { title: "Inaccurate Unit Inventory Tracking", desc: "Double-booking plots or apartments because sales agents work with outdated printed floor plan spreadsheets." },
    ],
    solutions: [
      {
        title: "Immersive Real Estate Project Portals",
        desc: "Stunning editorial websites showcasing floor plans, master layouts, location advantages, drone video integrations, and statutory compliance details.",
        tech: ["Next.js", "High-Res Image Optimization", "Interactive Maps"],
      },
      {
        title: "Custom Real Estate Lead CRM",
        desc: "Centralize inquiries from website forms, messaging apps, and property portals. Auto-assign leads to sales executives with instant notification triggers.",
        tech: ["Node.js", "Webhooks", "PostgreSQL", "CRM Pipeline"],
      },
      {
        title: "Live Inventory & Unit Booking Engine",
        desc: "Color-coded interactive site maps showing available, booked, and held plots or apartments with price breakdown calculators.",
        tech: ["Interactive SVG", "Real-Time DB", "Role Access"],
      },
      {
        title: "Channel Partner (CP) Network Portal",
        desc: "Dedicated broker dashboard to download project marketing collateral, submit client leads, and track commission milestones.",
        tech: ["React", "Secure Auth", "Asset Distribution"],
      },
    ],
    features: [
      { title: "Statutory & RERA Registration Disclosures", desc: "Prominent registration numbers, approved layout plans, and legal disclosures to build immediate homebuyer trust." },
      { title: "Instant WhatsApp Brochure Download", desc: "Capture high-intent contact details before sending high-resolution PDF project brochures directly via messaging." },
      { title: "EMI & Mortgage Calculators", desc: "Interactive financial tools that engage buyers and show realistic monthly commitment numbers." },
      { title: "Location Radius Map", desc: "Interactive map showing driving distances to airports, transit hubs, business districts, and top schools." },
    ],
    benefits: [
      { title: "Lead Follow-Up Speed", stat: "< 2 Minutes" },
      { title: "Brochure Inquiry Conversions", stat: "+55% Leads" },
      { title: "Inventory Double-Booking", stat: "0% Error" },
      { title: "Luxury Aesthetic Appeal", stat: "World-Class" },
    ],
    faqs: [
      {
        q: "Can the website capture leads and immediately send project brochures?",
        a: "Yes. We build high-converting lead automation: as soon as a visitor requests a floor plan or brochure, the system verifies their information and instantly delivers the asset via email or WhatsApp.",
      },
      {
        q: "Do you integrate with paid ad lead forms?",
        a: "Yes. Inquiries from Google Ads, Meta Ads, and property portals flow automatically via webhooks into your custom CRM so your sales executives can follow up with prospects immediately.",
      },
    ],
  },

  "hotels-resorts": {
    slug: "hotels-resorts",
    name: "Hotels, Resorts & Luxury Stays",
    tagline: "Direct Booking Websites & Reservation Software for Hotels & Luxury Stays",
    metaTitle: "Hotel Website Development & Direct Booking Software | Pixel Nest Labs",
    metaDescription: "Custom hotel website development, luxury resort portals, commission-free direct booking engines, and hospitality digital marketing.",
    heroHeadline: "Breathtaking Websites & Direct Booking Engines for Hospitality Brands",
    problems: [
      { title: "Crushing 20-25% OTA Commission Fees", desc: "Hotels and luxury resorts lose massive revenue slices on every booking made through third-party travel platforms." },
      { title: "Generic Websites That Fail to Sell the Ambiance", desc: "Luxury hospitality is about atmosphere, storytelling, and emotion. Template websites fail to convey that magic to prospective guests." },
      { title: "Clunky Mobile Direct Booking Flows", desc: "When travelers try to book directly, confusing multi-step forms cause high checkout abandonment." },
      { title: "Fragmented Event & Destination Wedding Inquiries", desc: "High-value wedding, banquet, and corporate retreat inquiries get buried in unattended email inboxes." },
    ],
    solutions: [
      {
        title: "Luxury Hospitality Web Showcases",
        desc: "Cinematic, editorial-grade websites showcasing guest suites, architecture, dining experiences, cultural amenities, and private event spaces.",
        tech: ["Next.js", "Video Streaming", "Responsive Editorial Layouts"],
      },
      {
        title: "Commission-Free Direct Booking Engine",
        desc: "Seamless room availability search, dynamic seasonal tariff packages, promo code engines, and instant credit card and digital payments.",
        tech: ["Node.js", "Payment Gateways", "Calendar Engine"],
      },
      {
        title: "Destination Wedding & Event Showcase",
        desc: "Dedicated high-converting event landing pages with venue capacity charts, photo galleries, and private event inquiry forms.",
        tech: ["High-Res Galleries", "Lead Funnel Optimization"],
      },
      {
        title: "Local Experiences & Itinerary Guides",
        desc: "SEO-rich travel guides covering regional sightseeing, cultural highlights, and local experiences that capture travelers planning their trip.",
        tech: ["Content SEO", "Structured Schema"],
      },
    ],
    features: [
      { title: "Multi-Currency Display", desc: "Automatic price presentation in INR, USD, EUR, and GBP for international travelers." },
      { title: "Best Rate Guarantee Badges", desc: "Prominent incentives (complimentary breakfast, late checkout) to convince travelers to book direct rather than on OTAs." },
      { title: "Virtual 360 Suite Tours", desc: "Give event planners and luxury travelers an interactive walk through royal suites and banquet venues." },
      { title: "Fast Room Availability Check", desc: "Check-in/check-out date picker that loads live prices in under 500 milliseconds." },
    ],
    benefits: [
      { title: "Direct Booking Revenue", stat: "+35% Growth" },
      { title: "OTA Commission Savings", stat: "Substantial" },
      { title: "Mobile Booking Completion", stat: "2.4x Higher" },
      { title: "Event Inquiries", stat: "High Quality" },
    ],
    faqs: [
      {
        q: "Can our hotel accept international payments from foreign travelers?",
        a: "Yes. We integrate multi-currency international payment gateways like Stripe and Razorpay International so guests worldwide can pay smoothly using credit cards and digital wallets.",
      },
      {
        q: "Can the website connect with our existing Hotel Channel Manager or PMS?",
        a: "Yes. We link direct booking engines with standard channel managers or hospitality APIs so room availability and rates sync automatically across OTAs and your own website.",
      },
    ],
  },

  "retail-ecommerce": {
    slug: "retail-ecommerce",
    name: "Retail, Artisans & D2C E-commerce",
    tagline: "High-Converting Shopify Stores, D2C Brand Websites & Omnichannel Retail Portals",
    metaTitle: "E-commerce Website Development & Shopify Agency | Pixel Nest Labs",
    metaDescription: "Custom e-commerce store development, Shopify setup, D2C brand websites, and retail inventory management software for modern businesses.",
    heroHeadline: "Scalable E-commerce Platforms for Modern Retailers & Global D2C Brands",
    problems: [
      { title: "High Cart Abandonment on Slow Stores", desc: "Generic store themes overloaded with plugins take 6+ seconds to load, causing prospective customers to leave before checkout." },
      { title: "High Return (RTO) Losses on Cash Orders", desc: "Cash on delivery orders with inaccurate addresses or impulsive cancellations erode retail profit margins across modern e-commerce." },
      { title: "Inventory Misalignment Between Store & Online", desc: "Retailers selling in physical outlets as well as online struggle with manual stock reconciliation and accidental out-of-stock orders." },
      { title: "Poor Mobile Shopping UX", desc: "Over 80% of digital purchases happen on smartphones; clunky menus and slow product pages severely hurt conversion rates." },
    ],
    solutions: [
      {
        title: "Custom Shopify & Headless Stores",
        desc: "Lightning-fast, conversion-optimized online storefronts built with modern themes or headless Next.js for global D2C and lifestyle brands.",
        tech: ["Shopify", "Liquid", "Next.js", "Tailwind CSS"],
      },
      {
        title: "Order Verification & Address Optimization",
        desc: "Automated order verification, pincode serviceability checks, and incentives for prepaid orders to significantly slash return rates.",
        tech: ["Webhook Automation", "Messaging APIs", "Prepaid Incentives"],
      },
      {
        title: "Omnichannel Inventory Synchronization",
        desc: "Connect POS billing counters in your retail outlets with your online store so stock updates in real time automatically.",
        tech: ["REST APIs", "Inventory Webhooks", "Cloud DB"],
      },
      {
        title: "B2B Wholesale & Export Catalogue",
        desc: "Private password-protected wholesale catalogs with tiered volume pricing for manufacturers, apparel makers, and exporters.",
        tech: ["B2B Portals", "Tiered Pricing", "Invoicing"],
      },
    ],
    features: [
      { title: "One-Click Checkout", desc: "Fast OTP checkouts with pre-filled addresses that double conversion rates on mobile." },
      { title: "Cart Recovery Automation", desc: "Automated friendly notifications to shoppers who abandoned items in their bag." },
      { title: "Wholesale Inquiry Request Sheets", desc: "Easy request-for-quote tools for commercial buyers looking for bulk manufacturing." },
      { title: "Curated Lookbooks & Video Commerce", desc: "Engaging video reels and styled photos that highlight craftsmanship and product details." },
    ],
    benefits: [
      { title: "Store Page Load Time", stat: "< 1.5s Speed" },
      { title: "Checkout Conversion Rate", stat: "+40% Increase" },
      { title: "Order Return Rate", stat: "Down 30%" },
      { title: "B2B Wholesale Inquiries", stat: "Direct Leads" },
    ],
    faqs: [
      {
        q: "Do you specialize in apparel, lifestyle, and artisan e-commerce stores?",
        a: "Yes. We build digital stores that showcase product craftsmanship with international appeal, multi-currency support, and global shipping integrations.",
      },
      {
        q: "Can you help our physical retail store transition to selling online?",
        a: "Absolutely. We guide you through domain setup, catalog photography structure, payment gateway approvals, courier integrations, and staff training so you can manage orders smoothly.",
      },
    ],
  },
};
