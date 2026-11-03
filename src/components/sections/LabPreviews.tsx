import { Check, ShoppingBag } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { LabProject } from "@/content/site";

/*
 * Small animated mock-ups for the Lab cards, built from plain boxes and CSS
 * keyframes (see "Lab previews" in globals.css). Everything with class
 * "lab-anim" pauses while the Lab section is off screen.
 * Hover effects use the card's `group` class.
 */

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

function Window({
  children,
  title,
  action,
  overlay,
}: {
  children: ReactNode;
  title: string;
  action?: ReactNode;
  /** Positioned over the whole window, e.g. something that moves between the body and the title bar. */
  overlay?: ReactNode;
}) {
  return (
    <div className="relative w-full max-w-[340px] rounded-xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate text-[10px] font-medium tracking-wide text-white/40">{title}</span>
        <span className="ml-auto">{action}</span>
      </div>
      <div className="relative p-3">{children}</div>
      {overlay}
    </div>
  );
}

// 6 × 6 coffee cup: 2 = coffee, 1 = cup.
const CUP = ["222220", "111111", "111101", "111111", "111110", "011100"];

function Storefront() {
  return (
    <Window
      title="beanandbrew.myshopify.com"
      overlay={<span className="lab-fly bg-sun absolute size-2 rounded-[2px] opacity-0" aria-hidden />}
      action={
        <span className="relative inline-flex text-white/60">
          <ShoppingBag className="size-3.5" />
          <span className="lab-badge bg-sun text-navy absolute -top-1.5 -right-2 grid size-3.5 place-items-center rounded-full text-[8px] font-bold">
            1
          </span>
        </span>
      }
    >
      <div className="grid grid-cols-[1fr_1.1fr] gap-3">
        <div className="relative grid place-items-center rounded-lg bg-white/[0.04] py-4">
          <div className="absolute top-1.5 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
            {[0, 400, 800].map((delay) => (
              <span key={delay} className="lab-anim lab-steam size-1.5 rounded-[2px] bg-white/70" style={d(delay)} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-6 gap-[3px]">
            {CUP.flatMap((row, r) =>
              row
                .split("")
                .map((v, c) => (
                  <span
                    key={`${r}-${c}`}
                    className="size-2.5 rounded-[2px]"
                    style={{ background: v === "2" ? "#f7a21b" : v === "1" ? "#1fb89a" : "transparent" }}
                  />
                )),
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="h-2 w-4/5 rounded-full bg-white/30" />
          <span className="h-2 w-1/2 rounded-full bg-white/15" />
          <span className="mt-1 w-fit rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white/80">
            Subscribe &amp; save
          </span>
          <div className="mt-auto flex items-center gap-1.5">
            <span className="h-5 w-6 rounded-md border border-white/15" />
            <span className="lab-cart bg-teal text-navy relative flex h-5 flex-1 items-center justify-center rounded-md text-[9px] font-bold">
              Add to cart
            </span>
          </div>
        </div>
      </div>
    </Window>
  );
}

// 7 × 4 appointment grid; 1 = booked.
const SLOTS = ["0101100", "1100101", "0110010", "1011001"];

function Calendar() {
  return (
    <Window title="Clinic · This week">
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div className="grid grid-cols-7 gap-1">
          {SLOTS.flatMap((row, r) =>
            row
              .split("")
              .map((v, c) => (
                <span
                  key={`${r}-${c}`}
                  className={`lab-anim lab-slot h-4 rounded-[3px] ${v === "1" ? "bg-brand" : "bg-white/10"}`}
                  style={d((r + c) * 110)}
                />
              )),
          )}
        </div>
        <div className="flex w-20 flex-col gap-1.5">
          {["bg-teal", "bg-sun", "bg-sky"].map((color, i) => (
            <div key={color} className="flex items-center gap-1.5 rounded-md bg-white/[0.06] p-1">
              <span className={`size-3 shrink-0 rounded-[3px] ${color}`} />
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="h-1 w-full rounded-full bg-white/30" />
                <span className="h-1 rounded-full bg-white/15" style={{ width: `${70 - i * 15}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="lab-toast bg-teal text-navy absolute right-3 bottom-2 flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-bold opacity-0 shadow-lg">
        <Check className="size-3" /> Reminder sent
      </div>
    </Window>
  );
}

const BARS = [32, 46, 40, 58, 52, 70];
const FORECAST = [76, 84];

function Forecast() {
  return (
    <Window title="sales_trends.ipynb">
      <div className="flex h-24 items-end gap-1.5 border-b border-l border-white/15 pb-px pl-1">
        {BARS.map((h, i) => (
          <span key={i} className="lab-bar bg-brand flex-1 rounded-t-[3px]" style={{ height: `${h}%`, ...d(i * 70) }} />
        ))}
        {FORECAST.map((h, i) => (
          <span
            key={`f${i}`}
            className="lab-bar lab-anim lab-breathe border-teal bg-teal/20 flex-1 rounded-t-[3px] border border-dashed"
            style={{ height: `${h}%`, ...d((BARS.length + i) * 70) }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-col gap-1.5">
        <span className="w-fit max-w-[85%] self-end rounded-lg rounded-br-sm bg-white/15 px-2 py-1 text-[9px] text-white/85">
          Which month sold best?
        </span>
        <span className="relative h-[22px] w-fit">
          <span
            className="lab-typing flex items-center gap-1 rounded-lg rounded-bl-sm bg-white/[0.08] px-2 py-1.5"
            aria-hidden
          >
            {[0, 150, 300].map((delay) => (
              <span key={delay} className="lab-anim lab-dot size-1.5 rounded-full bg-white/60" style={d(delay)} />
            ))}
          </span>
          <span className="lab-answer bg-teal text-navy absolute top-0 left-0 rounded-lg rounded-bl-sm px-2 py-1 text-[9px] font-semibold whitespace-nowrap opacity-0">
            Here&apos;s the chart, month by month
          </span>
        </span>
      </div>
    </Window>
  );
}

const STEPS = ["Lead", "Opportunity", "Quote", "Invoice"];
const STEP_COLORS = ["#0b57c2", "#0e76a6", "#1fb89a", "#f7a21b"];

function Flow() {
  return (
    <Window title="Flow · Lead to cash">
      <div className="relative px-1 pt-2 pb-1">
        <div className="absolute top-[22px] right-6 left-6 h-px bg-white/15" aria-hidden />
        <span
          className="lab-anim lab-packet bg-sun absolute top-[19px] left-6 size-2 rounded-[2px] shadow-[0_0_10px_#f7a21b]"
          aria-hidden
        />
        <div className="relative flex justify-between">
          {STEPS.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-1.5">
              <span
                className="lab-anim lab-node grid size-7 place-items-center rounded-lg border border-white/15 bg-white/[0.08]"
                style={{ ...d(i * 750), ["--c" as string]: STEP_COLORS[i] }}
              >
                <span className="size-2.5 rounded-[3px]" style={{ background: STEP_COLORS[i] }} />
              </span>
              <span className="text-[9px] font-medium text-white/60">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {["Web form", "Auto-quote", "Paid"].map((label, i) => (
          <span
            key={label}
            className="flex items-center gap-1 rounded-md bg-white/[0.06] px-1.5 py-1 text-[9px] text-white/60"
          >
            <span className="size-1.5 rounded-full" style={{ background: STEP_COLORS[i + 1] }} />
            {label}
          </span>
        ))}
      </div>
    </Window>
  );
}

export function LabPreview({ kind }: { kind: LabProject["preview"] }) {
  if (kind === "storefront") return <Storefront />;
  if (kind === "calendar") return <Calendar />;
  if (kind === "forecast") return <Forecast />;
  return <Flow />;
}
