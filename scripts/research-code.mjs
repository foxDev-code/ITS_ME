import fs from 'node:fs/promises';
import path from 'node:path';
const research=JSON.parse(await fs.readFile('work/personalization/github-research.json','utf8'));
const requested={
 Agri_Sarthi:['package.json','src/main.js','src/scroll-story.js','src/crop-evidence.js'],
 Project_Helmet:['package.json','src/components/Dashboard.jsx','src/components/TelemetryHUD.jsx','src/components/ThreeHelmet.jsx'],
 'Marketing-Agency-AI-Ops-Reporting-Agent':['package.json','lib/gemini.js','lib/n8n.js','app/api/ai/generate/route.js'],
 'AI-Resume-Screener-and-Analyzer':['app.py','requirements.txt'],
 'metromaarg-hackwithup':['metro-marg/package.json','metro-marg/src/pages/RouteFinderPage.tsx','supabase/functions/calculate-route/index.ts'],
 'GIT_ZENITH':['App.tsx','services/geminiService.ts'],
 'Linear-Algebra':['code.py'],
 'Online-MCQ-Test-Platform':['script.js']
};
for(const [name,files] of Object.entries(requested))for(const file of files){const repo=research.selected.find(x=>x.name===name);const url=`https://raw.githubusercontent.com/foxDev-code/${name}/${repo.branch}/${file}`;const res=await fetch(url);if(!res.ok){console.log(name,file,res.status);continue;}const text=await res.text();const dest=path.join('work/personalization/repo-code',name,file);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,text);console.log(name,file,text.length);}
for(const name of ['veena','ai-webapp']){const response=await fetch(`https://api.github.com/repos/foxDev-code/${name}`,{headers:{'User-Agent':'portfolio-research'}});console.log('Resume repository',name,response.status);}
