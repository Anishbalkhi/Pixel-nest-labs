"use client";

import { ArrowRight, Calendar, Check, LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useActionState, useId, useState, type Ref } from "react";
import { sendContact, type FormState } from "@/app/actions";
import { budgetOptions, contact, contactServiceOptions } from "@/content/site";
import { Honeypot, SelectField, TextAreaField, TextField } from "./fields";
import { FileDropField } from "./FileDropField";

const initial: FormState = { ok: false, message: "" };

export function ContactForm({ autoFocusRef }: { autoFocusRef?: Ref<HTMLInputElement> }) {
  const [round, setRound] = useState(0);
  return <Inner key={round} onReset={() => setRound((r) => r + 1)} autoFocusRef={autoFocusRef} />;
}

function Inner({ onReset, autoFocusRef }: { onReset: () => void; autoFocusRef?: Ref<HTMLInputElement> }) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const e = state.errors ?? {};
  const v = state.values ?? {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.ok ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 py-10 text-center"
          role="status"
        >
          <span className="bg-teal grid size-12 place-items-center rounded-xl text-white">
            <Check className="size-6" />
          </span>
          <p className="font-display text-lg font-bold">Message sent</p>
          <p className="text-muted text-sm">{state.message}</p>
          <button type="button" onClick={onReset} className="text-brand mt-2 text-sm font-semibold hover:underline">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" action={action} exit={{ opacity: 0 }} className="relative space-y-3">
          <Honeypot />
          <TextField
            ref={autoFocusRef}
            id={id("name")}
            name="name"
            defaultValue={v.name}
            label="Name"
            autoComplete="name"
            placeholder="Your name"
            required
            minLength={2}
            maxLength={100}
            error={e.name}
          />
          <TextField
            id={id("email")}
            name="email"
            defaultValue={v.email}
            type="email"
            label="Email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            error={e.email}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              id={id("phone")}
              name="phone"
              defaultValue={v.phone}
              type="tel"
              label="Phone"
              autoComplete="tel"
              placeholder="+91…"
              optional
              error={e.phone}
            />
            <SelectField
              id={id("budget")}
              name="budget"
              label="Budget"
              options={budgetOptions}
              defaultValue={v.budget ?? budgetOptions[0]}
              error={e.budget}
            />
          </div>
          <SelectField
            id={id("service")}
            name="service"
            label="What do you need?"
            options={contactServiceOptions}
            placeholder="Choose a service"
            defaultValue={v.service ?? ""}
            required
            error={e.service}
          />
          <TextAreaField
            id={id("message")}
            name="message"
            defaultValue={v.message}
            label="Message"
            rows={3}
            placeholder="A few lines about your project"
            required
            minLength={10}
            maxLength={5000}
            error={e.message}
          />
          <FileDropField id={id("attachment")} name="attachment" error={e.attachment} previousName={v.attachmentName} />
          {state.message && !state.ok ? (
            <p className="text-xs font-medium text-red-600" role="alert">
              {state.message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="group bg-navy hover:bg-brand flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-70"
          >
            {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {pending ? "Sending…" : "Send message"}
            {!pending ? <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /> : null}
          </button>
          {contact.bookingUrl ? (
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-brand flex items-center justify-center gap-2 text-xs font-semibold hover:underline"
            >
              <Calendar className="size-3.5" /> Prefer a call? Book a free 20-minute slot
            </a>
          ) : null}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
