// Diagnostic thumbnails only; source artwork is never modified.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(process.env.CODEX_NODE_MODULES+'/');
const sharp=require('sharp');
const root=path.resolve('outputs/satyarth-portfolio');
const pages=JSON.parse(await fs.readFile(path.join(root,'personal/pages.json')));
const images=new Map();
for(const page of pages){
 const html=await fs.readFile(path.join(root,page.url,'index.html'),'utf8');
 for(const match of html.matchAll(/<img\b[^>]*>/g)){
  const src=match[0].match(/\bsrc="([^"]+)"/)?.[1]?.split('?')[0];if(!src)continue;
  const entry=images.get(src)||{src,pages:[],contexts:[]};
  if(!entry.pages.includes(page.url))entry.pages.push(page.url);
  const before=html.slice(Math.max(0,match.index-2000),match.index);
  entry.contexts.push([...before.matchAll(/data-framer-name="([^"]+)"/g)].slice(-3).map(m=>m[1]));
  images.set(src,entry);
 }
}
const rows=[...images.values()];
const diagnostic=path.resolve('work/share-audit');await fs.mkdir(diagnostic,{recursive:true});
await fs.writeFile(path.join(diagnostic,'inventory.json'),JSON.stringify(rows,null,2));
const files=[...rows.filter(r=>!r.src.endsWith('.svg')).map(r=>({file:path.join(root,r.src),label:path.basename(r.src)})),...(await fs.readdir('work/personalization/assets')).map(f=>({file:path.resolve('work/personalization/assets',f),label:f}))];
for(let offset=0;offset<files.length;offset+=24){
 const batch=files.slice(offset,offset+24),layers=[];
 for(let i=0;i<batch.length;i++){
  const x=(i%4)*310,y=Math.floor(i/4)*240;
  const thumb=await sharp(batch[i].file).resize(290,200,{fit:'contain',background:'#dddddd'}).png().toBuffer();
  layers.push({input:thumb,left:x+10,top:y});
  const label=batch[i].label.replaceAll('&','&amp;');
  layers.push({input:Buffer.from(`<svg width="310" height="35"><text x="7" y="22" font-size="11" font-family="Arial">${label}</text></svg>`),left:x,top:y+202});
 }
 await sharp({create:{width:1240,height:Math.ceil(batch.length/4)*240,channels:3,background:'#eeeeee'}}).composite(layers).png().toFile(path.join(diagnostic,`sheet-${offset/24+1}.png`));
}
console.log(`${rows.length} initial image sources; ${files.length} raster thumbnails.`);
