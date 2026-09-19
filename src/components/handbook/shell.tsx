import { useEffect, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { NAV } from "@/data/nav";
import { HandbookBody } from "@/components/handbook/content";
import { cn } from "@/lib/utils";

function NavLinks({
  current,
  onPick,
}: {
  current: string;
  onPick: (id: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => onPick(item.id)}
          className={cn(
            "rounded-md px-2 py-1.5 text-sm transition-colors",
            item.level === 1 && "pl-4 text-[13px]",
            current === item.id
              ? "bg-accent/15 font-medium text-fg"
              : "text-muted hover:bg-raised hover:text-fg",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function HandbookShell() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("intro");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      let active = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) active = id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function pick(id: string) {
    setCurrent(id);
    setOpen(false);
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[15.5rem] overflow-y-auto border-r border-border bg-surface px-3 py-5 md:block">
        <div className="mb-5 flex items-center gap-2 px-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-fg">
            <BookOpen className="size-4" />
          </span>
          <div>
            <div className="text-sm font-semibold leading-tight">AI Builder</div>
            <div className="text-[11px] text-subtle">Handbook · Vol 1</div>
          </div>
        </div>
        <NavLinks current={current} onPick={pick} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/70"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[16rem] overflow-y-auto border-r border-border bg-surface px-3 py-5">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="text-sm font-semibold">Contents</span>
              <button type="button" className="size-10" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <NavLinks current={current} onPick={pick} />
          </div>
        </div>
      ) : null}

      <div className="md:pl-[15.5rem]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-md">
          <button
            type="button"
            className="flex size-10 items-center justify-center md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-raised">
            <div
              className="h-full bg-accent transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="hidden text-[11px] text-subtle sm:inline">Volume 1</span>
        </header>
        <main className="px-4 sm:px-6">
          <HandbookBody />
        </main>
      </div>
    </div>
  );
}
