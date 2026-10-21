#!/usr/bin/env node
/**
 * GitHub Pages helper: after `npm run build:static`, copy dist/client/index.html
 * into a folder for every known route (e.g. hiragana/index.html,
 * vocabulary/lesson-1.html) so deep links return HTTP 200 instead of
 * relying on the 404.html fallback. 404.html is still written for anything
 * not enumerated here (e.g. user-created card decks).
 *
 *   node scripts/pages-routes.mjs [outDir=dist/client]
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, process.argv[2] ?? "dist/client");
const indexHtml = join(outDir, "index.html");
if (!existsSync(indexHtml)) {
  console.error(`pages-routes: ${indexHtml} not found; run the static build first.`);
  process.exit(1);
}

const jiti = createJiti(import.meta.url, { alias: { "@": join(root, "src") } });
const vocab = await jiti.import(join(root, "src/lib/vocab.ts"));
const grammar = await jiti.import(join(root, "src/lib/grammar.ts"));
const reading = await jiti.import(join(root, "src/lib/reading.ts"));

const routes = new Set([
  "hiragana",
  "katakana",
  "kanji",
  "practice",
  "progress",
  "results",
  "login",
  "cards",
  "grammar",
  "reading",
  "vocabulary",
]);
for (const id of ["all", "numerals", "money", ...vocab.VOCAB_LESSONS.map((l) => l.id)]) {
  routes.add(`vocabulary/${id}`);
  routes.add(`vocabulary/${id}/shuffle`);
}
for (const p of grammar.GRAMMAR_PHASES) routes.add(`grammar/phase/${p.number}`);
for (const p of grammar.GRAMMAR_POINTS) routes.add(`grammar/${grammar.grammarId(p.n)}`);
for (const l of reading.READING_LESSONS) routes.add(`reading/${l.id}`);

// Write both `route.html` (GitHub Pages serves /route from it with a 200, no
// redirect) and `route/index.html` (for /route/ and static hosts without
// extensionless .html lookup).
for (const r of routes) {
  const dir = join(outDir, r);
  mkdirSync(dir, { recursive: true });
  copyFileSync(indexHtml, join(dir, "index.html"));
  copyFileSync(indexHtml, `${dir}.html`);
}
copyFileSync(indexHtml, join(outDir, "404.html"));
writeFileSync(join(outDir, ".nojekyll"), "");
console.log(`pages-routes: wrote ${routes.size} route pages + 404.html to ${outDir}`);
