import type { Metadata } from "next";
import { MarkApp } from "@/components/mark-app";

export const metadata: Metadata = { title: "MarkMatch · sample class" };

export default function AppPage() {
  return <MarkApp />;
}
