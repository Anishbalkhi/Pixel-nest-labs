"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useId, useState } from "react";
import { joinWaitlist, type FormState } from "@/app/actions";
import { businessTypes, waitlistProductOptions } from "@/content/site";
import { Honeypot, SelectField, TextField } from "./fields";

const initial: FormState = { ok: false, message: "" };
export const WAITLIST_EVENT = "waitlist:select";

export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const [product, setProduct] = useState("");
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    const onSelect = (ev: Event) => setProduct((ev as CustomEvent<string>).detail);
    window.addEventListener(WAITLIST_EVENT, onSelect);
    return () => window.removeEventListener(WAITLIST_EVENT, onSelect);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.ok ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 py-8 text-center"
          role="status"
        >
          <span className="bg-teal text-navy grid size-12 place-items-center rounded-xl">
            <Check className="size-6" />
          </span>
          <p className="font-display text-lg font-bold text-white">Thanks for joining</p>
          <p className="text-sm text-white/70">{state.message}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          exit={{ opacity: 0 }}
          noValidate
          className="relative grid gap-3 sm:grid-cols-2"
        >
          <Honeypot />
          <TextField
            id={id("name")}
            name="name"
            label="Name"
            autoComplete="name"
            defaultValue={v.name}
            error={e.name}
          />
          <TextField
            id={id("email")}
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            defaultValue={v.email}
            error={e.email}
          />
          <SelectField
            id={id("businessType")}
            name="businessType"
            label="Business type"
            options={businessTypes}
            placeholder="Choose one"
            defaultValue={v.businessType ?? ""}
            error={e.businessType}
          />
          <SelectField
            id={id("product")}
            name="product"
            label="Product interest"
            options={waitlistProductOptions}
            placeholder="Choose a product"
            value={product || v.product || ""}
            onChange={(ev) => setProduct(ev.target.value)}
            error={e.product}
          />
          {state.message && !state.ok ? (
            <p className="text-xs font-medium text-red-300 sm:col-span-2" role="alert">
              {state.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="group bg-teal text-navy flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white disabled:opacity-70 sm:col-span-2"
          >
            {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {pending ? "Joining…" : "Join the waitlist"}
            {!pending ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
