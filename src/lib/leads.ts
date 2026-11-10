/**
 * Where form submissions go.
 *
 * Each submission is posted to a Google Apps Script web app (google-apps-script/Code.gs),
 * which adds a row to the Google Sheet, saves any attachment to Google Drive and emails
 * the team. Set GOOGLE_SCRIPT_URL and GOOGLE_SCRIPT_SECRET in .env.local (and on Vercel).
 * Without them, `npm run dev` only logs submissions, which is handy while building. Anywhere
 * else (a deployed site) a missing setting is an error, so the visitor sees "Sorry, that
 * didn't go through" instead of a "Thanks" for a message that was never saved.
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
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret) {
    const missing = [!url && "GOOGLE_SCRIPT_URL", !secret && "GOOGLE_SCRIPT_SECRET"].filter(Boolean).join(" and ");
    if (process.env.NODE_ENV === "development") {
      console.info(`[${payload.type}] ${missing} not set, so this was only logged:`, {
        ...payload.data,
        attachment: payload.attachment ? "yes" : "none",
      });
      return;
    }
    throw new Error(
      `${missing} not set, so the ${payload.type} form can't save anything. Add it on the host and redeploy.`,
    );
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret }),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !result?.ok) {
    throw new Error(`Google Sheet script failed (${res.status}): ${result?.error ?? "no JSON response"}`);
  }
}
