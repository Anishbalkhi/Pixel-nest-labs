import { Check } from "lucide-react";
import type { ReactNode } from "react";
import type { Product } from "@/content/site";

/*
 * Small, static mock-ups of each product's main screen, built from plain
 * boxes. Shown in the home products switcher until a real screenshot is set
 * in `products[].image`. Decorative only.
 */

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-navy text-navy w-full max-w-[460px] border-2 bg-white shadow-[10px_10px_0_0_#0a0f2c]">
      <div className="border-navy flex items-center gap-1.5 border-b-2 px-3 py-2">
        <span className="bg-brand size-2.5" />
        <span className="bg-teal size-2.5" />
        <span className="bg-sun size-2.5" />
        <span className="ml-2 truncate text-[11px] font-bold tracking-[0.12em] uppercase">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

const Bar = ({ w, className = "bg-navy/15" }: { w: string; className?: string }) => (
  <span className={`block h-2 ${className}`} style={{ width: w }} />
);

function PathLab() {
  const rows = [
    { name: "R. Sharma", test: "CBC · Lipid", status: "Ready", tone: "bg-teal" },
    { name: "A. Khan", test: "Thyroid", status: "Processing", tone: "bg-sun" },
    { name: "M. Iyer", test: "HbA1c", status: "Collected", tone: "bg-brand text-white" },
  ];
  return (
    <Window title="Path Lab · Today's samples">
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.name} className="border-navy/15 flex items-center gap-3 border p-2.5">
            {/* barcode */}
            <span
              className="h-8 w-12 shrink-0"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#0a0f2c 0 2px,transparent 2px 4px,#0a0f2c 4px 5px,transparent 5px 8px)",
              }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold">{r.name}</span>
              <span className="text-navy/60 block truncate text-[11px]">{r.test}</span>
            </span>
            <span className={`shrink-0 px-2 py-1 text-[10px] font-bold uppercase ${r.tone}`}>{r.status}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold">
        <span>Report PDF</span>
        <span className="bg-navy px-2 py-1 text-white">Send</span>
      </div>
    </Window>
  );
}

function Crm() {
  const cols = [
    { title: "New", cards: 3, tone: "bg-brand" },
    { title: "Follow-up", cards: 2, tone: "bg-sun" },
    { title: "Won", cards: 2, tone: "bg-teal" },
  ];
  return (
    <Window title="Simple CRM · Pipeline">
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((c) => (
          <div key={c.title} className="bg-mist p-2">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase">
              <span className={`size-2 ${c.tone}`} />
              {c.title}
            </p>
            <div className="space-y-1.5">
              {Array.from({ length: c.cards }, (_, k) => (
                <div key={k} className="border-navy/15 space-y-1 border bg-white p-1.5">
                  <Bar w="80%" className="bg-navy/70" />
                  <Bar w="55%" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
        <span className="bg-sun size-2" /> 3 follow-ups due today
      </p>
    </Window>
  );
}

function Restaurant() {
  const tables = ["busy", "free", "busy", "bill", "free", "busy"];
  return (
    <Window title="Restaurant · Floor & kitchen">
      <div className="grid grid-cols-[1fr_120px] gap-3">
        <div className="grid grid-cols-3 gap-2">
          {tables.map((t, i) => (
            <span
              key={i}
              className={`grid aspect-square place-items-center text-[11px] font-bold ${
                t === "busy" ? "bg-brand text-white" : t === "bill" ? "bg-sun" : "border-navy/20 border"
              }`}
            >
              T{i + 1}
            </span>
          ))}
        </div>
        <div className="space-y-1.5">
          {["T3 · 2× Dosa", "T1 · Thali", "T6 · Coffee"].map((k) => (
            <div key={k} className="border-navy border-l-4 bg-white p-1.5 text-[10px] font-semibold shadow-sm">
              {k}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px] font-semibold">Today&apos;s sales ▲</p>
    </Window>
  );
}

function Admission() {
  const steps = ["Enquiry", "Form", "Documents", "Fees"];
  return (
    <Window title="Admission · Application #1042">
      <ol className="flex items-center gap-1">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-1">
            <span className={`h-1.5 ${i < 3 ? "bg-teal" : "bg-navy/15"}`} />
            <span className="text-[10px] font-bold uppercase">{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 space-y-2.5">
        {["Student name", "Class applying for", "Parent's phone"].map((f) => (
          <div key={f}>
            <p className="text-navy/60 text-[10px] font-semibold">{f}</p>
            <div className="border-navy/20 mt-1 h-6 border" />
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
        <Check className="size-3.5 text-teal-700" /> Birth certificate uploaded
      </p>
    </Window>
  );
}

export function ProductMock({ slug }: { slug: Product["slug"] }) {
  if (slug === "path-lab") return <PathLab />;
  if (slug === "crm") return <Crm />;
  if (slug === "restaurant") return <Restaurant />;
  return <Admission />;
}
