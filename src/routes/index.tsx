import { createFileRoute } from "@tanstack/react-router";
import { HandbookShell } from "@/components/handbook/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HandbookShell />;
}
