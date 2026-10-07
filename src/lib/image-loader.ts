import manifest from "./image-manifest.json";
import { IMAGE_WIDTHS, variantPath } from "./image-widths.mjs";

const available = manifest as Record<string, number[]>;

/**
 * Loader do next/image para o export estático: aponta para a menor variante
 * pré-gerada que cobre a largura pedida pelo navegador.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const widths = available[src] ?? IMAGE_WIDTHS;
  const chosen = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return variantPath(src, chosen);
}
