import type { ReactNode } from "react";
import { useState } from "react";
import { Tracer } from "@/components/handbook/tracer";
import { Quiz } from "@/components/handbook/quiz";
import { ch1Steps, ch2Scenarios } from "@/data/tracers";

function Callout({
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
      ? "border-warn/35 bg-warn/8"
      : kind === "model"
        ? "border-accent/30 bg-raised"
        : "border-accent/35 bg-accent/8";
  return (
    <div className={`my-3 rounded-lg border px-3.5 py-3 ${border}`}>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-fg">
        {title}
      </div>
      <div className="text-sm text-muted">{children}</div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="my-3 overflow-x-auto rounded-lg border border-border bg-code px-3.5 py-3 font-mono text-[12px] leading-6 text-fg">
      {children}
    </pre>
  );
}

function H({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      {children}
    </section>
  );
}

export function HandbookBody() {
  const [scenario, setScenario] = useState("mutate");
  const current = ch2Scenarios[scenario];

  return (
    <article className="mx-auto max-w-[42rem] space-y-8 pb-16 pt-6">
      <H id="intro">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Volume 1 · Python memory
        </p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-balance">
          The AI Builder's Handbook
        </h1>
        <p className="mt-3 text-base text-muted text-pretty">
          Learn Python by watching what happens in memory — not by memorizing
          syntax. This is the base you need to read production code and later
          build scalable AI apps.
        </p>
        <Callout title="The bet">
          People who read code fluently are not people who remember syntax. They
          are people who can see what the code does to memory as it runs. Syntax
          can be looked up in seconds. A wrong mental picture cannot.
        </Callout>
        <p className="text-sm text-muted">
          You do not need a programming background. Every chapter starts from a
          picture you can hold in your head, then shows how Python actually
          behaves, then applies it to real code.
        </p>
      </H>

      <H id="three">
        <h2 className="font-display text-xl font-medium tracking-tight">
          The three questions
        </h2>
        <p className="mt-2 text-sm text-muted">
          When you meet any piece of code, ask these. They are the spine of
          Volume 1.
        </p>
        <ol className="mt-3 space-y-2">
          {[
            "What objects get created here, and where do they live?",
            "Which names (or containers) point at each object?",
            "When does each object stop being needed?",
          ].map((q, i) => (
            <li
              key={q}
              className="flex gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-fg">
                {i + 1}
              </span>
              {q}
            </li>
          ))}
        </ol>
      </H>

      <H id="roadmap">
        <h2 className="font-display text-xl font-medium tracking-tight">
          Full roadmap
        </h2>
        <p className="mt-2 text-sm text-muted">
          What you still need after these two chapters, in order.
        </p>
        <div className="mt-3 space-y-2">
          {[
            { badge: "Now", t: "Vol 1 · Ch 1–2", d: "Memory, names, stack/heap, mutation vs rebinding" },
            { badge: "Next", t: "Vol 1 · Ch 3–6", d: "Scopes (LEGB), closures, generators, context managers, exceptions, modules" },
            { badge: "Later", t: "Vol 2 · Data", d: "Lists/dicts/sets in depth, comprehensions, *args/**kwargs" },
            { badge: "Later", t: "Vol 3 · Classes", d: "Attributes, inheritance, dunder methods, dataclasses — the shape of models & agents" },
            { badge: "Later", t: "Vol 4 · Production", d: "Type hints, async/await, logging, testing, packaging" },
            { badge: "Later", t: "Vol 5–6 · AI stack", d: "Tensors as objects, agent state, APIs, caching, streaming, batching" },
          ].map((row) => (
            <div
              key={row.t}
              className="flex gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
            >
              <span className="mt-0.5 shrink-0 rounded-sm bg-raised px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-subtle">
                {row.badge}
              </span>
              <div>
                <div className="text-sm font-medium">{row.t}</div>
                <p className="text-xs text-muted">{row.d}</p>
              </div>
            </div>
          ))}
        </div>
      </H>

      <H id="ch1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Chapter 1
        </p>
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Memory, names, the stack and the heap
        </h2>
        <p className="mt-2 text-sm text-muted">
          A program is a list of instructions plus the data those instructions
          work on. That data lives in memory.
        </p>
        <p className="text-sm text-muted">
          Picture memory as a warehouse of numbered shelves. Each shelf has an
          address. You put something on a shelf, remember the number, look at it
          later, and throw it away when nobody needs it. That is all Python
          does.
        </p>
      </H>

      <H id="ch1-objects">
        <h3 className="text-lg font-medium">Objects: everything is a thing</h3>
        <p className="mt-2 text-sm text-muted">
          A number is an object. Text is an object. A list is an object. Even a
          function is an object. Each object has three properties:
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            ["Identity", "Which shelf it sits on. Never changes."],
            ["Type", "What kind of thing it is (number, list…)."],
            ["Value", "What it currently contains."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-border bg-surface p-3">
              <div className="text-sm font-medium">{t}</div>
              <p className="mt-1 text-xs text-muted">{d}</p>
            </div>
          ))}
        </div>
        <Code>{`price = 250
print(type(price))   # int  — the type
print(id(price))     # a big number — the identity
print(price)         # 250 — the value`}</Code>
      </H>

      <H id="ch1-names">
        <h3 className="text-lg font-medium">Names are labels, not boxes</h3>
        <Callout title="Mental model" kind="model">
          A variable is a name tag. The object sits on a shelf. Assigning with{" "}
          <code className="font-mono text-fg">=</code> means “stick this label
          on that object”. It never copies the object.
        </Callout>
        <Code>{`a = [1, 2, 3]     # create a list, stick label a on it
b = a             # second label on the SAME object. No copy.
c = [1, 2, 3]     # a NEW list that happens to look the same

a == b            # True   same value
a is b            # True   same object
a == c            # True   same value
a is c            # False  different objects`}</Code>
        <p className="text-sm text-muted">
          <code className="font-mono">==</code> asks “same value?”{" "}
          <code className="font-mono">is</code> asks “literally the same
          object?” Twins are equal. One person with two nicknames is the same
          object.
        </p>
      </H>

      <H id="ch1-heap">
        <h3 className="text-lg font-medium">The heap</h3>
        <Callout title="Rule of the heap" kind="model">
          An object stays alive as long as at least one label (or container)
          points to it. When the last pointer goes away, Python frees it.
        </Callout>
        <p className="text-sm text-muted">
          A list does not contain its items like a bag contains apples. It holds
          a row of arrows to objects elsewhere on the heap. That is why two
          lists can share an item.
        </p>
      </H>

      <H id="ch1-stack">
        <h3 className="text-lg font-medium">The call stack</h3>
        <p className="mt-2 text-sm text-muted">
          A function call gets a frame: a private workspace for that call’s
          local names. Frames stack like plates. Newest on top. When the call
          returns, the plate is removed and its names disappear.
        </p>
        <Callout title="Key sentence">
          Names live in frames. Objects live on the heap. Names point at
          objects. When a frame disappears, objects that lose their last pointer
          are freed. Objects someone else still points at survive.
        </Callout>
      </H>

      <H id="ch1-trace">
        <h3 className="text-lg font-medium">Watch it happen</h3>
        <p className="mt-2 text-sm text-muted">
          Step through this small program. Left: the line that just ran. Middle:
          the stack. Right: the heap. Matching colors mean “this name points at
          that object.”
        </p>
        <Tracer steps={ch1Steps} />
      </H>

      <H id="ch1-check">
        <h3 className="text-lg font-medium">Check yourself</h3>
        <p className="mt-2 text-sm text-muted">Answer before you open each one.</p>
        <Quiz
          items={[
            {
              q: "Two functions each have a name pointing at the same list. One appends. Does the other see it?",
              a: "Yes. One list object, two labels. An in-place change through either label is visible through both.",
            },
            {
              q: "x = [1, 2], then y = x, then y = [3]. What does print(x) show?",
              a: "[1, 2]. y = [3] creates a new list and moves only the label y. x still points at the original.",
            },
            {
              q: "A list is referenced only by result. You run del result. What happens?",
              a: "Its pointer count drops to zero and Python frees it immediately.",
            },
          ]}
        />
      </H>

      <H id="ch2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle">
          Chapter 2
        </p>
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Pass-by-assignment
        </h2>
        <Callout title="The question">
          When I hand something to a function, can the function change my
          original? Sometimes yes, sometimes no. Two ideas explain every case:
          how the object is handed over, and whether that kind of object can be
          edited at all.
        </Callout>
        <Callout title="Mental model" kind="model">
          Calling f(x) is the same as writing parameter = x inside a fresh
          frame. A new label is stuck onto the same object. No copy is made, and
          the function cannot move your label.
        </Callout>
        <p className="text-sm text-muted">
          Inside the function you can mutate the object (everyone sees it) or
          rebind the name (only the function’s own label moves).
        </p>
      </H>

      <H id="ch2-mutable">
        <h3 className="text-lg font-medium">Mutable vs immutable</h3>
        <div className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs text-subtle">
                <th className="border border-border bg-surface px-3 py-2">Cannot be edited</th>
                <th className="border border-border bg-surface px-3 py-2">Can be edited in place</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2">int, float, bool, str, tuple, None</td>
                <td className="border border-border px-3 py-2">list, dict, set, most class instances</td>
              </tr>
            </tbody>
          </table>
        </div>
      </H>

      <H id="ch2-trace">
        <h3 className="text-lg font-medium">Five scenarios</h3>
        <p className="mt-2 text-sm text-muted">
          Pick a tab. Watch pointer counts. The caller sees a change only when
          the function mutates an object both sides can reach.
        </p>
        <Tracer
          steps={current.steps}
          tabs={Object.entries(ch2Scenarios).map(([id, s]) => ({
            id,
            label: s.label,
          }))}
          activeTab={scenario}
          onTab={setScenario}
        />
        <Callout title="The rule" kind="model">
          Rebinding a name never crosses the frame boundary. Mutation of a
          shared object always does.
        </Callout>
        <Callout title="Default arguments" kind="warn">
          Default values like <code className="font-mono text-fg">=[]</code> are
          created once, when def runs, not on every call. Use{" "}
          <code className="font-mono text-fg">None</code> as the placeholder and
          create a fresh list inside the function.
        </Callout>
      </H>

      <H id="ch2-check">
        <h3 className="text-lg font-medium">Check yourself</h3>
        <Quiz
          items={[
            {
              q: "def f(x): x = x + [1]. You call f(a) with a list a. Does a change?",
              a: "No. x + [1] builds a new list and only the local label moves.",
            },
            {
              q: "def f(x): x += [1]. Same call. Does a change?",
              a: "Yes. For lists, += extends in place, and x and a point at that one list.",
            },
            {
              q: "Why is def track(seen=set()) dangerous?",
              a: "The set is created once at def time. Every call that omits seen shares and mutates that same set.",
            },
            {
              q: "grid = [[0] * 2] * 2 then grid[0][0] = 5. What prints?",
              a: "[[5, 0], [5, 0]]. The outer list holds two pointers to one row object.",
            },
          ]}
        />
        <p className="mt-6 text-sm text-muted">
          Next chapter: scopes (LEGB) — where Python looks when you use a name,
          and why a function can read outside names but not easily rebind them.
        </p>
      </H>
    </article>
  );
}
