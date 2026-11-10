import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-muted/60 transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

function Wrap({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-navy flex items-baseline justify-between text-xs font-semibold">
        {label}
        {optional ? <span className="text-muted font-normal">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Base = { id: string; label: string; error?: string; optional?: boolean };

export function TextField({ id, label, error, optional, ...props }: Base & ComponentProps<"input">) {
  return (
    <Wrap id={id} label={label} error={error} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} ${error ? "border-red-400" : "border-line"}`}
        {...props}
      />
    </Wrap>
  );
}

export function SelectField({
  id,
  label,
  error,
  optional,
  options,
  placeholder,
  ...props
}: Base & ComponentProps<"select"> & { options: string[]; placeholder?: string }) {
  return (
    <Wrap id={id} label={label} error={error} optional={optional}>
      {/* React resets a form after its action runs. Text fields come back with the
          submitted values, but a <select> only takes defaultValue when it mounts, so it
          would snap back to "Choose…". Keying it on the value remounts it with the choice. */}
      <select
        key={String(props.defaultValue ?? "")}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2355607f' stroke-width='2'%3E%3Cpath d='m2 4 4 4 4-4'/%3E%3C/svg%3E")] appearance-none bg-[position:right_0.9rem_center] bg-no-repeat pr-9 ${error ? "border-red-400" : "border-line"}`}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextAreaField({ id, label, error, optional, ...props }: Base & ComponentProps<"textarea">) {
  return (
    <Wrap id={id} label={label} error={error} optional={optional}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} resize-none ${error ? "border-red-400" : "border-line"}`}
        {...props}
      />
    </Wrap>
  );
}

/** Hidden field that only bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
