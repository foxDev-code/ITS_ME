import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('outputs/portfolio');
const server=(await fs.readFile('scripts/serve.mjs','utf8')).replace("new URL('../outputs/portfolio/',import.meta.url)","new URL('./',import.meta.url)");
await fs.writeFile(path.join(out,'serve.mjs'),server);
const manifest=JSON.parse(await fs.readFile('work/mirror-manifest.json','utf8'));
const variants=JSON.parse(await fs.readFile('work/variants-manifest.json','utf8'));
await fs.writeFile(path.join(out,'asset-manifest.json'),JSON.stringify({source:'https://jackiezhang.co.za/',captured:'2026-09-20',pages:manifest.pages,assets:manifest.assets,responsiveVariants:variants.variants},null,2));
const unique=items=>[...new Set(items)].sort();
const inventory=[];
for(const page of manifest.pages){
 const html=await fs.readFile(path.join('work/source-cache',page.filename),'utf8');
 inventory.push({route:page.route,
  publishedComponentNames:unique([...html.matchAll(/data-framer-name="([^"]+)"/g)].map(m=>m[1])),
  htmlLinks:unique([...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&'))),
  fontFamilies:unique([...html.matchAll(/font-family:\s*([^;}]+)/g)].map(m=>m[1])),
  colors:unique([...html.matchAll(/(?:rgba?\([\d\s.,%]+\)|#[0-9a-fA-F]{3,8}\b)/g)].map(m=>m[0]))});
}
await fs.writeFile(path.join(out,'source-inventory.json'),JSON.stringify(inventory,null,2));
console.log('Standalone server, asset manifest and source inventory packaged.');
