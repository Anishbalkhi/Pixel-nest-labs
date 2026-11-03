"use client";

import { FileSpreadsheet, Paperclip, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type DragEvent } from "react";
import { ATTACHMENT_ACCEPT, checkAttachment, formatBytes, MAX_ATTACHMENT_MB } from "@/lib/attachments";

/**
 * Optional Excel/CSV attachment: click to browse or drag a file onto the box.
 * The real <input type="file"> stays in the form, so the file is sent with it.
 */
export function FileDropField({
  id,
  name,
  error,
  previousName,
}: {
  id: string;
  name: string;
  error?: string;
  /** Name of a file the visitor attached before the form came back with an error. */
  previousName?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // When the form resets after submitting, the browser empties the input; mirror that here.
  useEffect(() => {
    const form = inputRef.current?.form;
    if (!form) return;
    const onReset = () => setFile(null);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  const take = (f: File | undefined) => {
    const input = inputRef.current;
    if (!f || !input) return;
    const problem = checkAttachment(f);
    if (problem) {
      input.value = "";
      setFile(null);
      setLocalError(problem);
      return;
    }
    if (input.files?.[0] !== f) {
      const dt = new DataTransfer();
      dt.items.add(f);
      input.files = dt.files;
    }
    setLocalError(null);
    setFile(f);
  };

  const remove = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    setLocalError(null);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    take(e.dataTransfer.files[0]);
  };

  const shownError = localError ?? error;

  return (
    <div className="space-y-1.5">
      <p className="text-navy flex items-baseline justify-between text-xs font-semibold">
        Attach a spreadsheet
        <span className="text-muted font-normal">Optional</span>
      </p>

      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`group focus-within:ring-brand/20 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-3.5 py-3 transition-colors focus-within:ring-2 ${
          dragging
            ? "border-teal bg-teal/10"
            : shownError
              ? "border-red-400 bg-white"
              : "border-line hover:border-brand hover:bg-brand/5 bg-white"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={ATTACHMENT_ACCEPT}
          onChange={(e) => take(e.target.files?.[0])}
          aria-invalid={shownError ? true : undefined}
          aria-describedby={`${id}-hint${shownError ? ` ${id}-error` : ""}`}
          className="sr-only"
        />
        <motion.span
          animate={dragging ? { y: -3, scale: 1.1 } : { y: 0, scale: 1 }}
          className="bg-mist text-brand group-hover:bg-brand grid size-9 shrink-0 place-items-center rounded-lg transition-colors group-hover:text-white"
        >
          <Paperclip className="size-4" />
        </motion.span>
        <span className="min-w-0 text-sm">
          <span className="text-navy block font-semibold">
            {dragging ? "Drop it here" : file ? "Choose a different file" : "Drop a file or browse"}
          </span>
          <span id={`${id}-hint`} className="text-muted block text-xs">
            Excel (.xlsx, .xls) or CSV, up to {MAX_ATTACHMENT_MB} MB
          </span>
        </span>
      </label>

      <AnimatePresence initial={false}>
        {file ? (
          <motion.div
            key={file.name + file.size}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-teal/40 bg-teal/10 flex items-center gap-2.5 rounded-xl border px-3 py-2">
              <FileSpreadsheet className="size-5 shrink-0 text-teal-600" />
              <span className="min-w-0 flex-1">
                <span className="text-navy block truncate text-sm font-semibold">{file.name}</span>
                <span className="text-muted block text-xs">{formatBytes(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={remove}
                aria-label={`Remove ${file.name}`}
                className="text-navy/70 hover:text-navy grid size-7 shrink-0 place-items-center rounded-full transition-colors hover:bg-white"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {shownError ? (
        <p id={`${id}-error`} className="field-error text-xs font-medium text-red-600">
          {shownError}
        </p>
      ) : !file && previousName ? (
        <p className="text-xs font-medium text-[#9a5c00]">Please attach {previousName} again.</p>
      ) : null}
    </div>
  );
}
