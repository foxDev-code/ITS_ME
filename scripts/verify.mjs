import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('outputs/portfolio');
const manifest=JSON.parse(await fs.readFile('work/mirror-manifest.json','utf8'));
const variants=JSON.parse(await fs.readFile('work/variants-manifest.json','utf8'));
let count=0;const missing=[];
for(const item of [...manifest.assets,...variants.variants]){try{const stat=await fs.stat(path.join(root,item.file));if(!stat.size)throw Error('Empty asset');count++}catch{missing.push(item.file)}}
for(const page of manifest.pages){const html=await fs.readFile(path.join(root,page.filename),'utf8');if(!html.includes('data-framer-hydrate-v2')&&!html.includes('data-framer-hydrate-v2'.replaceAll('-','')))console.log('Check hydration marker:',page.route);}
const errors=[...manifest.errors,...variants.errors];
if(missing.length||errors.length){console.error({missing,errors});process.exitCode=1}else console.log(`Verified ${manifest.pages.length} routes and ${count} local assets (including responsive variants). Production snapshot ready in outputs/portfolio.`);
