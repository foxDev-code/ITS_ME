// Rasterize code-authored share layouts once. Normal builds copy the PNG files.
// Set CODEX_NODE_MODULES to the already-installed package directory when needed.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(process.env.CODEX_NODE_MODULES?process.env.CODEX_NODE_MODULES+'/':import.meta.url);
const sharp=require('sharp');
const source=path.resolve('work/personalization/assets');
const generated=path.resolve('outputs/satyarth-portfolio/personal/assets');
await sharp(await fs.readFile(path.join(generated,'social-card.svg'))).png().toFile(path.join(source,'share-default-placeholder.png'));
for(const [id,file,title,subtitle] of [
 ['agri-sarthi','agri-evolves.png','Agri Sarthi','Crop awareness / Product exploration'],
 ['suraksha-one','helmet-exploded.png','Suraksha One','Smart helmet / Safety concept']
]){
 const preview=await sharp(path.join(source,file)).resize(720,540,{fit:'contain',background:'#eee4d1'}).png().toBuffer();
 const text=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f5e1cd"/><rect x="24" y="24" width="1152" height="582" fill="none" stroke="#e35342" stroke-width="3"/><text x="60" y="80" font-size="18" font-family="sans-serif" fill="#645748">foxDev / SELECTED WORK</text><text x="60" y="230" font-size="51" font-family="Georgia" fill="#292825">${title.split(' ').map((w,i)=>`<tspan x="60" dy="${i?58:0}">${w}</tspan>`).join('')}</text><text x="60" y="478" font-size="17" font-family="sans-serif" fill="#645748">${subtitle.split(' / ').map((w,i)=>`<tspan x="60" dy="${i?26:0}">${w}</tspan>`).join('')}</text><text x="60" y="565" font-size="17" font-family="sans-serif" fill="#e35342">AI / DESIGN / CODE</text></svg>`);
 await sharp(text).composite([{input:preview,left:440,top:65}]).png().toFile(path.join(source,`share-${id}.png`));
}
console.log('Rendered three 1200 × 630 PNG share cards into work/personalization/assets.');
