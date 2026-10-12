import fs from 'node:fs/promises';
import path from 'node:path';
import {buildArt} from './personal-art.mjs';
import {buildCasePages} from './personal-pages.mjs';
import {buildSEO,siteOrigin} from './seo.mjs';
const origin=siteOrigin(process.env.SITE_URL,process.argv.includes('--production'));
const source=path.resolve('outputs/portfolio');
const out=path.resolve('outputs/satyarth-portfolio');
const profile=JSON.parse(await fs.readFile('content/profile.json','utf8'));
const projects=JSON.parse(await fs.readFile('content/projects.json','utf8'));
const replacements=JSON.parse(await fs.readFile('content/replacements.json','utf8'));
for(const key of ['Jackie Zhang','Jackie','JACKIE','jackie'])replacements[key]=profile.siteName;
const escapeRegExp=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const htmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const longKeys=Object.keys(replacements).filter(x=>x.length>12).sort((a,b)=>b.length-a.length);
const longPattern=new RegExp(longKeys.map(escapeRegExp).join('|'),'g');
const links={
 'https://www.linkedin.com/in/jackie-zhang-designer/':profile.linkedin,
 'https://x.com/jackie_zhang_ls/status/1953203804113125820/video/1':'/projects/agri-sarthi/',
 'https://x.com/jackie_zhang_ls':profile.twitter,
 'https://github.com/jackielszhang':profile.github,
 'mailto:lapsun.j.zhang@gmail.com':'mailto:'+profile.email,
 'https://bash.com':'/projects/agri-sarthi/',
 'https://www.linkedin.com/company/pulseliveco/':'/projects/suraksha-one/',
 'https://www.linkedin.com/company/virtualtrips/':'/projects/metromaarg/',
 'https://dotslash.co.za/':'/projects/nexus-ai-ops/',
 'https://tf2048.io/':'https://github.com/foxDev-code/Linear-Algebra',
 'https://tf2048.io':'https://github.com/foxDev-code/Linear-Algebra',
 'https://whosspeaking.framer.website/':'/about#community',
 'https://whosspeaking.framer.website':'/about#community',
 'https://tripletime.ai/en-US':'/projects/qa-matrix/',
 'https://www.resqued.org/':'https://github.com/foxDev-code/Online-MCQ-Test-Platform',
 'https://jackiezhangdesign.medium.com/designs-with-context-better-collaboration-e8bac4fd860c':profile.github
};
await fs.mkdir(out,{recursive:true});
await fs.cp(path.join(source,'vendor'),path.join(out,'vendor'),{recursive:true});
await fs.mkdir(path.join(out,'personal/assets'),{recursive:true});
await fs.cp('work/personalization/assets',path.join(out,'personal/assets'),{recursive:true});
const artwork=await buildArt(path.join(out,'personal/assets'),projects,profile);
await fs.copyFile('content/Satyarth_Mishra_Resume.pdf',path.join(out,'personal/Satyarth_Mishra_Resume.pdf'));
const assetMap={...artwork};
assetMap['csmYzdIDt1WdC22VsyzJx1QA.png']='stamp.svg';
const imagePairs={
 'I7rxe1hR9EPeVLJtc8OKabC4xE.jpg':'satyarth-cutout.png',
 'ijsWM5MtUuc1y8pWtiDWBHCnuXg.png':'satyarth-cutout.png',
 'hyGmkiu08yzXtTX4p6U33EaDtg.png':'agri-screenshot.svg','ck9K3Xr758La3QpNIN0DfN8PI.png':'agri-evolves-card.svg',
 '8M87FNWtpUjKjwNqN0qOyj5Lk.png':'suraksha-cover.svg','FF0v8B2xhAfWfJeXfK4H4RnhRRw.png':'suraksha-flow.svg',
 'afys4KtZC007XBhmTWURY9KL4.png':'helmet-card.svg','JnE5QhnGCnmemIKciZV2OCgo5sw.png':'suraksha-flow.svg',
 'aUqLxCtkYycaFGyEnasBtVgEFw.png':'metro-cover.svg','p617kuyXNZjVcoDr6BvATSwAm4Y.png':'metro-flow.svg',
 'jkezJCVWvw8W2KInfhlRWQOlS4.png':'resume-cover.svg','8gSlDG7U7xsP8pM9Cq7kN7CvPhY.png':'nexus-cover.svg',
 'THoPhBwT6urkUDtAjJTcyRfOlw.png':'veena-cover.svg','GrSk97UziTp1vndEAVDuaVO18k.png':'math-cover.svg',
 'CDi8od3bQ9AxZ99sxvMm2k4.png':'community-cover.svg','fxzETzoSfsr2clZ2wLcBXK9VfEA.png':'qa-cover.svg','4ztjKgGGxiciWB62obCh0ZZr9iU.png':'mcq-cover.svg',
 'Wiw196PFt5v5LcQxgcrCUB3F0.png':'agri-cover.svg','JCVH1U71jmRJSgalqgIDAfuO8.png':'agri-flow.svg',
 'qPdyyjiGVcYhSJZ659iudjEFmbw.png':'suraksha-cover.svg','JiCsfFAbrVrZSX3x7Y9dkgzckI.png':'suraksha-flow.svg',
 '6rBYKVmILDjUMitcTXjMZ0SPM.png':'metro-cover.svg','QvIk4OtR2xbSpy213Cwtbyw6Q.png':'metro-flow.svg',
 '5YyYUryAtcl0ESyOgNb4S9dajw.png':'nexus-cover.svg','aybhK1OWWsMUjIyA7Kj5iET0zE.png':'nexus-flow.svg',
 'UeG3qBVgjLwvwcGSGQLZM9AI.png':'qa-cover.svg','CjJRxESsZDM96KjX4zi3ntiSl7c.png':'resume-cover.svg','x3y7QRdmiIS5JFAwhWC4IHHHJsE.png':'veena-cover.svg',
 'gaaYI25iUJhP2n1xmahYjO3XRY.png':'agri-cover.svg','cmpsfHDSBvMIVkOtMJffhTk8HA.png':'suraksha-cover.svg',
 'OqvkDghj18vNLRheWfCb9I9ZC5M.png':'metro-cover.svg','SMhadH5n5CuLH7ZXJnFHzzfUI7k.png':'nexus-cover.svg',
 'HUqtxwLIEIp2z66d1Rbksv2PbbY.png':'resume-cover.svg','Isusj1Nh2i04aFkiuiBVhYCfec.png':'qa-cover.svg'
};
Object.assign(assetMap,imagePairs);
function localizeAssets(value){return value.replace(/\/vendor\/framerusercontent\.com\/images\/([A-Za-z0-9_-]+\.(?:png|jpe?g|gif|webp))(?:\?[^\s"'`<>)]*)?/g,(whole,name)=>assetMap[name]?'/personal/assets/'+assetMap[name]:whole);}
function replaceValue(value){
 if(value.startsWith("Hey there, I'm Jackie,"))return profile.intro;
 if(value==='@jackielszhang')return '@'+new URL(profile.github).pathname.split('/').filter(Boolean).at(-1);
 if(value.startsWith('Almost heaven, West Virginia.'))return 'Stay curious. Make things. Ask better questions. AI, design, code and a little creative chaos. From Greater Noida, with care.';
 let result=Object.hasOwn(replacements,value)?replacements[value]:value.replace(longPattern,key=>replacements[key]);
 for(const [from,to] of Object.entries(links))result=result.replaceAll(from,to);
 return localizeAssets(result);
}
function decodeString(raw,quote){
 if(quote==='"'){try{return JSON.parse('"'+raw+'"')}catch{return raw}}
 return raw.replace(/\\u\{([\da-f]+)\}|\\u([\da-f]{4})|\\x([\da-f]{2})|\\([nrt\\'"`])/gi,(_,wide,unicode,hex,escaped)=>wide||unicode||hex?String.fromCodePoint(parseInt(wide||unicode||hex,16)):({n:'\n',r:'\r',t:'\t'}[escaped]??escaped));
}
async function walk(dir){const files=[];for(const item of await fs.readdir(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())files.push(...await walk(full));else files.push(full)}return files;}
let modified=0;
for(const file of await walk(path.join(out,'vendor'))){if(!/\.(mjs|js|json|css)$/.test(file))continue;let text=await fs.readFile(file,'utf8');const before=text;
 if(file.includes('/09z_toCCH')||file.includes('\\09z_toCCH')){
  text=text.replace(/a\(Z,\{[\s\S]*?XapXkaNR5:`([^`]*)`\}\)/g,(block,title)=>title==="Who's Speaking"?block.replace('AM_Uz7jtd:`creator`','AM_Uz7jtd:`contributor`'):title==='Triple Time'?block.replace('rimFueKV0:`2025`','rimFueKV0:`Prototype`'):title==='ResQued'?block.replace('AM_Uz7jtd:`Founding Product Designer`','AM_Uz7jtd:`Web developer`'):block);
  const patchSection=(startMarker,endMarker,patch)=>{const start=text.indexOf(startMarker),end=text.indexOf(endMarker,start);if(start<0||end<start)throw Error('Missing reference component boundary');text=text.slice(0,start)+patch(text.slice(start,end))+text.slice(end);};
  patchSection('className:`framer-roufdp-container`','className:`framer-1muoi1b`',part=>part.replaceAll('Platform to stream on Heygo.','PDF extraction, semantic retrieval and structured document analysis.').replaceAll('Better streaming experience also increased tipping by 8%/stream','FastAPI connects the review interface to Gemini and Pinecone.').replaceAll('Increased tap through from the feed into the post. Which led to higher retention and more "aha" moments','Requirements-to-test workflows with AI-assisted planning, automation generation and failure analysis.').replaceAll('Logbox: Medical • B2B SaaS','Explore more prototypes on GitHub.'));
  patchSection('className:`framer-m4dmhz-container`','className:`framer-1ymsxrh`',part=>part.replaceAll('Increased tap through from the feed into the post. Which led to higher retention and more "aha" moments','Ticket booking, QR presentation and journey history in one passenger flow.').replace(/\/vendor\/framerusercontent\.com\/images\/FF0v8B2xhAfWfJeXfK4H4RnhRRw\.png\?[^\s`]+/g,'/personal/assets/metro-flow.svg'));
 }
 if(/\.(mjs|js)$/.test(file))text=text.replace(/`((?:\\[\s\S]|[^`\\])*)`|"((?:\\[\s\S]|[^"\\])*)"|'((?:\\[\s\S]|[^'\\])*)'/g,(whole,t,d,s)=>{const quote=t!==undefined?'`':d!==undefined?'"':"'";const raw=t??d??s;if(quote==='`'&&raw.includes('${'))return whole;const decoded=decodeString(raw,quote);const value=replaceValue(decoded);return value!==decoded?JSON.stringify(value):whole;});
 else text=localizeAssets(text);
 // Case studies are now editable HTML pages generated from content/projects.json.
 if(file.includes('script_main.'))text=text.replace(/\w+:\{elements:\{\},page:C\(\(\)=>import\(`[^`]+`\)\),path:`\/case-studies\/[^`]+`\},?/g,'');
 if(text!==before){await fs.writeFile(file,text);modified++;}
}
for(const rel of ['index.html','work/index.html','about/index.html']){
 let html=await fs.readFile(path.join(source,rel),'utf8');
 // Change text nodes and attributes without disturbing production element geometry.
 const rawBlocks=[];
 html=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,block=>{rawBlocks.push(block);return `<!--SM_RAW_${rawBlocks.length-1}-->`});
 html=html.replace(/>([^<>]+)</g,(whole,value)=>'>'+replaceValue(value.replaceAll('&#x27;',"'").replaceAll('&amp;','&').replaceAll('&quot;','"')).replaceAll('&','&amp;').replaceAll('"','&quot;')+'<');
 html=html.replace(/<!--SM_RAW_(\d+)-->/g,(_,index)=>rawBlocks[Number(index)]);
 for(const [from,to] of Object.entries(links))html=html.replaceAll(from,to.replaceAll('&','&amp;'));
 html=localizeAssets(html).replaceAll('Jackie Zhang',profile.name).replaceAll('aria-label="Product Designer"','aria-label="'+profile.role+'"');
 html=html.replace(/<meta\s+(?:name|property)="(?:description|og:title|og:description|og:image|og:url|twitter:title|twitter:description|twitter:image)"[^>]*>/g,'').replace(/<link[^>]+rel="(?:canonical|icon|apple-touch-icon)"[^>]*>/g,'');
 html=html.replace('</head>',`<meta name="description" content="${htmlEscape(profile.intro)}"><meta property="og:title" content="${profile.name} — AI, design & code"><meta property="og:description" content="${htmlEscape(profile.intro)}"><meta property="og:image" content="/personal/assets/social-card.svg"><link rel="icon" href="/personal/assets/favicon.svg"><link rel="stylesheet" href="/personal/personal.css"><script type="module" src="/personal/personal.js"></script></head>`);
 const page=rel==='index.html'?'/':rel.split('/')[0];
 html=html.replace('<html ',`<html data-personalized="satyarth" data-sm-page="${page==='/'?'/':'/'+page}" `);
 const dest=path.join(out,rel);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);
}
await fs.writeFile(path.join(out,'personal/profile.json'),JSON.stringify(profile,null,2));
await fs.writeFile(path.join(out,'personal/projects.json'),JSON.stringify(projects,null,2));
await fs.copyFile('src/personal/personal.css',path.join(out,'personal/personal.css'));
await fs.copyFile('src/personal/personal.js',path.join(out,'personal/personal.js'));
await buildCasePages(out,projects,profile);
const pages=await buildSEO(out,projects,profile,origin);
// Rebuild inherited search data from current public pages, not the reference identity.
const searchIndex=Object.fromEntries(pages.map(page=>[page.url,{version:1,title:page.title,description:page.description,keywords:'',h1:[page.name],h2:[],h3:[],h4:[],h5:[],h6:[],p:[page.description],codeblock:[],url:page.url}]));
for(const file of await walk(path.join(out,'vendor')))if(/^searchIndex-.*\.json$/.test(path.basename(file)))await fs.writeFile(file,JSON.stringify(searchIndex));
const server=(await fs.readFile('scripts/serve.mjs','utf8')).replace("new URL('../outputs/portfolio/',import.meta.url)","new URL('./',import.meta.url)");
await fs.writeFile(path.join(out,'serve.mjs'),server);
await fs.writeFile(path.join(out,'package.json'),JSON.stringify({name:'satyarth-mishra-portfolio',private:true,type:'module',scripts:{start:'node serve.mjs'}},null,2));
await fs.copyFile('content/README.md',path.join(out,'README.md'));
await fs.copyFile('content/PRIVACY-AND-ANALYTICS.md',path.join(out,'PRIVACY-AND-ANALYTICS.md'));
await fs.copyFile('content/HTTPS-FAQ-REVIEWS.md',path.join(out,'HTTPS-FAQ-REVIEWS.md'));
await fs.copyFile('content/QA.md',path.join(out,'QA.md'));
await fs.copyFile('content/VISUAL-FIX.md',path.join(out,'VISUAL-FIX.md'));
await fs.writeFile(path.join(out,'personal/build-report.json'),JSON.stringify({built:new Date().toISOString(),modifiedModules:modified,profile:profile.name,projects:projects.map(p=>({id:p.id,repo:p.repo,status:p.status})),assetOverrides:Object.keys(assetMap).length},null,2));
console.log(`Personalized ${modified} modules, 3 main pages and ${projects.length} project stories. Output: ${out}`);
