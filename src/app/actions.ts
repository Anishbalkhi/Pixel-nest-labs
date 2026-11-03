"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkAttachment, contentMatchesExtension, extensionOf } from "@/lib/attachments";
import { budgetOptions, businessTypes, contact, contactServiceOptions, waitlistProductOptions } from "@/content/site";
import { deliverContactMessage, saveWaitlistEntry, type Attachment } from "@/lib/leads";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  // Echoed back on error so the form keeps what the visitor typed.
  values?: Record<string, string>;
};

/** One of the dropdown's own options, so made-up values can't be posted. */
const oneOf = (options: string[], message: string) => z.string().refine((v) => options.includes(v), message);

const name = z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long.");
const email = z.email("Please enter a valid email.").max(200, "That email is too long.");

const contactSchema = z.object({
  name,
  email,
  phone: z.string().trim().max(30, "That phone number is too long.").optional(),
  service: oneOf(contactServiceOptions, "Choose a service."),
  budget: oneOf(budgetOptions, "Choose a budget.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (10+ characters).")
    .max(5000, "Please keep it under 5,000 characters."),
});

const waitlistSchema = z.object({
  name,
  email,
  businessType: oneOf(businessTypes, "Choose your business type."),
  product: oneOf(waitlistProductOptions, "Choose a product."),
});

/**
 * Simple spam brake: at most 5 submissions per form per visitor every 10 minutes.
 * It lives in memory, so on Vercel each server instance counts separately; for
 * stronger protection add Vercel's firewall rate limiting or a CAPTCHA (see README).
 */
const recent = new Map<string, number[]>();
async function tooMany(form: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `${form}:${ip}`;
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 5;
}
const SLOW_DOWN = "You've sent a few messages already. Please wait a few minutes and try again.";

function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    errors[key] ??= issue.message;
  }
  return errors;
}

/** Text fields only; files are handled separately. */
function read(formData: FormData) {
  return Object.fromEntries(
    [...formData.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  );
}

/** Validates the optional spreadsheet. Returns the attachment, nothing, or an error message. */
async function readAttachment(formData: FormData): Promise<Attachment | null | string> {
  const file = formData.get("attachment");
  if (!(file instanceof File) || file.size === 0) return null;

  const problem = checkAttachment(file);
  if (problem) return problem;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = extensionOf(file.name);
  if (!contentMatchesExtension(ext, bytes)) {
    return "That file doesn't look like a real Excel or CSV file.";
  }
  // Keep only safe characters in the name we pass on.
  const filename = file.name.replace(/[^\w.\- ()]/g, "_").slice(-120);
  return { filename, contentType: file.type || "application/octet-stream", size: file.size, content: bytes };
}

export async function sendContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = read(formData);
  // Honeypot: real visitors never fill the hidden "company" field.
  if (raw.company) return { ok: true, message: "Thanks! We'll be in touch." };
  if (await tooMany("contact")) return { ok: false, message: SLOW_DOWN, values: raw };

  const parsed = contactSchema.safeParse(raw);
  const attachment = await readAttachment(formData);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);
  if (typeof attachment === "string") errors.attachment = attachment;

  if (!parsed.success || typeof attachment === "string") {
    const file = formData.get("attachment");
    const attachmentName = file instanceof File && file.size > 0 ? file.name : undefined;
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors,
      values: { ...raw, ...(attachmentName && { attachmentName }) },
    };
  }
  try {
    await deliverContactMessage(parsed.data, attachment ?? undefined);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    const attachmentName = attachment?.filename;
    return {
      ok: false,
      message: contact.email
        ? `Sorry, that didn't go through. Please try again, or email us at ${contact.email}.`
        : "Sorry, that didn't go through. Please try again in a moment.",
      values: { ...raw, ...(attachmentName && { attachmentName }) },
    };
  }
  return { ok: true, message: "Thanks! We'll reply within one working day." };
}

export async function joinWaitlist(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = read(formData);
  if (raw.company) return { ok: true, message: "You're on the list." };
  if (await tooMany("waitlist")) return { ok: false, message: SLOW_DOWN, values: raw };

  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error),
      values: raw,
    };
  }
  try {
    await saveWaitlistEntry(parsed.data);
  } catch (err) {
    console.error("[waitlist] save failed", err);
    return { ok: false, message: "Sorry, that didn't go through. Please try again in a moment.", values: raw };
  }
  return { ok: true, message: "You're on the list. We'll email you when early access opens." };
}
