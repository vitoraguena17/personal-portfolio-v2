/**
 * Gera as variantes responsivas (WebP) das imagens usadas com next/image.
 * O site é exportado como estático, sem o otimizador de imagens do Next,
 * então os tamanhos são criados aqui e escolhidos pelo src/lib/image-loader.ts.
 *
 * Rode `npm run images` sempre que trocar ou adicionar uma imagem em
 * public/work ou public/me. Os arquivos saem em public/_img (versionados), e
 * src/lib/image-manifest.json guarda as larguras que existem de cada imagem
 * (nunca amplia: um retrato de 900px não ganha versões de 1200px ou mais).
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS, variantPath } from "../src/lib/image-widths.mjs";

const SOURCES = ["public/work", "public/me"];
const OUT = "public/_img";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest = {};
let count = 0;
for (const dir of SOURCES) {
  for (const file of await readdir(dir)) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const src = `/${dir.replace(/^public\//, "")}/${file}`;
    const { width: original } = await sharp(path.join(dir, file)).metadata();
    // Larguras menores que a original, mais a própria original no topo.
    const widths = [...IMAGE_WIDTHS.filter((w) => w < original), original];
    for (const width of widths) {
      await sharp(path.join(dir, file))
        .resize({ width })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join("public", variantPath(src, width)));
      count++;
    }
    manifest[src] = widths;
  }
}
await writeFile("src/lib/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`${count} variantes geradas em ${OUT}`);
