export type ObjColor = "fn" | "list" | "num" | "alt" | "copy";

export type Binding = { id: string; color: ObjColor };

export type Frame = {
  name: string;
  locals: Record<string, Binding>;
};

export type HeapObj = {
  id: string;
  addr: string;
  value: string;
  refs: number;
  color: ObjColor;
  transit?: boolean;
};

export type TraceStep = {
  line: number;
  code: string[] | null;
  stack: Frame[];
  heap: HeapObj[];
  narration: string;
};

export const ch1Steps: TraceStep[] = [
  {
    line: 0,
    code: [
      "def make_scores():",
      "    scores = [90, 85]",
      "    total = sum(scores) * 10",
      "    return scores",
      "",
      "result = make_scores()",
      "result.append(70)",
    ],
    stack: [{ name: "<module>", locals: { make_scores: { id: "f1", color: "fn" } } }],
    heap: [{ id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" }],
    narration:
      "The def line already ran. A function object sits on the heap. The name make_scores points at it. Next we call it.",
  },
  {
    line: 5,
    code: null,
    stack: [
      { name: "make_scores", locals: {} },
      { name: "<module>", locals: { make_scores: { id: "f1", color: "fn" } } },
    ],
    heap: [{ id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" }],
    narration:
      "Calling make_scores() pushes a new frame on top of the stack. We are now inside the function.",
  },
  {
    line: 1,
    code: null,
    stack: [
      { name: "make_scores", locals: { scores: { id: "L1", color: "list" } } },
      { name: "<module>", locals: { make_scores: { id: "f1", color: "fn" } } },
    ],
    heap: [
      { id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" },
      { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
    ],
    narration:
      "scores = [90, 85] creates a list object on the heap. The local name scores points at it.",
  },
  {
    line: 2,
    code: null,
    stack: [
      {
        name: "make_scores",
        locals: {
          scores: { id: "L1", color: "list" },
          total: { id: "N1", color: "num" },
        },
      },
      { name: "<module>", locals: { make_scores: { id: "f1", color: "fn" } } },
    ],
    heap: [
      { id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" },
      { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
      { id: "N1", addr: "0x2B30", value: "1750", refs: 1, color: "num" },
    ],
    narration:
      "total = sum(scores) * 10 creates the number 1750 on the heap. total points at it.",
  },
  {
    line: 3,
    code: null,
    stack: [{ name: "<module>", locals: { make_scores: { id: "f1", color: "fn" } } }],
    heap: [
      { id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" },
      { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 0, color: "list", transit: true },
    ],
    narration:
      "return scores sends the list back and removes the frame. Local names die. 1750 has zero pointers — freed. The list is held in transit, so it lives.",
  },
  {
    line: 5,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          make_scores: { id: "f1", color: "fn" },
          result: { id: "L1", color: "list" },
        },
      },
    ],
    heap: [
      { id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" },
      { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
    ],
    narration:
      "The caller sticks the label result on that list. The list now has a permanent owner.",
  },
  {
    line: 6,
    code: null,
    stack: [
      {
        name: "<module>",
        locals: {
          make_scores: { id: "f1", color: "fn" },
          result: { id: "L1", color: "list" },
        },
      },
    ],
    heap: [
      { id: "f1", addr: "0x0F10", value: "function make_scores", refs: 1, color: "fn" },
      { id: "L1", addr: "0x1A20", value: "[90, 85, 70]", refs: 1, color: "list" },
    ],
    narration:
      "result.append(70) changes the list in place. Same object, same address, new contents.",
  },
];

export const ch2Scenarios: Record<string, { label: string; steps: TraceStep[] }> = {
  mutate: {
    label: "Mutate a list",
    steps: [
      {
        line: 0,
        code: [
          "def add_bonus(scores):",
          "    scores.append(100)",
          "",
          "marks = [90, 85]",
          "add_bonus(marks)",
          "print(marks)",
        ],
        stack: [{ name: "<module>", locals: { add_bonus: { id: "f1", color: "fn" } } }],
        heap: [{ id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" }],
        narration: "Function object exists. Next we create the list marks.",
      },
      {
        line: 3,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              add_bonus: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
        ],
        narration: "marks points at the list [90, 85].",
      },
      {
        line: 4,
        code: null,
        stack: [
          { name: "add_bonus", locals: { scores: { id: "L1", color: "list" } } },
          {
            name: "<module>",
            locals: {
              add_bonus: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 2, color: "list" },
        ],
        narration:
          "Call: scores is stuck on the SAME list as marks. Two labels, one object. Pointers: 2.",
      },
      {
        line: 1,
        code: null,
        stack: [
          { name: "add_bonus", locals: { scores: { id: "L1", color: "list" } } },
          {
            name: "<module>",
            locals: {
              add_bonus: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85, 100]", refs: 2, color: "list" },
        ],
        narration:
          "scores.append(100) edits the list in place. Both labels still point at it — the caller sees the change.",
      },
      {
        line: 4,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              add_bonus: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85, 100]", refs: 1, color: "list" },
        ],
        narration: "Function returns. Frame gone. List still has one owner (marks).",
      },
      {
        line: 5,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              add_bonus: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add_bonus", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85, 100]", refs: 1, color: "list" },
        ],
        narration: "print(marks) shows [90, 85, 100]. Mutation was visible to the caller.",
      },
    ],
  },
  rebind: {
    label: "Rebind a name",
    steps: [
      {
        line: 0,
        code: [
          "def replace(scores):",
          "    scores = [1]",
          "",
          "marks = [90, 85]",
          "replace(marks)",
          "print(marks)",
        ],
        stack: [{ name: "<module>", locals: { replace: { id: "f1", color: "fn" } } }],
        heap: [{ id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" }],
        narration: "Function ready. Next create marks.",
      },
      {
        line: 3,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              replace: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
        ],
        narration: "marks points at [90, 85].",
      },
      {
        line: 4,
        code: null,
        stack: [
          { name: "replace", locals: { scores: { id: "L1", color: "list" } } },
          {
            name: "<module>",
            locals: {
              replace: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 2, color: "list" },
        ],
        narration: "Call: scores attached to the same list. Two labels, one object.",
      },
      {
        line: 1,
        code: null,
        stack: [
          { name: "replace", locals: { scores: { id: "L2", color: "alt" } } },
          {
            name: "<module>",
            locals: {
              replace: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
          { id: "L2", addr: "0x3C40", value: "[1]", refs: 1, color: "alt" },
        ],
        narration:
          "scores = [1] creates a NEW list and moves only the local label. marks is untouched.",
      },
      {
        line: 4,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              replace: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
        ],
        narration:
          "Frame gone. The new list [1] had zero refs — freed. marks still points at the original.",
      },
      {
        line: 5,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              replace: { id: "f1", color: "fn" },
              marks: { id: "L1", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function replace", refs: 1, color: "fn" },
          { id: "L1", addr: "0x1A20", value: "[90, 85]", refs: 1, color: "list" },
        ],
        narration: "print(marks) → [90, 85]. Rebinding never crosses the frame boundary.",
      },
    ],
  },
  immutable: {
    label: "Immutable number",
    steps: [
      {
        line: 0,
        code: [
          "def bump(n):",
          "    n = n + 1",
          "",
          "x = 10",
          "bump(x)",
          "print(x)",
        ],
        stack: [{ name: "<module>", locals: { bump: { id: "f1", color: "fn" } } }],
        heap: [{ id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" }],
        narration: "Function ready. Next: x = 10.",
      },
      {
        line: 3,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              bump: { id: "f1", color: "fn" },
              x: { id: "N1", color: "num" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" },
          { id: "N1", addr: "0x2B30", value: "10", refs: 1, color: "num" },
        ],
        narration: "x points at the integer 10.",
      },
      {
        line: 4,
        code: null,
        stack: [
          { name: "bump", locals: { n: { id: "N1", color: "num" } } },
          {
            name: "<module>",
            locals: {
              bump: { id: "f1", color: "fn" },
              x: { id: "N1", color: "num" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" },
          { id: "N1", addr: "0x2B30", value: "10", refs: 2, color: "num" },
        ],
        narration: "Call: n points at the same integer. Integers cannot be edited.",
      },
      {
        line: 1,
        code: null,
        stack: [
          { name: "bump", locals: { n: { id: "N2", color: "alt" } } },
          {
            name: "<module>",
            locals: {
              bump: { id: "f1", color: "fn" },
              x: { id: "N1", color: "num" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" },
          { id: "N1", addr: "0x2B30", value: "10", refs: 1, color: "num" },
          { id: "N2", addr: "0x4D50", value: "11", refs: 1, color: "alt" },
        ],
        narration:
          "n = n + 1 builds a NEW integer 11 and moves only the local label. Original 10 is untouched.",
      },
      {
        line: 4,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              bump: { id: "f1", color: "fn" },
              x: { id: "N1", color: "num" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" },
          { id: "N1", addr: "0x2B30", value: "10", refs: 1, color: "num" },
        ],
        narration: "Frame gone. 11 had zero refs — freed. x still points at 10.",
      },
      {
        line: 5,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              bump: { id: "f1", color: "fn" },
              x: { id: "N1", color: "num" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function bump", refs: 1, color: "fn" },
          { id: "N1", addr: "0x2B30", value: "10", refs: 1, color: "num" },
        ],
        narration:
          "print(x) → 10. Immutable objects force rebinding; the caller never sees a change.",
      },
    ],
  },
  default: {
    label: "Default-argument trap",
    steps: [
      {
        line: 0,
        code: [
          "def add(item, bucket=[]):",
          "    bucket.append(item)",
          "    return bucket",
          "",
          "a = add(1)",
          "b = add(2)",
        ],
        stack: [{ name: "<module>", locals: { add: { id: "f1", color: "fn" } } }],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[]  (stored default)", refs: 1, color: "list" },
        ],
        narration:
          "def runs once. The empty list default is created NOW and stored on the function. It will be reused forever.",
      },
      {
        line: 4,
        code: null,
        stack: [
          {
            name: "add",
            locals: {
              item: { id: "N1", color: "num" },
              bucket: { id: "L0", color: "list" },
            },
          },
          { name: "<module>", locals: { add: { id: "f1", color: "fn" } } },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[]", refs: 2, color: "list" },
          { id: "N1", addr: "0x2B30", value: "1", refs: 1, color: "num" },
        ],
        narration: "First call add(1). bucket is attached to the stored default list.",
      },
      {
        line: 1,
        code: null,
        stack: [
          {
            name: "add",
            locals: {
              item: { id: "N1", color: "num" },
              bucket: { id: "L0", color: "list" },
            },
          },
          { name: "<module>", locals: { add: { id: "f1", color: "fn" } } },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[1]", refs: 2, color: "list" },
          { id: "N1", addr: "0x2B30", value: "1", refs: 1, color: "num" },
        ],
        narration: "bucket.append(1). The shared default list now holds [1].",
      },
      {
        line: 4,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              add: { id: "f1", color: "fn" },
              a: { id: "L0", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[1]", refs: 2, color: "list" },
        ],
        narration: "Returned. a points at the same list that is still the function's default.",
      },
      {
        line: 5,
        code: null,
        stack: [
          {
            name: "add",
            locals: {
              item: { id: "N2", color: "alt" },
              bucket: { id: "L0", color: "list" },
            },
          },
          {
            name: "<module>",
            locals: {
              add: { id: "f1", color: "fn" },
              a: { id: "L0", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[1]", refs: 3, color: "list" },
          { id: "N2", addr: "0x4D50", value: "2", refs: 1, color: "alt" },
        ],
        narration: "Second call add(2). bucket is STILL the same stored list.",
      },
      {
        line: 1,
        code: null,
        stack: [
          {
            name: "add",
            locals: {
              item: { id: "N2", color: "alt" },
              bucket: { id: "L0", color: "list" },
            },
          },
          {
            name: "<module>",
            locals: {
              add: { id: "f1", color: "fn" },
              a: { id: "L0", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[1, 2]", refs: 3, color: "list" },
          { id: "N2", addr: "0x4D50", value: "2", refs: 1, color: "alt" },
        ],
        narration:
          "append(2). a and the default are the same object. Surprise: a is now [1, 2].",
      },
      {
        line: 5,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              add: { id: "f1", color: "fn" },
              a: { id: "L0", color: "list" },
              b: { id: "L0", color: "list" },
            },
          },
        ],
        heap: [
          { id: "f1", addr: "0x0F10", value: "function add", refs: 1, color: "fn" },
          { id: "L0", addr: "0x1A20", value: "[1, 2]", refs: 3, color: "list" },
        ],
        narration:
          "b points at the same list. a is b is True. The default was created once and shared forever.",
      },
    ],
  },
  shallow: {
    label: "Shallow copy",
    steps: [
      {
        line: 0,
        code: [
          "a = [[0], [0]]",
          "shallow = a.copy()",
          "shallow[0].append(1)",
          "print(a)",
        ],
        stack: [{ name: "<module>", locals: {} }],
        heap: [],
        narration:
          "We will create a nested list, make a shallow copy, then mutate an inner list.",
      },
      {
        line: 0,
        code: null,
        stack: [{ name: "<module>", locals: { a: { id: "L0", color: "list" } } }],
        heap: [
          { id: "L0", addr: "0x1A20", value: "outer → [L1, L2]", refs: 1, color: "list" },
          { id: "L1", addr: "0x2B30", value: "[0]", refs: 1, color: "num" },
          { id: "L2", addr: "0x3C40", value: "[0]", refs: 1, color: "alt" },
        ],
        narration:
          "a = [[0], [0]]. One outer list holding pointers to two separate inner lists.",
      },
      {
        line: 1,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              a: { id: "L0", color: "list" },
              shallow: { id: "L3", color: "copy" },
            },
          },
        ],
        heap: [
          { id: "L0", addr: "0x1A20", value: "outer → [L1, L2]", refs: 1, color: "list" },
          { id: "L3", addr: "0x4D50", value: "outer (copy) → [L1, L2]", refs: 1, color: "copy" },
          { id: "L1", addr: "0x2B30", value: "[0]", refs: 2, color: "num" },
          { id: "L2", addr: "0x3C40", value: "[0]", refs: 2, color: "alt" },
        ],
        narration:
          "shallow = a.copy() creates a NEW outer list, but it still points at the SAME two inner lists.",
      },
      {
        line: 2,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              a: { id: "L0", color: "list" },
              shallow: { id: "L3", color: "copy" },
            },
          },
        ],
        heap: [
          { id: "L0", addr: "0x1A20", value: "outer → [L1, L2]", refs: 1, color: "list" },
          { id: "L3", addr: "0x4D50", value: "outer (copy) → [L1, L2]", refs: 1, color: "copy" },
          { id: "L1", addr: "0x2B30", value: "[0, 1]", refs: 2, color: "num" },
          { id: "L2", addr: "0x3C40", value: "[0]", refs: 2, color: "alt" },
        ],
        narration:
          "shallow[0].append(1) mutates the shared inner list. a sees the change because both outers point at the same row.",
      },
      {
        line: 3,
        code: null,
        stack: [
          {
            name: "<module>",
            locals: {
              a: { id: "L0", color: "list" },
              shallow: { id: "L3", color: "copy" },
            },
          },
        ],
        heap: [
          { id: "L0", addr: "0x1A20", value: "outer → [L1, L2]", refs: 1, color: "list" },
          { id: "L3", addr: "0x4D50", value: "outer (copy) → [L1, L2]", refs: 1, color: "copy" },
          { id: "L1", addr: "0x2B30", value: "[0, 1]", refs: 2, color: "num" },
          { id: "L2", addr: "0x3C40", value: "[0]", refs: 2, color: "alt" },
        ],
        narration:
          "print(a) → [[0, 1], [0]]. Shallow copy protects the outer structure, not the nested objects.",
      },
    ],
  },
};
