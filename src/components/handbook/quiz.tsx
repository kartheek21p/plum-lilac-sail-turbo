import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuizItem = { q: string; a: string };

export function Quiz({ items }: { items: QuizItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="my-4 flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 px-3.5 py-3 text-left text-sm font-medium"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="mt-0.5 flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted">
                {isOpen ? "Hide" : "Show"}
                <ChevronDown
                  className={cn("size-3.5 transition-transform", isOpen && "rotate-180")}
                />
              </span>
            </button>
            {isOpen ? (
              <p className="border-t border-border px-3.5 py-2.5 text-sm text-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
