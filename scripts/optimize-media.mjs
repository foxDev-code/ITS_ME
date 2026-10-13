// Optional authoring step. Production builds use the checked-in variants; no image dependency is installed on Vercel.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(process.env.CODEX_NODE_MODULES?process.env.CODEX_NODE_MODULES+'/':import.meta.url);
const sharp=require('sharp');
const dir='work/personalization/assets',variants={},report=[];
const limits={'fox-coder.png':640,'fox-seal.png':880,'satyarth-cutout.png':768};
for(const name of await fs.readdir(dir)){
 if(!/\.(png|jpe?g)$/.test(name)||name.startsWith('share-')||name==='satyarth-portrait.png')continue;
 const input=await fs.readFile(path.join(dir,name));if(input.length<80000)continue;
 const before=await sharp(input).metadata(),limit=limits[name];
 let image=sharp(input);if(limit)image=image.resize({width:limit,height:limit,fit:'inside',withoutEnlargement:true});
 const output=await image.webp({quality:86,alphaQuality:100,effort:6}).toBuffer();
 if(output.length>=input.length*.9)continue;
 const after=await sharp(output).metadata();
 if(limit){assert(after.width<=limit&&after.height<=limit);assert(Math.abs(after.width/after.height-before.width/before.height)<.01,'Preserve image aspect ratio');}
 else{assert.equal(after.width,before.width);assert.equal(after.height,before.height);}
 if(before.hasAlpha&&(await sharp(input).stats()).channels.at(-1).min<255)assert(after.hasAlpha,'Keep meaningful transparency: '+name);
 const target=name.replace(/\.[^.]+$/,'.webp');await fs.writeFile(path.join(dir,target),output);variants[name]=target;
 report.push({source:name,variant:target,before:input.length,after:output.length,width:after.width,height:after.height,alpha:!!before.hasAlpha});
}
const favicon=await fs.readFile('outputs/satyarth-portfolio/personal/assets/favicon.svg');
for(const size of [48,180])await sharp(favicon).resize(size,size).png().toFile(path.join(dir,size===48?'favicon-48.png':'apple-touch-icon.png'));
await fs.writeFile('content/media-variants.json',JSON.stringify(variants,null,2)+'\n');
await fs.mkdir('work/launch-check',{recursive:true});await fs.writeFile('work/launch-check/media-compression.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({files:report.length,before:report.reduce((n,r)=>n+r.before,0),after:report.reduce((n,r)=>n+r.after,0),report},null,2));
// Reuse the origin's transparent PNG derivatives; converting this line art to WebP is larger.
const nativeDir='outputs/portfolio/vendor/framerusercontent.com/images',responsive={};
for(const [name,widths] of Object.entries({'zreYWHKtYVvdYwuZm8gBYAa3IiA.png':[512,1024],'FqqwJe3cXajmh3c17ziisS6QOJU.jpg':[512,1024,2048]})){
 const original=await sharp(path.join(nativeDir,name)).metadata(),family={};
 for(const scale of [...widths,'default']){
  const source=path.join(nativeDir,name+(scale==='default'?'':'.scale-'+scale)),input=await fs.readFile(source);
  const output=name.endsWith('.png')?input:await sharp(input).webp({quality:82,effort:6}).toBuffer();
  const metadata=await sharp(output).metadata(),width=metadata.width;
  assert.equal(width,scale==='default'?original.width:scale,'Derivative must have its advertised width');
  assert(Math.abs(width/metadata.height-original.width/original.height)<.01,'Keep native artwork aspect ratio');
  if(original.hasAlpha)assert(metadata.hasAlpha,'Keep illustration transparency');
  if(scale!=='default')assert(output.length<(await fs.stat(path.join(nativeDir,name))).size,'Derivative must save bytes');
  const file=name.replace(/\.[^.]+$/,'')+'-'+width+'.'+(name.endsWith('.png')?'png':'webp');
  await fs.writeFile(path.join(dir,file),output);family[scale]={file,width,height:metadata.height,bytes:output.length};
 }
 responsive[name]=family;
}
await fs.writeFile('content/responsive-images.json',JSON.stringify(responsive,null,2)+'\n');
console.log('Native static derivatives: '+JSON.stringify(responsive));
