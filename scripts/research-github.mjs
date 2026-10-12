import fs from 'node:fs/promises';
const base='https://api.github.com';
async function api(url){const r=await fetch(url,{headers:{'User-Agent':'Satyarth-Portfolio-Research','Accept':'application/vnd.github+json'}});if(!r.ok)return {error:r.status};return r.json();}
const repos=await api(base+'/users/foxDev-code/repos?per_page=100&sort=updated');
const selected=['Agri_Sarthi','Project_Helmet','Marketing-Agency-AI-Ops-Reporting-Agent','QUES-ANS_TESTER','AI-Resume-Screener-and-Analyzer','Smart-E-Commerce-Marketplace','metromaarg-hackwithup','GIT_ZENITH','Smart-Krishi-Hackathon-','Linear-Algebra','Online-MCQ-Test-Platform'];
const items=[];
for(const name of selected){const repo=repos.find(x=>x.name===name);const tree=await api(`${base}/repos/foxDev-code/${name}/git/trees/${repo.default_branch}?recursive=1`);const readme=await api(`${base}/repos/foxDev-code/${name}/readme`);items.push({name,description:repo.description,url:repo.html_url,homepage:repo.homepage,branch:repo.default_branch,readme:readme.content?Buffer.from(readme.content,'base64').toString():null,files:tree.tree?.filter(x=>x.type==='blob').map(x=>({path:x.path,size:x.size})),treeError:tree.error});}
await fs.mkdir('work/personalization',{recursive:true});
await fs.writeFile('work/personalization/github-research.json',JSON.stringify({fetched:new Date().toISOString(),repos:repos.map(({name,html_url,description,homepage,fork,size})=>({name,url:html_url,description,homepage,fork,size})),selected:items},null,2));
for(const p of items)console.log(JSON.stringify({name:p.name,readme:p.readme?.slice(0,6500),files:p.files?.map(f=>f.path).filter(x=>!/(package-lock|yarn.lock|\.png|\.jpg|\.jpeg|\.webp|\.svg|\.ico|\.woff|\.mp4|\.pdf|\.ttf|\.glb|\.zip)$/i.test(x)).slice(0,100)}));
