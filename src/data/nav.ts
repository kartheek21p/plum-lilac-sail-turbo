export type NavItem = {
  id: string;
  label: string;
  level: 0 | 1;
  group: string;
};

export const NAV: NavItem[] = [
  { group: "Start", id: "intro", label: "How this book works", level: 0 },
  { group: "Start", id: "three", label: "The three questions", level: 0 },
  { group: "Start", id: "roadmap", label: "Course map", level: 0 },

  { group: "Vol 1 · Memory", id: "ch1", label: "1. Memory, stack & heap", level: 0 },
  { group: "Vol 1 · Memory", id: "ch1-trace", label: "Watch a run", level: 1 },
  { group: "Vol 1 · Memory", id: "ch2", label: "2. Pass-by-assignment", level: 0 },
  { group: "Vol 1 · Memory", id: "ch2-trace", label: "Five scenarios", level: 1 },
  { group: "Vol 1 · Memory", id: "ch3", label: "3. Scopes (LEGB)", level: 0 },
  { group: "Vol 1 · Memory", id: "ch4", label: "4. Closures", level: 0 },
  { group: "Vol 1 · Memory", id: "ch5", label: "5. Iterators & generators", level: 0 },
  { group: "Vol 1 · Memory", id: "ch6", label: "6. Context managers", level: 0 },
  { group: "Vol 1 · Memory", id: "ch7", label: "7. Exceptions", level: 0 },
  { group: "Vol 1 · Memory", id: "ch8", label: "8. Modules & imports", level: 0 },

  { group: "Vol 2 · Data", id: "ch9", label: "9. Control flow", level: 0 },
  { group: "Vol 2 · Data", id: "ch10", label: "10. Lists, dicts, sets", level: 0 },
  { group: "Vol 2 · Data", id: "ch11", label: "11. Comprehensions", level: 0 },
  { group: "Vol 2 · Data", id: "ch12", label: "12. Functions as values", level: 0 },

  { group: "Vol 3 · Objects", id: "ch13", label: "13. Classes", level: 0 },
  { group: "Vol 3 · Objects", id: "ch14", label: "14. Inheritance & dunders", level: 0 },
  { group: "Vol 3 · Objects", id: "ch15", label: "15. Dataclasses", level: 0 },

  { group: "Vol 4 · Production", id: "ch16", label: "16. Type hints", level: 0 },
  { group: "Vol 4 · Production", id: "ch17", label: "17. Async / await", level: 0 },
  { group: "Vol 4 · Production", id: "ch18", label: "18. Tests, logs, packaging", level: 0 },

  { group: "Vol 5 · AI stack", id: "ch19", label: "19. Arrays & tensors", level: 0 },
  { group: "Vol 5 · AI stack", id: "ch20", label: "20. Agent state", level: 0 },
];

export const GROUPS = [...new Set(NAV.map((n) => n.group))];
