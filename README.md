# Vitor Aguena · Portfólio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Páginas 100% estáticas.

```bash
npm install
npm run dev     # http://localhost:3000  (PT)  ·  /en  (EN)
npm run build
```

## Onde mexer

| O quê | Onde |
|---|---|
| Textos, projetos, experiência, links | `src/content/site.ts` (PT e EN lado a lado) |
| Cores, fontes e animações | `src/app/globals.css` (bloco `@theme`) |
| Logo (completa e compacta "VA") | `src/components/logo.tsx` |
| Animações e interações (abertura, cursor, Lenis, parallax…) | `src/components/motion/` |
| Ícone da aba | `src/app/icon.svg` e `src/app/apple-icon.png` |
| Capas dos projetos e retrato | `public/work/`, `public/me/` |

- `/` é português e `/en` é inglês, cada um com seu root layout em `src/app/(pt)` e `src/app/(en)`.
- Defina `NEXT_PUBLIC_SITE_URL` no deploy para as URLs canônicas e do Open Graph.
- A abertura aparece uma vez por sessão. Para vê-la de novo, limpe o `sessionStorage` (chave `va-intro`).
- Animações respeitam `prefers-reduced-motion` (sem abertura, cursor, Lenis nem parallax) e, sem JavaScript, nada fica escondido.
