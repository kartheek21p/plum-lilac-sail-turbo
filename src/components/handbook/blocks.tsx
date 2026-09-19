import type { ReactNode } from "react";

export function Callout({
  title,
  kind = "key",
  children,
}: {
  title: string;
  kind?: "key" | "model" | "warn";
  children: ReactNode;
}) {
  const border =
    kind === "warn"
      ? "border-warn/40 bg-warn/10"
      : kind === "model"
        ? "border-border bg-raised"
        : "border-fg/20 bg-raised";
  return (
    <div className={`my-3 rounded-lg border px-3.5 py-3 ${border}`}>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-fg">
        {title}
      </div>
      <div className="text-sm text-muted">{children}</div>
    </div>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-lg border border-border bg-code px-3.5 py-3 font-mono text-[12px] leading-6 text-code-fg">
      {children}
    </pre>
  );
}

export function H({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      {children}
    </section>
  );
}

export function ChapterHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
        {kicker}
      </p>
      <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{title}</h2>
    </>
  );
}
