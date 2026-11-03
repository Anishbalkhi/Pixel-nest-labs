/**
 * Pixel Nest Labs: receives website form submissions.
 *
 * - Adds each contact enquiry to a "Contact" tab and each waitlist sign-up to a "Waitlist" tab.
 * - Saves any attached spreadsheet to a Google Drive folder and links it in the row.
 * - Emails NOTIFY_EMAIL with the details (and the attachment).
 *
 * Setup: see "Google Sheet + email setup" in the project README.
 * The secret is NOT in this file: add it under Project Settings → Script properties
 * as SECRET, using the same value as GOOGLE_SCRIPT_SECRET in the website's .env.local.
 */

const CONFIG = {
  SPREADSHEET_ID: "1-9-JcoeFq5jigVnCHOdNf4SlBEraNCaBFY95d9lZ8jo",
  NOTIFY_EMAIL: "anishbalkhi1@gmail.com",
  UPLOAD_FOLDER: "Pixel Nest Labs - contact uploads",
  ALLOWED_EXTENSIONS: [".csv", ".xls", ".xlsx"],
  MAX_ATTACHMENT_BYTES: 4 * 1024 * 1024,
};

const SHEETS = {
  contact: {
    name: "Contact",
    headers: ["Received", "Name", "Email", "Phone", "Service", "Budget", "Message", "Attachment"],
  },
  waitlist: {
    name: "Waitlist",
    headers: ["Received", "Name", "Email", "Business type", "Product"],
  },
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) return json({ ok: false, error: "unauthorized" });

    if (body.type === "contact") return json(handleContact(body.data, body.attachment));
    if (body.type === "waitlist") return json(handleWaitlist(body.data));
    return json({ ok: false, error: "unknown type" });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server error" });
  }
}

function handleContact(d, attachment) {
  let fileUrl = "";
  let blob = null;
  if (attachment && attachment.base64) {
    blob = toBlob(attachment);
    fileUrl = uploadFolder().createFile(blob).getUrl();
  }

  appendRow("contact", [new Date(), d.name, d.email, d.phone, d.service, d.budget, d.message, fileUrl]);

  const lines = [
    "New enquiry from the Pixel Nest Labs website",
    "",
    "Name: " + d.name,
    "Email: " + d.email,
    "Phone: " + (d.phone || "-"),
    "Service: " + d.service,
    "Budget: " + (d.budget || "-"),
    "",
    d.message,
    "",
    fileUrl ? "Attachment: " + fileUrl : "No attachment",
  ];
  // The row is already saved, so a failed email (e.g. the daily quota) still counts
  // as success: otherwise the visitor retries and you get duplicate rows.
  notify({
    to: CONFIG.NOTIFY_EMAIL,
    replyTo: d.email,
    subject: "New enquiry: " + d.name + " (" + d.service + ")",
    body: lines.join("\n"),
    attachments: blob ? [blob] : [],
  });
  return { ok: true };
}

function handleWaitlist(d) {
  appendRow("waitlist", [new Date(), d.name, d.email, d.businessType, d.product]);
  notify({
    to: CONFIG.NOTIFY_EMAIL,
    replyTo: d.email,
    subject: "Waitlist sign-up: " + d.product,
    body: ["Name: " + d.name, "Email: " + d.email, "Business: " + d.businessType, "Product: " + d.product].join("\n"),
  });
  return { ok: true };
}

function notify(message) {
  try {
    MailApp.sendEmail(message);
  } catch (err) {
    console.error("Email not sent (the row was saved):", err);
  }
}

/** Appends a row, creating the tab and its header row the first time. */
function appendRow(kind, values) {
  const spec = SHEETS[kind];
  const book = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = book.getSheetByName(spec.name) || book.insertSheet(spec.name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(spec.headers);
    sheet.getRange(1, 1, 1, spec.headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(values.map(safeCell));
}

/**
 * Visitors type these values, so stop anything that starts like a formula
 * (=, +, -, @) from being run by Sheets.
 */
function safeCell(value) {
  if (value instanceof Date) return value;
  // Sheets cells hold up to 50,000 characters.
  const text = value == null ? "" : String(value).slice(0, 45000);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function toBlob(attachment) {
  const name = String(attachment.filename || "attachment");
  const dot = name.lastIndexOf(".");
  const ext = dot === -1 ? "" : name.slice(dot).toLowerCase();
  if (CONFIG.ALLOWED_EXTENSIONS.indexOf(ext) === -1) throw new Error("file type not allowed");
  const bytes = Utilities.base64Decode(attachment.base64);
  if (bytes.length > CONFIG.MAX_ATTACHMENT_BYTES) throw new Error("file too large");
  return Utilities.newBlob(bytes, attachment.contentType || "application/octet-stream", name);
}

function uploadFolder() {
  const found = DriveApp.getFoldersByName(CONFIG.UPLOAD_FOLDER);
  return found.hasNext() ? found.next() : DriveApp.createFolder(CONFIG.UPLOAD_FOLDER);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to grant permissions and check the sheet is reachable. */
function testSetup() {
  const book = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  uploadFolder();
  console.log("OK: can open '" + book.getName() + "' and the upload folder. Secret set: " +
    Boolean(PropertiesService.getScriptProperties().getProperty("SECRET")));
}
