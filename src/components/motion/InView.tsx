"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

type Tag = "div" | "ul" | "ol" | "section" | "p" | "span";

/**
 * Adds the class "is-in" the first time this element scrolls into view.
 * The animations themselves are plain CSS keyed off "is-in" (see globals.css),
 * and are only hidden beforehand under html.js, so content is never stuck invisible.
 */
export function InView({
  as = "div",
  className,
  children,
  margin = "0px 0px -12% 0px",
  ...rest
}: {
  as?: Tag;
  className?: string;
  children?: ReactNode;
  margin?: string;
  id?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  const Element = as as "div";
  return (
    <Element ref={ref as RefObject<HTMLDivElement>} className={className} {...rest}>
      {children}
    </Element>
  );
}
