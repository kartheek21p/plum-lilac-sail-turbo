import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, c as BookOpen, i as Menu, o as ChevronLeft, r as RotateCcw, s as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PNSMGNOJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		id: "intro",
		label: "How this book works",
		level: 0
	},
	{
		id: "three",
		label: "The three questions",
		level: 0
	},
	{
		id: "roadmap",
		label: "Full roadmap",
		level: 0
	},
	{
		id: "ch1",
		label: "1. Memory, names, stack & heap",
		level: 0
	},
	{
		id: "ch1-objects",
		label: "Objects",
		level: 1
	},
	{
		id: "ch1-names",
		label: "Names are labels",
		level: 1
	},
	{
		id: "ch1-heap",
		label: "The heap",
		level: 1
	},
	{
		id: "ch1-stack",
		label: "The call stack",
		level: 1
	},
	{
		id: "ch1-trace",
		label: "Watch it happen",
		level: 1
	},
	{
		id: "ch1-check",
		label: "Self-check",
		level: 1
	},
	{
		id: "ch2",
		label: "2. Pass-by-assignment",
		level: 0
	},
	{
		id: "ch2-mutable",
		label: "Mutable vs immutable",
		level: 1
	},
	{
		id: "ch2-trace",
		label: "Five scenarios",
		level: 1
	},
	{
		id: "ch2-check",
		label: "Self-check",
		level: 1
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,opacity,transform] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90 active:scale-[0.98]",
			outline: "border border-border bg-transparent text-fg hover:bg-raised",
			ghost: "text-muted hover:bg-raised hover:text-fg"
		},
		size: {
			default: "h-10 px-3.5",
			sm: "h-8 px-2.5 text-xs",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var COLOR = {
	fn: "var(--obj-fn)",
	list: "var(--obj-list)",
	num: "var(--obj-num)",
	alt: "var(--obj-alt)",
	copy: "var(--obj-copy)"
};
function codeFor(steps, step) {
	if (step.code) return step.code;
	return steps.find((s) => s.code)?.code ?? [];
}
function HeapCard({ obj }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-bg px-2.5 py-2",
		style: {
			borderLeftWidth: 3,
			borderLeftColor: COLOR[obj.color]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-[10px] text-subtle",
				children: [
					obj.addr,
					" · ",
					obj.id,
					obj.transit ? " · in transit" : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs font-medium text-fg",
				children: obj.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[10px] tabular-nums text-subtle",
				children: ["pointers: ", obj.refs]
			})
		]
	});
}
function Tracer({ steps, tabs, activeTab, onTab }) {
	const [idx, setIdx] = (0, import_react.useState)(0);
	const step = steps[Math.min(idx, steps.length - 1)];
	const code = (0, import_react.useMemo)(() => codeFor(steps, step), [steps, step]);
	function go(delta) {
		setIdx((i) => Math.max(0, Math.min(steps.length - 1, i + delta)));
	}
	function reset() {
		setIdx(0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-4 overflow-hidden rounded-xl border border-border bg-surface",
		children: [
			tabs && tabs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 border-b border-border bg-raised px-2 py-2",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						onTab?.(t.id);
						setIdx(0);
					},
					className: cn("h-8 rounded-md px-2.5 text-xs", activeTab === t.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-bg hover:text-fg"),
					children: t.label
				}, t.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-3 md:border-b-0 md:border-r",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle",
							children: "Code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "font-mono text-[11px] leading-6 text-fg",
							children: code.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-sm px-1", i === step.line && "bg-accent/15 outline outline-1 outline-accent/40"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block w-5 text-subtle",
									children: i + 1
								}), line || " "]
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-3 md:border-b-0 md:border-r",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle",
							children: "Call stack · top is newest"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1.5",
							children: step.stack.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: "empty"
							}) : step.stack.map((frame, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-md border bg-bg px-2.5 py-2", i === 0 ? "border-accent/50" : "border-border"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-xs font-semibold",
									children: frame.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 space-y-0.5 font-mono text-[11px] text-muted",
									children: Object.keys(frame.locals).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-50",
										children: "—"
									}) : Object.entries(frame.locals).map(([name, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-fg",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-1 inline-block size-1.5 rounded-full",
												style: { background: COLOR[b.color] }
											}),
											name,
											" → ",
											b.id
										]
									}, name))
								})]
							}, `${frame.name}-${i}`))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-subtle",
							children: "Heap"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1.5",
							children: step.heap.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: "empty"
							}) : step.heap.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeapCard, { obj }, obj.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-t border-border bg-raised px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => go(-1),
						disabled: idx === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}), " Back"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => go(1),
						disabled: idx === steps.length - 1,
						children: ["Next step ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: reset,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Restart"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto font-mono text-xs tabular-nums text-subtle",
						children: [
							"Step ",
							idx + 1,
							" of ",
							steps.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-border bg-bg/40 px-3 py-2.5 text-sm text-muted",
				children: step.narration
			})
		]
	});
}
function Quiz({ items }) {
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "my-4 flex flex-col gap-2",
		children: items.map((item, i) => {
			const isOpen = open === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-start justify-between gap-3 px-3.5 py-3 text-left text-sm font-medium",
					onClick: () => setOpen(isOpen ? null : i),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.q }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted",
						children: [isOpen ? "Hide" : "Show", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", isOpen && "rotate-180") })]
					})]
				}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border-t border-border px-3.5 py-2.5 text-sm text-muted",
					children: item.a
				}) : null]
			}, i);
		})
	});
}
var ch1Steps = [
	{
		line: 0,
		code: [
			"def make_scores():",
			"    scores = [90, 85]",
			"    total = sum(scores) * 10",
			"    return scores",
			"",
			"result = make_scores()",
			"result.append(70)"
		],
		stack: [{
			name: "<module>",
			locals: { make_scores: {
				id: "f1",
				color: "fn"
			} }
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}],
		narration: "The def line already ran. A function object sits on the heap. The name make_scores points at it. Next we call it."
	},
	{
		line: 5,
		code: null,
		stack: [{
			name: "make_scores",
			locals: {}
		}, {
			name: "<module>",
			locals: { make_scores: {
				id: "f1",
				color: "fn"
			} }
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}],
		narration: "Calling make_scores() pushes a new frame on top of the stack. We are now inside the function."
	},
	{
		line: 1,
		code: null,
		stack: [{
			name: "make_scores",
			locals: { scores: {
				id: "L1",
				color: "list"
			} }
		}, {
			name: "<module>",
			locals: { make_scores: {
				id: "f1",
				color: "fn"
			} }
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}, {
			id: "L1",
			addr: "0x1A20",
			value: "[90, 85]",
			refs: 1,
			color: "list"
		}],
		narration: "scores = [90, 85] creates a list object on the heap. The local name scores points at it."
	},
	{
		line: 2,
		code: null,
		stack: [{
			name: "make_scores",
			locals: {
				scores: {
					id: "L1",
					color: "list"
				},
				total: {
					id: "N1",
					color: "num"
				}
			}
		}, {
			name: "<module>",
			locals: { make_scores: {
				id: "f1",
				color: "fn"
			} }
		}],
		heap: [
			{
				id: "f1",
				addr: "0x0F10",
				value: "function make_scores",
				refs: 1,
				color: "fn"
			},
			{
				id: "L1",
				addr: "0x1A20",
				value: "[90, 85]",
				refs: 1,
				color: "list"
			},
			{
				id: "N1",
				addr: "0x2B30",
				value: "1750",
				refs: 1,
				color: "num"
			}
		],
		narration: "total = sum(scores) * 10 creates the number 1750 on the heap. total points at it."
	},
	{
		line: 3,
		code: null,
		stack: [{
			name: "<module>",
			locals: { make_scores: {
				id: "f1",
				color: "fn"
			} }
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}, {
			id: "L1",
			addr: "0x1A20",
			value: "[90, 85]",
			refs: 0,
			color: "list",
			transit: true
		}],
		narration: "return scores sends the list back and removes the frame. Local names die. 1750 has zero pointers — freed. The list is held in transit, so it lives."
	},
	{
		line: 5,
		code: null,
		stack: [{
			name: "<module>",
			locals: {
				make_scores: {
					id: "f1",
					color: "fn"
				},
				result: {
					id: "L1",
					color: "list"
				}
			}
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}, {
			id: "L1",
			addr: "0x1A20",
			value: "[90, 85]",
			refs: 1,
			color: "list"
		}],
		narration: "The caller sticks the label result on that list. The list now has a permanent owner."
	},
	{
		line: 6,
		code: null,
		stack: [{
			name: "<module>",
			locals: {
				make_scores: {
					id: "f1",
					color: "fn"
				},
				result: {
					id: "L1",
					color: "list"
				}
			}
		}],
		heap: [{
			id: "f1",
			addr: "0x0F10",
			value: "function make_scores",
			refs: 1,
			color: "fn"
		}, {
			id: "L1",
			addr: "0x1A20",
			value: "[90, 85, 70]",
			refs: 1,
			color: "list"
		}],
		narration: "result.append(70) changes the list in place. Same object, same address, new contents."
	}
];
var ch2Scenarios = {
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
					"print(marks)"
				],
				stack: [{
					name: "<module>",
					locals: { add_bonus: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}],
				narration: "Function object exists. Next we create the list marks."
			},
			{
				line: 3,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						add_bonus: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 1,
					color: "list"
				}],
				narration: "marks points at the list [90, 85]."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "add_bonus",
					locals: { scores: {
						id: "L1",
						color: "list"
					} }
				}, {
					name: "<module>",
					locals: {
						add_bonus: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 2,
					color: "list"
				}],
				narration: "Call: scores is stuck on the SAME list as marks. Two labels, one object. Pointers: 2."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "add_bonus",
					locals: { scores: {
						id: "L1",
						color: "list"
					} }
				}, {
					name: "<module>",
					locals: {
						add_bonus: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85, 100]",
					refs: 2,
					color: "list"
				}],
				narration: "scores.append(100) edits the list in place. Both labels still point at it — the caller sees the change."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						add_bonus: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85, 100]",
					refs: 1,
					color: "list"
				}],
				narration: "Function returns. Frame gone. List still has one owner (marks)."
			},
			{
				line: 5,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						add_bonus: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add_bonus",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85, 100]",
					refs: 1,
					color: "list"
				}],
				narration: "print(marks) shows [90, 85, 100]. Mutation was visible to the caller."
			}
		]
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
					"print(marks)"
				],
				stack: [{
					name: "<module>",
					locals: { replace: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function replace",
					refs: 1,
					color: "fn"
				}],
				narration: "Function ready. Next create marks."
			},
			{
				line: 3,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						replace: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function replace",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 1,
					color: "list"
				}],
				narration: "marks points at [90, 85]."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "replace",
					locals: { scores: {
						id: "L1",
						color: "list"
					} }
				}, {
					name: "<module>",
					locals: {
						replace: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function replace",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 2,
					color: "list"
				}],
				narration: "Call: scores attached to the same list. Two labels, one object."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "replace",
					locals: { scores: {
						id: "L2",
						color: "alt"
					} }
				}, {
					name: "<module>",
					locals: {
						replace: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function replace",
						refs: 1,
						color: "fn"
					},
					{
						id: "L1",
						addr: "0x1A20",
						value: "[90, 85]",
						refs: 1,
						color: "list"
					},
					{
						id: "L2",
						addr: "0x3C40",
						value: "[1]",
						refs: 1,
						color: "alt"
					}
				],
				narration: "scores = [1] creates a NEW list and moves only the local label. marks is untouched."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						replace: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function replace",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 1,
					color: "list"
				}],
				narration: "Frame gone. The new list [1] had zero refs — freed. marks still points at the original."
			},
			{
				line: 5,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						replace: {
							id: "f1",
							color: "fn"
						},
						marks: {
							id: "L1",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function replace",
					refs: 1,
					color: "fn"
				}, {
					id: "L1",
					addr: "0x1A20",
					value: "[90, 85]",
					refs: 1,
					color: "list"
				}],
				narration: "print(marks) → [90, 85]. Rebinding never crosses the frame boundary."
			}
		]
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
					"print(x)"
				],
				stack: [{
					name: "<module>",
					locals: { bump: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function bump",
					refs: 1,
					color: "fn"
				}],
				narration: "Function ready. Next: x = 10."
			},
			{
				line: 3,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						bump: {
							id: "f1",
							color: "fn"
						},
						x: {
							id: "N1",
							color: "num"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function bump",
					refs: 1,
					color: "fn"
				}, {
					id: "N1",
					addr: "0x2B30",
					value: "10",
					refs: 1,
					color: "num"
				}],
				narration: "x points at the integer 10."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "bump",
					locals: { n: {
						id: "N1",
						color: "num"
					} }
				}, {
					name: "<module>",
					locals: {
						bump: {
							id: "f1",
							color: "fn"
						},
						x: {
							id: "N1",
							color: "num"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function bump",
					refs: 1,
					color: "fn"
				}, {
					id: "N1",
					addr: "0x2B30",
					value: "10",
					refs: 2,
					color: "num"
				}],
				narration: "Call: n points at the same integer. Integers cannot be edited."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "bump",
					locals: { n: {
						id: "N2",
						color: "alt"
					} }
				}, {
					name: "<module>",
					locals: {
						bump: {
							id: "f1",
							color: "fn"
						},
						x: {
							id: "N1",
							color: "num"
						}
					}
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function bump",
						refs: 1,
						color: "fn"
					},
					{
						id: "N1",
						addr: "0x2B30",
						value: "10",
						refs: 1,
						color: "num"
					},
					{
						id: "N2",
						addr: "0x4D50",
						value: "11",
						refs: 1,
						color: "alt"
					}
				],
				narration: "n = n + 1 builds a NEW integer 11 and moves only the local label. Original 10 is untouched."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						bump: {
							id: "f1",
							color: "fn"
						},
						x: {
							id: "N1",
							color: "num"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function bump",
					refs: 1,
					color: "fn"
				}, {
					id: "N1",
					addr: "0x2B30",
					value: "10",
					refs: 1,
					color: "num"
				}],
				narration: "Frame gone. 11 had zero refs — freed. x still points at 10."
			},
			{
				line: 5,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						bump: {
							id: "f1",
							color: "fn"
						},
						x: {
							id: "N1",
							color: "num"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function bump",
					refs: 1,
					color: "fn"
				}, {
					id: "N1",
					addr: "0x2B30",
					value: "10",
					refs: 1,
					color: "num"
				}],
				narration: "print(x) → 10. Immutable objects force rebinding; the caller never sees a change."
			}
		]
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
					"b = add(2)"
				],
				stack: [{
					name: "<module>",
					locals: { add: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add",
					refs: 1,
					color: "fn"
				}, {
					id: "L0",
					addr: "0x1A20",
					value: "[]  (stored default)",
					refs: 1,
					color: "list"
				}],
				narration: "def runs once. The empty list default is created NOW and stored on the function. It will be reused forever."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "add",
					locals: {
						item: {
							id: "N1",
							color: "num"
						},
						bucket: {
							id: "L0",
							color: "list"
						}
					}
				}, {
					name: "<module>",
					locals: { add: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function add",
						refs: 1,
						color: "fn"
					},
					{
						id: "L0",
						addr: "0x1A20",
						value: "[]",
						refs: 2,
						color: "list"
					},
					{
						id: "N1",
						addr: "0x2B30",
						value: "1",
						refs: 1,
						color: "num"
					}
				],
				narration: "First call add(1). bucket is attached to the stored default list."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "add",
					locals: {
						item: {
							id: "N1",
							color: "num"
						},
						bucket: {
							id: "L0",
							color: "list"
						}
					}
				}, {
					name: "<module>",
					locals: { add: {
						id: "f1",
						color: "fn"
					} }
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function add",
						refs: 1,
						color: "fn"
					},
					{
						id: "L0",
						addr: "0x1A20",
						value: "[1]",
						refs: 2,
						color: "list"
					},
					{
						id: "N1",
						addr: "0x2B30",
						value: "1",
						refs: 1,
						color: "num"
					}
				],
				narration: "bucket.append(1). The shared default list now holds [1]."
			},
			{
				line: 4,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						add: {
							id: "f1",
							color: "fn"
						},
						a: {
							id: "L0",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add",
					refs: 1,
					color: "fn"
				}, {
					id: "L0",
					addr: "0x1A20",
					value: "[1]",
					refs: 2,
					color: "list"
				}],
				narration: "Returned. a points at the same list that is still the function's default."
			},
			{
				line: 5,
				code: null,
				stack: [{
					name: "add",
					locals: {
						item: {
							id: "N2",
							color: "alt"
						},
						bucket: {
							id: "L0",
							color: "list"
						}
					}
				}, {
					name: "<module>",
					locals: {
						add: {
							id: "f1",
							color: "fn"
						},
						a: {
							id: "L0",
							color: "list"
						}
					}
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function add",
						refs: 1,
						color: "fn"
					},
					{
						id: "L0",
						addr: "0x1A20",
						value: "[1]",
						refs: 3,
						color: "list"
					},
					{
						id: "N2",
						addr: "0x4D50",
						value: "2",
						refs: 1,
						color: "alt"
					}
				],
				narration: "Second call add(2). bucket is STILL the same stored list."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "add",
					locals: {
						item: {
							id: "N2",
							color: "alt"
						},
						bucket: {
							id: "L0",
							color: "list"
						}
					}
				}, {
					name: "<module>",
					locals: {
						add: {
							id: "f1",
							color: "fn"
						},
						a: {
							id: "L0",
							color: "list"
						}
					}
				}],
				heap: [
					{
						id: "f1",
						addr: "0x0F10",
						value: "function add",
						refs: 1,
						color: "fn"
					},
					{
						id: "L0",
						addr: "0x1A20",
						value: "[1, 2]",
						refs: 3,
						color: "list"
					},
					{
						id: "N2",
						addr: "0x4D50",
						value: "2",
						refs: 1,
						color: "alt"
					}
				],
				narration: "append(2). a and the default are the same object. Surprise: a is now [1, 2]."
			},
			{
				line: 5,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						add: {
							id: "f1",
							color: "fn"
						},
						a: {
							id: "L0",
							color: "list"
						},
						b: {
							id: "L0",
							color: "list"
						}
					}
				}],
				heap: [{
					id: "f1",
					addr: "0x0F10",
					value: "function add",
					refs: 1,
					color: "fn"
				}, {
					id: "L0",
					addr: "0x1A20",
					value: "[1, 2]",
					refs: 3,
					color: "list"
				}],
				narration: "b points at the same list. a is b is True. The default was created once and shared forever."
			}
		]
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
					"print(a)"
				],
				stack: [{
					name: "<module>",
					locals: {}
				}],
				heap: [],
				narration: "We will create a nested list, make a shallow copy, then mutate an inner list."
			},
			{
				line: 0,
				code: null,
				stack: [{
					name: "<module>",
					locals: { a: {
						id: "L0",
						color: "list"
					} }
				}],
				heap: [
					{
						id: "L0",
						addr: "0x1A20",
						value: "outer → [L1, L2]",
						refs: 1,
						color: "list"
					},
					{
						id: "L1",
						addr: "0x2B30",
						value: "[0]",
						refs: 1,
						color: "num"
					},
					{
						id: "L2",
						addr: "0x3C40",
						value: "[0]",
						refs: 1,
						color: "alt"
					}
				],
				narration: "a = [[0], [0]]. One outer list holding pointers to two separate inner lists."
			},
			{
				line: 1,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						a: {
							id: "L0",
							color: "list"
						},
						shallow: {
							id: "L3",
							color: "copy"
						}
					}
				}],
				heap: [
					{
						id: "L0",
						addr: "0x1A20",
						value: "outer → [L1, L2]",
						refs: 1,
						color: "list"
					},
					{
						id: "L3",
						addr: "0x4D50",
						value: "outer (copy) → [L1, L2]",
						refs: 1,
						color: "copy"
					},
					{
						id: "L1",
						addr: "0x2B30",
						value: "[0]",
						refs: 2,
						color: "num"
					},
					{
						id: "L2",
						addr: "0x3C40",
						value: "[0]",
						refs: 2,
						color: "alt"
					}
				],
				narration: "shallow = a.copy() creates a NEW outer list, but it still points at the SAME two inner lists."
			},
			{
				line: 2,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						a: {
							id: "L0",
							color: "list"
						},
						shallow: {
							id: "L3",
							color: "copy"
						}
					}
				}],
				heap: [
					{
						id: "L0",
						addr: "0x1A20",
						value: "outer → [L1, L2]",
						refs: 1,
						color: "list"
					},
					{
						id: "L3",
						addr: "0x4D50",
						value: "outer (copy) → [L1, L2]",
						refs: 1,
						color: "copy"
					},
					{
						id: "L1",
						addr: "0x2B30",
						value: "[0, 1]",
						refs: 2,
						color: "num"
					},
					{
						id: "L2",
						addr: "0x3C40",
						value: "[0]",
						refs: 2,
						color: "alt"
					}
				],
				narration: "shallow[0].append(1) mutates the shared inner list. a sees the change because both outers point at the same row."
			},
			{
				line: 3,
				code: null,
				stack: [{
					name: "<module>",
					locals: {
						a: {
							id: "L0",
							color: "list"
						},
						shallow: {
							id: "L3",
							color: "copy"
						}
					}
				}],
				heap: [
					{
						id: "L0",
						addr: "0x1A20",
						value: "outer → [L1, L2]",
						refs: 1,
						color: "list"
					},
					{
						id: "L3",
						addr: "0x4D50",
						value: "outer (copy) → [L1, L2]",
						refs: 1,
						color: "copy"
					},
					{
						id: "L1",
						addr: "0x2B30",
						value: "[0, 1]",
						refs: 2,
						color: "num"
					},
					{
						id: "L2",
						addr: "0x3C40",
						value: "[0]",
						refs: 2,
						color: "alt"
					}
				],
				narration: "print(a) → [[0, 1], [0]]. Shallow copy protects the outer structure, not the nested objects."
			}
		]
	}
};
function Callout({ title, kind = "key", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `my-3 rounded-lg border px-3.5 py-3 ${kind === "warn" ? "border-warn/35 bg-warn/8" : kind === "model" ? "border-accent/30 bg-raised" : "border-accent/35 bg-accent/8"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-xs font-semibold uppercase tracking-wide text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted",
			children
		})]
	});
}
function Code({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "my-3 overflow-x-auto rounded-lg border border-border bg-code px-3.5 py-3 font-mono text-[12px] leading-6 text-fg",
		children
	});
}
function H({ id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: "scroll-mt-16",
		children
	});
}
function HandbookBody() {
	const [scenario, setScenario] = (0, import_react.useState)("mutate");
	const current = ch2Scenarios[scenario];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-[42rem] space-y-8 pb-16 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle",
						children: "Volume 1 · Python memory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl font-medium tracking-tight text-balance",
						children: "The AI Builder's Handbook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base text-muted text-pretty",
						children: "Learn Python by watching what happens in memory — not by memorizing syntax. This is the base you need to read production code and later build scalable AI apps."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "The bet",
						children: "People who read code fluently are not people who remember syntax. They are people who can see what the code does to memory as it runs. Syntax can be looked up in seconds. A wrong mental picture cannot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "You do not need a programming background. Every chapter starts from a picture you can hold in your head, then shows how Python actually behaves, then applies it to real code."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "three",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium tracking-tight",
						children: "The three questions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "When you meet any piece of code, ask these. They are the spine of Volume 1."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2",
						children: [
							"What objects get created here, and where do they live?",
							"Which names (or containers) point at each object?",
							"When does each object stop being needed?"
						].map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-fg",
								children: i + 1
							}), q]
						}, q))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "roadmap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium tracking-tight",
						children: "Full roadmap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "What you still need after these two chapters, in order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: [
							{
								badge: "Now",
								t: "Vol 1 · Ch 1–2",
								d: "Memory, names, stack/heap, mutation vs rebinding"
							},
							{
								badge: "Next",
								t: "Vol 1 · Ch 3–6",
								d: "Scopes (LEGB), closures, generators, context managers, exceptions, modules"
							},
							{
								badge: "Later",
								t: "Vol 2 · Data",
								d: "Lists/dicts/sets in depth, comprehensions, *args/**kwargs"
							},
							{
								badge: "Later",
								t: "Vol 3 · Classes",
								d: "Attributes, inheritance, dunder methods, dataclasses — the shape of models & agents"
							},
							{
								badge: "Later",
								t: "Vol 4 · Production",
								d: "Type hints, async/await, logging, testing, packaging"
							},
							{
								badge: "Later",
								t: "Vol 5–6 · AI stack",
								d: "Tensors as objects, agent state, APIs, caching, streaming, batching"
							}
						].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 rounded-lg border border-border bg-surface px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 shrink-0 rounded-sm bg-raised px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-subtle",
								children: row.badge
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: row.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: row.d
							})] })]
						}, row.t))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle",
						children: "Chapter 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "Memory, names, the stack and the heap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A program is a list of instructions plus the data those instructions work on. That data lives in memory."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Picture memory as a warehouse of numbered shelves. Each shelf has an address. You put something on a shelf, remember the number, look at it later, and throw it away when nobody needs it. That is all Python does."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-objects",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Objects: everything is a thing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A number is an object. Text is an object. A list is an object. Even a function is an object. Each object has three properties:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: [
							["Identity", "Which shelf it sits on. Never changes."],
							["Type", "What kind of thing it is (number, list…)."],
							["Value", "What it currently contains."]
						].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: d
							})]
						}, t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: `price = 250
print(type(price))   # int  — the type
print(id(price))     # a big number — the identity
print(price)         # 250 — the value` })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-names",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Names are labels, not boxes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
						title: "Mental model",
						kind: "model",
						children: [
							"A variable is a name tag. The object sits on a shelf. Assigning with",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-fg",
								children: "="
							}),
							" means “stick this label on that object”. It never copies the object."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { children: `a = [1, 2, 3]     # create a list, stick label a on it
b = a             # second label on the SAME object. No copy.
c = [1, 2, 3]     # a NEW list that happens to look the same

a == b            # True   same value
a is b            # True   same object
a == c            # True   same value
a is c            # False  different objects` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono",
								children: "=="
							}),
							" asks “same value?”",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono",
								children: "is"
							}),
							" asks “literally the same object?” Twins are equal. One person with two nicknames is the same object."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-heap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "The heap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "Rule of the heap",
						kind: "model",
						children: "An object stays alive as long as at least one label (or container) points to it. When the last pointer goes away, Python frees it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "A list does not contain its items like a bag contains apples. It holds a row of arrows to objects elsewhere on the heap. That is why two lists can share an item."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "The call stack"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "A function call gets a frame: a private workspace for that call’s local names. Frames stack like plates. Newest on top. When the call returns, the plate is removed and its names disappear."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "Key sentence",
						children: "Names live in frames. Objects live on the heap. Names point at objects. When a frame disappears, objects that lose their last pointer are freed. Objects someone else still points at survive."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-trace",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Watch it happen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Step through this small program. Left: the line that just ran. Middle: the stack. Right: the heap. Matching colors mean “this name points at that object.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tracer, { steps: ch1Steps })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch1-check",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Check yourself"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Answer before you open each one."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, { items: [
						{
							q: "Two functions each have a name pointing at the same list. One appends. Does the other see it?",
							a: "Yes. One list object, two labels. An in-place change through either label is visible through both."
						},
						{
							q: "x = [1, 2], then y = x, then y = [3]. What does print(x) show?",
							a: "[1, 2]. y = [3] creates a new list and moves only the label y. x still points at the original."
						},
						{
							q: "A list is referenced only by result. You run del result. What happens?",
							a: "Its pointer count drops to zero and Python frees it immediately."
						}
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle",
						children: "Chapter 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: "Pass-by-assignment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "The question",
						children: "When I hand something to a function, can the function change my original? Sometimes yes, sometimes no. Two ideas explain every case: how the object is handed over, and whether that kind of object can be edited at all."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "Mental model",
						kind: "model",
						children: "Calling f(x) is the same as writing parameter = x inside a fresh frame. A new label is stuck onto the same object. No copy is made, and the function cannot move your label."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Inside the function you can mutate the object (everyone sees it) or rebind the name (only the function’s own label moves)."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch2-mutable",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-medium",
					children: "Mutable vs immutable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border border-border bg-surface px-3 py-2",
								children: "Cannot be edited"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border border-border bg-surface px-3 py-2",
								children: "Can be edited in place"
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-border px-3 py-2",
							children: "int, float, bool, str, tuple, None"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border border-border px-3 py-2",
							children: "list, dict, set, most class instances"
						})] }) })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch2-trace",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Five scenarios"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Pick a tab. Watch pointer counts. The caller sees a change only when the function mutates an object both sides can reach."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tracer, {
						steps: current.steps,
						tabs: Object.entries(ch2Scenarios).map(([id, s]) => ({
							id,
							label: s.label
						})),
						activeTab: scenario,
						onTab: setScenario
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						title: "The rule",
						kind: "model",
						children: "Rebinding a name never crosses the frame boundary. Mutation of a shared object always does."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Callout, {
						title: "Default arguments",
						kind: "warn",
						children: [
							"Default values like ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-fg",
								children: "=[]"
							}),
							" are created once, when def runs, not on every call. Use",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono text-fg",
								children: "None"
							}),
							" as the placeholder and create a fresh list inside the function."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H, {
				id: "ch2-check",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: "Check yourself"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, { items: [
						{
							q: "def f(x): x = x + [1]. You call f(a) with a list a. Does a change?",
							a: "No. x + [1] builds a new list and only the local label moves."
						},
						{
							q: "def f(x): x += [1]. Same call. Does a change?",
							a: "Yes. For lists, += extends in place, and x and a point at that one list."
						},
						{
							q: "Why is def track(seen=set()) dangerous?",
							a: "The set is created once at def time. Every call that omits seen shares and mutates that same set."
						},
						{
							q: "grid = [[0] * 2] * 2 then grid[0][0] = 5. What prints?",
							a: "[[5, 0], [5, 0]]. The outer list holds two pointers to one row object."
						}
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted",
						children: "Next chapter: scopes (LEGB) — where Python looks when you use a name, and why a function can read outside names but not easily rebind them."
					})
				]
			})
		]
	});
}
function NavLinks({ current, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-0.5",
		children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: `#${item.id}`,
			onClick: () => onPick(item.id),
			className: cn("rounded-md px-2 py-1.5 text-sm transition-colors", item.level === 1 && "pl-4 text-[13px]", current === item.id ? "bg-accent/15 font-medium text-fg" : "text-muted hover:bg-raised hover:text-fg"),
			children: item.label
		}, item.id))
	});
}
function HandbookShell() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [current, setCurrent] = (0, import_react.useState)("intro");
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const ids = NAV.map((n) => n.id);
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0);
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
	function pick(id) {
		setCurrent(id);
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-[15.5rem] overflow-y-auto border-r border-border bg-surface px-3 py-5 md:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center gap-2 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold leading-tight",
						children: "AI Builder"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-subtle",
						children: "Handbook · Vol 1"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
					current,
					onPick: pick
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-bg/70",
					"aria-label": "Close menu",
					onClick: () => setOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-y-0 left-0 w-[16rem] overflow-y-auto border-r border-border bg-surface px-3 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Contents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-10",
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
						current,
						onPick: pick
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-[15.5rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-bg/90 px-3 py-2 backdrop-blur-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-10 items-center justify-center md:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1 flex-1 overflow-hidden rounded-full bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-accent transition-[width] duration-150",
								style: { width: `${progress}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-[11px] text-subtle sm:inline",
							children: "Volume 1"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandbookBody, {})
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandbookShell, {});
}
//#endregion
export { Home as component };
