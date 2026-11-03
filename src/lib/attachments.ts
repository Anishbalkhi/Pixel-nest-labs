/** Rules for the optional spreadsheet attached to the contact form. Shared by the form and the server action. */

export const MAX_ATTACHMENT_MB = 4;
export const MAX_ATTACHMENT_BYTES = MAX_ATTACHMENT_MB * 1024 * 1024;
export const ALLOWED_EXTENSIONS = [".csv", ".xls", ".xlsx"];
export const ATTACHMENT_ACCEPT =
  ".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export function extensionOf(name: string) {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

/** Quick check the browser can run before uploading. Returns an error message, or null if the file is fine. */
export function checkAttachment(file: { name: string; size: number }) {
  if (!ALLOWED_EXTENSIONS.includes(extensionOf(file.name))) {
    return "Please attach an Excel (.xlsx, .xls) or CSV file.";
  }
  if (file.size > MAX_ATTACHMENT_BYTES) return `Files can be up to ${MAX_ATTACHMENT_MB} MB.`;
  if (file.size === 0) return "That file is empty.";
  return null;
}

/**
 * Server-side check that the bytes match the extension, so a renamed file of another
 * type is rejected. .xlsx files are ZIP archives ("PK"), .xls files are OLE documents,
 * and CSV must be plain text.
 */
export function contentMatchesExtension(ext: string, bytes: Uint8Array) {
  if (ext === ".xlsx") return bytes[0] === 0x50 && bytes[1] === 0x4b;
  if (ext === ".xls") return bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
  if (ext === ".csv") return !bytes.subarray(0, 4096).includes(0);
  return false;
}

export function formatBytes(n: number) {
  return n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
}
