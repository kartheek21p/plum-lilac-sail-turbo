import type { TraceStep } from "@/data/tracers";

export const legbSteps: TraceStep[] = [
  {
    line: 0,
    code: ["x = 10", "def show():", "    print(x)", "show()"],
    stack: [{ name: "<module>", locals: { x: { id: "N1", color: "num" } } }],
    heap: [{ id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" }],
    narration: "x lives in the module frame. Next we define show.",
  },
  {
    line: 1,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          x: { id: "N1", color: "num" },
          show: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function show", refs: 1, color: "fn" },
    ],
    narration: "show is an object. It has no local x of its own.",
  },
  {
    line: 3,
    code: null,
    stack: [
      { name: "show", locals: {} },
      {
        name: "<module>",
        locals: {
          x: { id: "N1", color: "num" },
          show: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function show", refs: 1, color: "fn" },
    ],
    narration: "Inside show, print(x) looks Local → Enclosing → Global → Built-in. Local is empty, so it finds module x = 10.",
  },
];

export const unboundSteps: TraceStep[] = [
  {
    line: 0,
    code: ["x = 10", "def bump():", "    x = x + 1", "bump()"],
    stack: [{ name: "<module>", locals: { x: { id: "N1", color: "num" } } }],
    heap: [{ id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" }],
    narration: "Module x is 10. Because bump contains 'x = …', Python treats x as LOCAL for the whole function.",
  },
  {
    line: 3,
    code: null,
    stack: [
      { name: "bump", locals: {} },
      {
        name: "<module>",
        locals: {
          x: { id: "N1", color: "num" },
          bump: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function bump", refs: 1, color: "fn" },
    ],
    narration: "Call bump. Local x exists as a slot but is not bound yet.",
  },
  {
    line: 2,
    code: null,
    stack: [
      { name: "bump", locals: {} },
      {
        name: "<module>",
        locals: {
          x: { id: "N1", color: "num" },
          bump: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "N1", addr: "0x10", value: "10", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function bump", refs: 1, color: "fn" },
    ],
    narration:
      "x = x + 1 must READ local x first. Local x has no object yet → UnboundLocalError. The module's 10 is never touched.",
  },
];

export const closureSteps: TraceStep[] = [
  {
    line: 0,
    code: [
      "def make_counter():",
      "    n = 0",
      "    def inc():",
      "        nonlocal n",
      "        n = n + 1",
      "        return n",
      "    return inc",
      "c = make_counter()",
      "print(c())",
    ],
    stack: [{ name: "<module>", locals: {} }],
    heap: [{ id: "f0", addr: "0xF0", value: "function make_counter", refs: 1, color: "fn" }],
    narration: "make_counter is defined. Next we call it.",
  },
  {
    line: 7,
    code: null,
    stack: [
      {
        name: "make_counter",
        locals: { n: { id: "N0", color: "num" }, inc: { id: "f1", color: "fn" } },
      },
      { name: "<module>", locals: { make_counter: { id: "f0", color: "fn" } } },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function make_counter", refs: 1, color: "fn" },
      { id: "N0", addr: "0x10", value: "0", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function inc (closes over n)", refs: 1, color: "fn" },
    ],
    narration: "Inside make_counter: n = 0, and inc is created. inc keeps a cell pointing at n.",
  },
  {
    line: 7,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          make_counter: { id: "f0", color: "fn" },
          c: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function make_counter", refs: 1, color: "fn" },
      { id: "N0", addr: "0x10", value: "0", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function inc (closes over n)", refs: 1, color: "fn" },
    ],
    narration: "make_counter returns. Its frame is gone, but n survives because inc still points at it. That leftover box is the closure.",
  },
  {
    line: 8,
    code: null,
    stack: [
      { name: "inc", locals: {} },
      {
        name: "<module>",
        locals: {
          make_counter: { id: "f0", color: "fn" },
          c: { id: "f1", color: "fn" },
        },
      },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function make_counter", refs: 1, color: "fn" },
      { id: "N1", addr: "0x11", value: "1", refs: 1, color: "num" },
      { id: "f1", addr: "0xF1", value: "function inc (closes over n)", refs: 1, color: "fn" },
    ],
    narration: "c() runs inc. nonlocal n moves the cell from 0 to a new integer 1. print shows 1. Call again and you get 2.",
  },
];

export const generatorSteps: TraceStep[] = [
  {
    line: 0,
    code: [
      "def walk():",
      "    yield 'a'",
      "    yield 'b'",
      "g = walk()",
      "print(next(g))",
      "print(next(g))",
    ],
    stack: [{ name: "<module>", locals: { walk: { id: "f0", color: "fn" } } }],
    heap: [{ id: "f0", addr: "0xF0", value: "function walk", refs: 1, color: "fn" }],
    narration: "walk is a function. Calling it will NOT run the body yet.",
  },
  {
    line: 3,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          walk: { id: "f0", color: "fn" },
          g: { id: "G1", color: "alt" },
        },
      },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function walk", refs: 1, color: "fn" },
      { id: "G1", addr: "0xG1", value: "generator walk (paused before line 2)", refs: 1, color: "alt" },
    ],
    narration: "g = walk() creates a generator object. The frame is frozen inside that object. Body has not run.",
  },
  {
    line: 4,
    code: null,
    stack: [
      { name: "walk", locals: {} },
      {
        name: "<module>",
        locals: {
          walk: { id: "f0", color: "fn" },
          g: { id: "G1", color: "alt" },
        },
      },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function walk", refs: 1, color: "fn" },
      { id: "G1", addr: "0xG1", value: "generator walk (paused at first yield)", refs: 1, color: "alt" },
      { id: "S1", addr: "0xA1", value: "'a'", refs: 1, color: "num" },
    ],
    narration: "next(g) runs until yield 'a'. The frame PAUSES. Locals stay alive inside the generator. print shows a.",
  },
  {
    line: 5,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          walk: { id: "f0", color: "fn" },
          g: { id: "G1", color: "alt" },
        },
      },
    ],
    heap: [
      { id: "f0", addr: "0xF0", value: "function walk", refs: 1, color: "fn" },
      { id: "G1", addr: "0xG1", value: "generator walk (exhausted)", refs: 1, color: "alt" },
      { id: "S2", addr: "0xB1", value: "'b'", refs: 1, color: "copy" },
    ],
    narration: "Second next(g) resumes where it left off, yields 'b', then the function ends. Further next(g) raises StopIteration.",
  },
];

export const classSteps: TraceStep[] = [
  {
    line: 0,
    code: [
      "class Box:",
      "    def __init__(self, n):",
      "        self.n = n",
      "a = Box(1)",
      "b = Box(2)",
    ],
    stack: [{ name: "<module>", locals: { Box: { id: "C1", color: "fn" } } }],
    heap: [{ id: "C1", addr: "0xC1", value: "class Box", refs: 1, color: "fn" }],
    narration: "class Box creates a class object. __init__ lives on the class, not on each instance.",
  },
  {
    line: 3,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          Box: { id: "C1", color: "fn" },
          a: { id: "I1", color: "list" },
        },
      },
    ],
    heap: [
      { id: "C1", addr: "0xC1", value: "class Box", refs: 1, color: "fn" },
      { id: "I1", addr: "0xA1", value: "Box instance {n: 1}", refs: 1, color: "list" },
      { id: "N1", addr: "0x10", value: "1", refs: 1, color: "num" },
    ],
    narration: "Box(1) allocates a new instance, then calls __init__(self, 1). self.n = n sticks a label n on the instance pointing at 1.",
  },
  {
    line: 4,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          Box: { id: "C1", color: "fn" },
          a: { id: "I1", color: "list" },
          b: { id: "I2", color: "alt" },
        },
      },
    ],
    heap: [
      { id: "C1", addr: "0xC1", value: "class Box", refs: 1, color: "fn" },
      { id: "I1", addr: "0xA1", value: "Box instance {n: 1}", refs: 1, color: "list" },
      { id: "I2", addr: "0xA2", value: "Box instance {n: 2}", refs: 1, color: "alt" },
      { id: "N1", addr: "0x10", value: "1", refs: 1, color: "num" },
      { id: "N2", addr: "0x20", value: "2", refs: 1, color: "copy" },
    ],
    narration: "Two instances. Same class object, two dictionaries of attributes. Changing a.n never moves b.n.",
  },
];
