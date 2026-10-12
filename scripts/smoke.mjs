import fs from 'node:fs/promises';
const port=Number(process.argv[2]||4173);
const manifest=JSON.parse(await fs.readFile('outputs/portfolio/asset-manifest.json','utf8'));
const targets=[...manifest.pages.map(p=>p.route),...manifest.assets.map(a=>a.file),...manifest.responsiveVariants.map(a=>a.file.replace(/\.scale-(\d+)$/,'?scale-down-to=$1'))];
const failures=[];
for(let i=0;i<targets.length;i+=20){await Promise.all(targets.slice(i,i+20).map(async target=>{try{const response=await fetch(`http://127.0.0.1:${port}${target}`,{method:'HEAD'});if(response.status!==200)failures.push({target,status:response.status})}catch(error){failures.push({target,error:error.message})}}));}
console.log(JSON.stringify({checked:targets.length,failureCount:failures.length,failures:failures.slice(0,10)},null,2));
if(failures.length)process.exitCode=1;
