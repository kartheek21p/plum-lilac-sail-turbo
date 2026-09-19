import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HeapObj, ObjColor, TraceStep } from "@/data/tracers";

const COLOR: Record<ObjColor, string> = {
  fn: "var(--obj-fn)",
  list: "var(--obj-list)",
  num: "var(--obj-num)",
  alt: "var(--obj-alt)",
  copy: "var(--obj-copy)",
};

function codeFor(steps: TraceStep[], step: TraceStep) {
  if (step.code) return step.code;
  return steps.find((s) => s.code)?.code ?? [];
}

function HeapCard({ obj }: { obj: HeapObj }) {
  return (
    <div
      className="rounded-md border border-border bg-bg px-2.5 py-2"
      style={{ borderLeftWidth: 3, borderLeftColor: COLOR[obj.color] }}
    >
      <div className="font-mono text-[10px] text-subtle">
        {obj.addr} · {obj.id}
        {obj.transit ? " · in transit" : ""}
      </div>
      <div className="font-mono text-xs font-medium text-fg">{obj.value}</div>
      <div className="text-[10px] tabular-nums text-subtle">pointers: {obj.refs}</div>
    </div>
  );
}

export function Tracer({
  steps,
  tabs,
  activeTab,
  onTab,
}: {
  steps: TraceStep[];
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTab?: (id: string) => void;
}) {
  const [idx, setIdx] = useState(0);
  const step = steps[Math.min(idx, steps.length - 1)];
  const code = useMemo(() => codeFor(steps, step), [steps, step]);

  function go(delta: number) {
    setIdx((i) => Math.max(0, Math.min(steps.length - 1, i + delta)));
  }

  function reset() {
    setIdx(0);
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-border bg-surface">
      {tabs && tabs.length > 0 ? (
        <div className="flex flex-wrap gap-1 border-b border-border bg-raised px-2 py-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onTab?.(t.id);
                setIdx(0);
              }}
              className={cn(
                "h-8 rounded-md px-2.5 text-xs",
                activeTab === t.id
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:bg-bg hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid md:grid-cols-3">
        <div className="border-b border-border p-3 md:border-b-0 md:border-r">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle">
            Code
          </div>
          <pre className="font-mono text-[11px] leading-6 text-fg">
            {code.map((line, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-sm px-1",
                  i === step.line && "bg-accent/15 outline outline-1 outline-accent/40",
                )}
              >
                <span className="inline-block w-5 text-subtle">{i + 1}</span>
                {line || " "}
              </div>
            ))}
          </pre>
        </div>

        <div className="border-b border-border p-3 md:border-b-0 md:border-r">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle">
            Call stack · top is newest
          </div>
          <div className="flex flex-col gap-1.5">
            {step.stack.length === 0 ? (
              <span className="text-xs text-subtle">empty</span>
            ) : (
              step.stack.map((frame, i) => (
                <div
                  key={`${frame.name}-${i}`}
                  className={cn(
                    "rounded-md border bg-bg px-2.5 py-2",
                    i === 0 ? "border-accent/50" : "border-border",
                  )}
                >
                  <div className="font-mono text-xs font-semibold">{frame.name}</div>
                  <div className="mt-1 space-y-0.5 font-mono text-[11px] text-muted">
                    {Object.keys(frame.locals).length === 0 ? (
                      <span className="opacity-50">—</span>
                    ) : (
                      Object.entries(frame.locals).map(([name, b]) => (
                        <div key={name} className="text-fg">
                          <span
                            className="mr-1 inline-block size-1.5 rounded-full"
                            style={{ background: COLOR[b.color] }}
                          />
                          {name} → {b.id}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle">
            Heap
          </div>
          <div className="flex flex-col gap-1.5">
            {step.heap.length === 0 ? (
              <span className="text-xs text-subtle">empty</span>
            ) : (
              step.heap.map((obj) => <HeapCard key={obj.id} obj={obj} />)
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-raised px-3 py-2">
        <Button variant="outline" size="sm" onClick={() => go(-1)} disabled={idx === 0}>
          <ChevronLeft /> Back
        </Button>
        <Button size="sm" onClick={() => go(1)} disabled={idx === steps.length - 1}>
          Next step <ChevronRight />
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw /> Restart
        </Button>
        <span className="ml-auto font-mono text-xs tabular-nums text-subtle">
          Step {idx + 1} of {steps.length}
        </span>
      </div>
      <p className="border-t border-border bg-bg/40 px-3 py-2.5 text-sm text-muted">
        {step.narration}
      </p>
    </div>
  );
}
