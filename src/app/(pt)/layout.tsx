import { RootDocument } from "@/components/root-document";
import { buildMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = buildMetadata("pt");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="pt-BR">{children}</RootDocument>;
}
