/** Larguras geradas para cada imagem (ver scripts/optimize-images.mjs). */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 2400, 3200];

/** "/work/orbit-app.jpg" + 800 → "/_img/work__orbit-app-800.webp" */
export function variantPath(src, width) {
  const name = src.replace(/^\//, "").replace(/\.(jpe?g|png)$/i, "").replaceAll("/", "__");
  return `/_img/${name}-${width}.webp`;
}
