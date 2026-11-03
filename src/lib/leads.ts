/**
 * Where form submissions go.
 *
 * Each submission is posted to a Google Apps Script web app (google-apps-script/Code.gs),
 * which adds a row to the Google Sheet, saves any attachment to Google Drive and emails
 * the team. Set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_SECRET in .env.local (and on Vercel).
 * Without them, submissions are only logged, which is handy in local development.
 */

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
};

/** The optional Excel/CSV file from the contact form, already checked in src/app/actions.ts. */
export type Attachment = {
  filename: string;
  contentType: string;
  size: number;
  content: Uint8Array;
};

export type WaitlistEntry = {
  name: string;
  email: string;
  businessType: string;
  product: string;
};

export async function deliverContactMessage(data: ContactMessage, attachment?: Attachment) {
  await postToSheet({
    type: "contact",
    data,
    attachment: attachment && {
      filename: attachment.filename,
      contentType: attachment.contentType,
      base64: Buffer.from(attachment.content).toString("base64"),
    },
  });
}

export async function saveWaitlistEntry(data: WaitlistEntry) {
  await postToSheet({ type: "waitlist", data });
}

async function postToSheet(payload: { type: "contact" | "waitlist"; data: object; attachment?: object }) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    console.info(`[${payload.type}] GOOGLE_SCRIPT_URL is not set, so this was only logged:`, {
      ...payload.data,
      attachment: payload.attachment ? "yes" : "none",
    });
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret: process.env.GOOGLE_SCRIPT_SECRET }),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !result?.ok) {
    throw new Error(`Google Sheet script failed (${res.status}): ${result?.error ?? "no JSON response"}`);
  }
}
