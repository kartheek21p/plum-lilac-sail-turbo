import { useState } from "react";
import { Callout, Code, H, ChapterHead } from "@/components/handbook/blocks";
import { Quiz } from "@/components/handbook/quiz";
import { Tracer } from "@/components/handbook/tracer";
import {
  classSteps,
  closureSteps,
  generatorSteps,
  legbSteps,
  unboundSteps,
} from "@/data/extra-tracers";

export function ChaptersRest() {
  const [scopeTab, setScopeTab] = useState<"read" | "write">("read");

  return (
    <>
      <H id="ch3">
        <ChapterHead kicker="Chapter 3" title="Scopes (LEGB)" />
        <p className="mt-2 text-sm text-muted">
          When Python sees a name, it looks in four places, in order: Local,
          Enclosing, Global, Built-in. That is LEGB. It does not search “nearby
          lines.” It searches frames.
        </p>
        <Callout title="Mental model" kind="model">
          Each function call has its own drawer of name tags (Local). Nested
          functions can see the drawer of the function that created them
          (Enclosing). The file itself is Global. Built-in is the pre-loaded
          drawer (len, print, range).
        </Callout>
        <p className="text-sm text-muted">
          Reading a name walks LEGB. Assigning a name with{" "}
          <code className="font-mono">=</code> always writes to Local — unless
          you mark it <code className="font-mono">global</code> or{" "}
          <code className="font-mono">nonlocal</code>. That is why a function
          can print an outer x, but <code className="font-mono">x = x + 1</code>{" "}
          inside the function explodes.
        </p>
        <Tracer
          steps={scopeTab === "read" ? legbSteps : unboundSteps}
          tabs={[
            { id: "read", label: "Reading outer x" },
            { id: "write", label: "UnboundLocalError" },
          ]}
          activeTab={scopeTab}
          onTab={(id) => setScopeTab(id as "read" | "write")}
        />
        <Quiz
          items={[
            {
              q: "Why can a function print a module-level name, but not do x = x + 1 on it?",
              a: "Any assignment makes x local for the whole function. The read of x then looks only in Local, which is empty — UnboundLocalError. Use nonlocal/global, or don’t assign.",
            },
          ]}
        />
      </H>

      <H id="ch4">
        <ChapterHead kicker="Chapter 4" title="Closures" />
        <p className="mt-2 text-sm text-muted">
          A closure is a function that keeps living after the frame that created
          it is gone — because it still points at names from that frame.
        </p>
        <Callout title="Mental model" kind="model">
          When a nested function uses an outer name, Python puts that name in a
          small shared box (a cell). The inner function carries the box with it.
          The outer frame can die. The box stays.
        </Callout>
        <Tracer steps={closureSteps} />
        <Callout title="Late binding" kind="warn">
          A classic trap:{" "}
          <code className="font-mono text-fg">
            [lambda: i for i in range(3)]
          </code>{" "}
          — all three functions close over the same i. When you call them, i is
          already 2. Capture the value:{" "}
          <code className="font-mono text-fg">lambda i=i: i</code>.
        </Callout>
        <p className="text-sm text-muted">
          Decorators, callbacks, and agent tools are closures. When you see a
          function returned from another function, ask: which outer names does
          it still point at, and do they mutate?
        </p>
        <Quiz
          items={[
            {
              q: "After make_counter returns, why is n not freed?",
              a: "inc still points at n through a closure cell. Reference count is not zero.",
            },
          ]}
        />
      </H>

      <H id="ch5">
        <ChapterHead kicker="Chapter 5" title="Iterators and generators" />
        <p className="mt-2 text-sm text-muted">
          A for-loop does not “contain” a list. It asks an iterator for the next
          object, over and over, until the iterator says it is done
          (StopIteration).
        </p>
        <Callout title="Mental model" kind="model">
          An iterator is a cursor over a stream of objects. A generator is a
          frozen function call: yield pauses the frame, keeps its locals, and
          hands one object back. next() resumes the same frame.
        </Callout>
        <Tracer steps={generatorSteps} />
        <Code>{`# for x in items:  is roughly
it = iter(items)
while True:
    try:
        x = next(it)
    except StopIteration:
        break
    ...`}</Code>
        <p className="text-sm text-muted">
          Streaming LLM tokens, file readers, and data loaders are this picture:
          one object at a time, frame paused, memory stays small.
        </p>
        <Quiz
          items={[
            {
              q: "Does g = walk() run the body of walk?",
              a: "No. It builds a generator object with a paused frame. next(g) runs until the first yield.",
            },
          ]}
        />
      </H>

      <H id="ch6">
        <ChapterHead kicker="Chapter 6" title="Context managers" />
        <p className="mt-2 text-sm text-muted">
          <code className="font-mono">with</code> is a promise: set something
          up, then tear it down even if the block crashes.
        </p>
        <Callout title="Mental model" kind="model">
          with obj as name: calls obj.__enter__() (the result is name), runs the
          block, then always calls obj.__exit__(), even after an exception.
        </Callout>
        <Code>{`with open("log.txt") as f:
    data = f.read()
# file is closed here, crash or not

from contextlib import contextmanager
@contextmanager
def span(name):
    print("start", name)
    yield
    print("end", name)`}</Code>
        <p className="text-sm text-muted">
          Database sessions, GPU devices, tracing spans, and locks are context
          managers. If you see a resource used without with, ask when it is
          released (question 3).
        </p>
        <Quiz
          items={[
            {
              q: "If the with-block raises, does __exit__ still run?",
              a: "Yes. That is the point. __exit__ receives the exception and can swallow it or let it fly.",
            },
          ]}
        />
      </H>

      <H id="ch7">
        <ChapterHead kicker="Chapter 7" title="Exceptions" />
        <p className="mt-2 text-sm text-muted">
          An exception is an object. Raising it unwinds the stack: frames pop
          until some except matches the type, or the program dies and prints the
          traceback you already learned to read in Chapter 1.
        </p>
        <Code>{`try:
    parse(row)
except KeyError as e:
    log.warning("skip %s", e)
    continue
finally:
    # always runs: success, skip, or crash
    close(temp)`}</Code>
        <Callout title="Reading rule">
          Bare except: or except Exception: that swallows everything hides
          bugs. Catch the error you can handle. Let the rest surface.
        </Callout>
        <Quiz
          items={[
            {
              q: "What does a traceback show?",
              a: "The call stack at the moment of failure, newest frame last. Read bottom-up: error, then how you got there.",
            },
          ]}
        />
      </H>

      <H id="ch8">
        <ChapterHead kicker="Chapter 8" title="Modules and imports" />
        <p className="mt-2 text-sm text-muted">
          A .py file is a module: one object with a dictionary of names. import
          runs the file once, caches that object, and binds a name in the
          importer’s frame.
        </p>
        <Callout title="Mental model" kind="model">
          import math does not copy functions into your file. It sticks the
          label math on the module object. math.sqrt is a name lookup on that
          object. from math import sqrt sticks a second label sqrt on the same
          function object.
        </Callout>
        <Code>{`# app.py
import reports          # creates/caches the reports module object
from reports import load
load is reports.load    # True: two labels, one function`}</Code>
        <p className="text-sm text-muted">
          Circular imports and “it works in the notebook but not as a script”
          are almost always this: when did the module object get created, and
          which names were bound yet?
        </p>
      </H>

      <H id="ch9">
        <ChapterHead kicker="Chapter 9 · Volume 2" title="Control flow" />
        <p className="mt-2 text-sm text-muted">
          if / elif / else pick a branch. for walks an iterator. while repeats
          until a condition is false. None of these copy data. They only decide
          which instruction runs next, in the current frame.
        </p>
        <Code>{`for item in batch:
    if item is None:
        continue
    if item["ok"]:
        yield item
    else:
        break`}</Code>
        <p className="text-sm text-muted">
          continue skips to the next iterator item. break leaves the loop.
          return leaves the whole function (pops the frame).
        </p>
      </H>

      <H id="ch10">
        <ChapterHead kicker="Chapter 10" title="Lists, dicts, sets" />
        <p className="mt-2 text-sm text-muted">
          These three are the workhorses of production Python. All are mutable.
          All hold pointers, not copies.
        </p>
        <div className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs text-subtle">
                <th className="border border-border bg-surface px-3 py-2">Type</th>
                <th className="border border-border bg-surface px-3 py-2">Picture</th>
                <th className="border border-border bg-surface px-3 py-2">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-3 py-2 font-mono">list</td>
                <td className="border border-border px-3 py-2">Ordered row of arrows</td>
                <td className="border border-border px-3 py-2">Sequence, stack, batch</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono">dict</td>
                <td className="border border-border px-3 py-2">Label → object map</td>
                <td className="border border-border px-3 py-2">Records, JSON, configs</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono">set</td>
                <td className="border border-border px-3 py-2">Bag of unique objects</td>
                <td className="border border-border px-3 py-2">Membership, dedupe</td>
              </tr>
              <tr>
                <td className="border border-border px-3 py-2 font-mono">tuple</td>
                <td className="border border-border px-3 py-2">Fixed row of arrows</td>
                <td className="border border-border px-3 py-2">Records, dict keys</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout title="Dict keys" kind="warn">
          Keys must be hashable — in practice, immutable. A list cannot be a
          key. A tuple of strings can. If a key could change, its lookup slot
          would move and the dict would lose it.
        </Callout>
        <Quiz
          items={[
            {
              q: "d = {\"user\": {\"id\": 1}}; e = d; e[\"user\"][\"id\"] = 2. What is d?",
              a: "Same nested dict. e is an alias. The inner dict was mutated in place.",
            },
          ]}
        />
      </H>

      <H id="ch11">
        <ChapterHead kicker="Chapter 11" title="Comprehensions" />
        <p className="mt-2 text-sm text-muted">
          A comprehension is a tiny function-like scope that builds a new
          container. It does not mutate the source.
        </p>
        <Code>{`squares = [n * n for n in nums if n > 0]
index = {row["id"]: row for row in rows}
unique = {user["email"] for user in users}

# the shared-row bug, from Ch 2:
grid = [[0] * 3 for _ in range(3)]   # three separate rows
bad  = [[0] * 3] * 3                 # one row, three arrows`}</Code>
        <p className="text-sm text-muted">
          Generator expressions (parentheses) produce values lazily — same
          pause/resume picture as Chapter 5.
        </p>
      </H>

      <H id="ch12">
        <ChapterHead kicker="Chapter 12" title="Functions as values" />
        <p className="mt-2 text-sm text-muted">
          Functions are objects. You can pass them, store them, return them.
          That is how tools, callbacks, and decorators work.
        </p>
        <Code>{`def apply(fn, data):
    return fn(data)

def with_retry(fn):
    def wrapped(*args, **kwargs):
        for attempt in range(3):
            try:
                return fn(*args, **kwargs)
            except TimeoutError:
                if attempt == 2:
                    raise
    return wrapped

@with_retry
def fetch(url): ...

# *args = extra positional objects in a tuple
# **kwargs = extra named objects in a dict`}</Code>
        <Callout title="Decorator" kind="model">
          @with_retry above fetch is fetch = with_retry(fetch). A new function
          object wraps the old one. Same name, different object.
        </Callout>
      </H>

      <H id="ch13">
        <ChapterHead kicker="Chapter 13 · Volume 3" title="Classes" />
        <p className="mt-2 text-sm text-muted">
          A class is a blueprint object. Calling it allocates an instance, then
          runs __init__. Attributes are just names on the instance (or, if
          missing, on the class).
        </p>
        <Tracer steps={classSteps} />
        <Code>{`a.n          # lookup: instance dict, then class
a.n = 5      # always writes on the instance
Box.kind = "wood"   # shared by all instances that don't override`}</Code>
        <p className="text-sm text-muted">
          Hugging Face models, nn.Module, and LangChain tools are this: one
          class, many instances, each with its own state dictionary.
        </p>
        <Quiz
          items={[
            {
              q: "Two Box instances — do they share __init__?",
              a: "Yes. Methods live on the class. Each instance is passed as self. Data (self.n) lives on the instance.",
            },
          ]}
        />
      </H>

      <H id="ch14">
        <ChapterHead kicker="Chapter 14" title="Inheritance and dunder methods" />
        <p className="mt-2 text-sm text-muted">
          Inheritance is a lookup chain: instance → class → base classes. Dunder
          methods (__len__, __call__, __getitem__) are how Python turns your
          object into something that behaves like a function, a list, or a
          number.
        </p>
        <Code>{`class Tool:
    def __call__(self, text):
        return self.run(text)

class Search(Tool):
    def run(self, text):
        return db.find(text)

search = Search()
search(" grok")     # Search.__call__ from Tool, then Search.run`}</Code>
        <p className="text-sm text-muted">
          If you can call it like a function, it has __call__. If you can index
          it, it has __getitem__. Read production classes by scanning these
          names first.
        </p>
      </H>

      <H id="ch15">
        <ChapterHead kicker="Chapter 15" title="Dataclasses" />
        <p className="mt-2 text-sm text-muted">
          A dataclass is a class whose __init__, equality, and repr are
          generated from typed fields. Still ordinary objects on the heap.
        </p>
        <Code>{`from dataclasses import dataclass, field

@dataclass
class Turn:
    role: str
    content: str
    meta: dict = field(default_factory=dict)  # not {} — Ch 2 trap

t1 = Turn("user", "hi")
t2 = Turn("user", "hi")
t1 == t2          # True: compares field values
t1 is t2          # False: two objects`}</Code>
        <Callout title="frozen=True">
          Makes instances roughly immutable: assigning t.role = … raises. Inner
          lists/dicts can still mutate unless you avoid them. Same “shallow
          immutability” as tuples.
        </Callout>
      </H>

      <H id="ch16">
        <ChapterHead kicker="Chapter 16 · Volume 4" title="Type hints" />
        <p className="mt-2 text-sm text-muted">
          Hints are notes for humans and checkers. They do not change what
          happens at runtime (unless a library reads them). They tell you what
          object you should expect.
        </p>
        <Code>{`from typing import Callable, Sequence

def embed(texts: Sequence[str], model: str) -> list[list[float]]:
    ...

ToolFn = Callable[[str], str]`}</Code>
        <p className="text-sm text-muted">
          In production AI code, the type of a field (list vs dict vs None) is
          often the bug. Read the hints as a map of objects, then verify with
          the three questions.
        </p>
      </H>

      <H id="ch17">
        <ChapterHead kicker="Chapter 17" title="Async and await" />
        <p className="mt-2 text-sm text-muted">
          async def builds a coroutine — a generator-like object. await pauses
          this task so the event loop can run another. It is cooperative
          multitasking, not threads.
        </p>
        <Callout title="Mental model" kind="model">
          One thread, many paused frames. await is yield for I/O: “I am waiting
          on the network; run someone else.” CPU-heavy work still blocks the
          loop unless you push it to a thread or process.
        </Callout>
        <Code>{`async def load_user(id: str) -> dict:
    row = await db.fetch(id)      # pause here
    return row

async def page():
    a, b = await asyncio.gather(load_user("1"), load_user("2"))
    return a, b`}</Code>
        <p className="text-sm text-muted">
          FastAPI routes, streaming chat, and most agent runtimes are async.
          Mixing blocking time.sleep or heavy NumPy into async code stalls every
          other request.
        </p>
        <Quiz
          items={[
            {
              q: "Does async run functions in parallel on many cores?",
              a: "No. One event loop, one thread by default. Overlap happens while tasks wait on I/O. CPU work needs a pool.",
            },
          ]}
        />
      </H>

      <H id="ch18">
        <ChapterHead kicker="Chapter 18" title="Tests, logs, packaging" />
        <p className="mt-2 text-sm text-muted">
          Production code is code you can rerun, observe, and install.
        </p>
        <Code>{`# pytest: a function named test_* that would explode if wrong
def test_make_config_does_not_mutate_defaults():
    d = {"timeout": 30}
    cfg = make_config(d, {"timeout": 5})
    assert d["timeout"] == 30
    assert cfg["timeout"] == 5

# logging: a stream of events, not print
log.info("cache hit", extra={"key": key})

# packaging: pyproject.toml + a venv so "it works on my machine" is a file`}</Code>
        <p className="text-sm text-muted">
          The best tests for this book are pointer tests: did we mutate the
          shared object, or return a new one?
        </p>
      </H>

      <H id="ch19">
        <ChapterHead kicker="Chapter 19 · Volume 5" title="Arrays and tensors" />
        <p className="mt-2 text-sm text-muted">
          A NumPy array or PyTorch tensor is still an object: identity, type,
          value. The value is a block of numbers plus shape, dtype, and (for
          tensors) device. Views vs copies is Chapter 2 again.
        </p>
        <Callout title="Mental model" kind="model">
          a[1:5] often returns a view: a new object whose data pointer aims at
          the same memory. Mutating the view mutates the original. .clone() /
          .copy() allocates a new block.
        </Callout>
        <Code>{`t = torch.zeros(3, device="cuda")
u = t[:2]            # often a view — same storage
u.add_(1)            # in-place: t is now [1, 1, 0]
v = t.clone()        # new storage
v.add_(5)            # t unchanged`}</Code>
        <p className="text-sm text-muted">
          .to("cuda") builds a new tensor on another device (new object).
          In-place methods (ending in _) mutate. Same radar as list.append.
        </p>
        <Quiz
          items={[
            {
              q: "Why can slicing a tensor surprise you like a list alias?",
              a: "The slice object can share storage with the original. In-place ops through either name change the same numbers.",
            },
          ]}
        />
      </H>

      <H id="ch20">
        <ChapterHead kicker="Chapter 20" title="Agent state" />
        <p className="mt-2 text-sm text-muted">
          An agent is a loop: state in, tool/LLM out, state updated. Bugs are
          almost always Chapter 2 — a step mutated a shared dict that a later
          step still held.
        </p>
        <Code>{`state = {"messages": [], "scratch": {}}

def step(state, tool):
    # BAD: mutates the one dict everyone points at
    state["scratch"]["last"] = tool()
    return state

def step_safe(state, tool):
    # GOOD: new outer dict; copy inner if you will edit it
    scratch = {**state["scratch"], "last": tool()}
    return {**state, "scratch": scratch}`}</Code>
        <Callout title="The three questions, last time">
          1. What objects did this step create? 2. Who still points at the old
          ones? 3. When is the transcript / cache / tensor freed? If a long-running
          service holds a pointer in a global, a cache, or a default argument,
          that object lives until process exit.
        </Callout>
        <p className="text-sm text-muted">
          You now have the whole spine: names, frames, mutation, scopes,
          closures, generators, classes, async, tensors. Syntax you look up.
          This picture you keep. When you open production code, start with the
          three questions — not the grammar.
        </p>
        <Quiz
          items={[
            {
              q: "A graph node does state['messages'].append(msg) and returns state. Who sees the new message?",
              a: "Everyone still holding that list — previous nodes, loggers, retries. append mutates in place. Return a new list if isolation matters.",
            },
          ]}
        />
      </H>
    </>
  );
}
