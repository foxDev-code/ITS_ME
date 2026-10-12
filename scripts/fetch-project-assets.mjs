import fs from 'node:fs/promises';
const root='work/personalization/assets';
await fs.mkdir(root,{recursive:true});
const assets={
 'agri-hero.png':'https://raw.githubusercontent.com/foxDev-code/Agri_Sarthi/main/docs/assets/hero-preview.png',
 'agri-evolves.png':'https://raw.githubusercontent.com/foxDev-code/Agri_Sarthi/main/docs/assets/evolves-preview.png',
 'helmet-front.png':'https://raw.githubusercontent.com/foxDev-code/Project_Helmet/main/public/001.png',
 'helmet-exploded.png':'https://raw.githubusercontent.com/foxDev-code/Project_Helmet/main/public/050.png'
};
for(const [name,url] of Object.entries(assets)){const res=await fetch(url);if(!res.ok)throw new Error(`${name}: ${res.status}`);const data=Buffer.from(await res.arrayBuffer());await fs.writeFile(`${root}/${name}`,data);console.log(name,data.length);}
await fs.writeFile('work/personalization/asset-sources.json',JSON.stringify(assets,null,2));
