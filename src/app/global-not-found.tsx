import type { Metadata } from "next";
import Link from "next/link";
import { RootDocument } from "@/components/root-document";
import { LogoMark } from "@/components/logo";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — Vitor Aguena",
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="pt-BR" intro={false}>
      <main className="grid min-h-svh place-items-center px-5 text-center">
        <div>
          <LogoMark className="mx-auto h-10 w-auto text-fg" />
          <p className="mt-10 text-[clamp(5rem,20vw,12rem)] font-medium leading-none tracking-[-0.06em]">
            4<em className="font-serif font-normal italic text-blue">0</em>4
          </p>
          <p className="mt-4 text-muted">Página não encontrada · Page not found</p>
          <Link
            href="/"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-blue px-6 text-sm font-medium text-white transition-colors hover:bg-[#2f6af0]"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </RootDocument>
  );
}
