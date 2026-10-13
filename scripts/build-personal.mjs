import fs from 'node:fs/promises';
import path from 'node:path';
import {buildArt} from './personal-art.mjs';
import {buildCasePages} from './personal-pages.mjs';
import {buildSEO,siteOrigin} from './seo.mjs';
import {nativeImageURLs,homeSemantics,heroImage,heroSizes} from './performance.mjs';
const source=path.resolve('outputs/portfolio');
const out=path.resolve('outputs/satyarth-portfolio');
const profile=JSON.parse(await fs.readFile('content/profile.json','utf8'));
const origin=siteOrigin(process.env.SITE_URL??profile.siteUrl,process.argv.includes('--production'));
const projects=JSON.parse(await fs.readFile('content/projects.json','utf8'));
const replacements=JSON.parse(await fs.readFile('content/replacements.json','utf8'));
const mediaVariants=JSON.parse(await fs.readFile('content/media-variants.json','utf8'));
const responsiveImages=JSON.parse(await fs.readFile('content/responsive-images.json','utf8'));
const optimizeMedia=value=>Object.entries(mediaVariants).reduce((text,[from,to])=>text.replaceAll(from,to),value);
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
await fs.copyFile('content/google02cefb3da2b660c7.html',path.join(out,'google02cefb3da2b660c7.html'));
await fs.copyFile('content/BingSiteAuth.xml',path.join(out,'BingSiteAuth.xml'));
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
Object.assign(assetMap,mediaVariants);
function localizeAssets(value){return nativeImageURLs(optimizeMedia(value.replace(/\/vendor\/framerusercontent\.com\/images\/([A-Za-z0-9_-]+\.(?:png|jpe?g|gif|webp))(?:\?[^\s"'`<>)]*)?/g,(whole,name)=>assetMap[name]?'/personal/assets/'+assetMap[name]:whole)),responsiveImages);}
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
function personalizeWork(text,markup=false){
 if(markup)text=text.replace(/>(Who's Speaking|Triple Time|ResQued)<\/p>[\s\S]*?(?=<div class="framer-h1nwjz")/g,(block,title)=>title==="Who's Speaking"?block.replace('>creator<','>contributor<'):title==='Triple Time'?block.replace('>2025<','>Prototype<'):block.replace('>Founding Product Designer<','>Web developer<'));
 else text=text.replace(/a\(Z,\{[\s\S]*?XapXkaNR5:`([^`]*)`\}\)/g,(block,title)=>title==="Who's Speaking"?block.replace('AM_Uz7jtd:`creator`','AM_Uz7jtd:`contributor`'):title==='Triple Time'?block.replace('rimFueKV0:`2025`','rimFueKV0:`Prototype`'):title==='ResQued'?block.replace('AM_Uz7jtd:`Founding Product Designer`','AM_Uz7jtd:`Web developer`'):block);
 const marker=name=>markup?`class="${name}"`:'className:`'+name+'`';
 const section=(start,end,patch)=>{let matches=0;text=text.replace(new RegExp(marker(start)+'[\\s\\S]*?(?='+marker(end)+')','g'),part=>{matches++;return patch(part)});if(!matches)throw Error('Missing Work component boundary: '+start);};
 const replace=(part,from,to)=>part.replaceAll(from,to).replaceAll(htmlEscape(from),htmlEscape(to));
 section('framer-roufdp-container','framer-1muoi1b',part=>{
  for(const [from,to] of [['Platform to stream on Heygo.','PDF extraction, semantic retrieval and structured document analysis.'],['Better streaming experience also increased tipping by 8%/stream','FastAPI connects the review interface to Gemini and Pinecone.'],['Increased tap through from the feed into the post. Which led to higher retention and more "aha" moments','Requirements-to-test workflows with AI-assisted planning, automation generation and failure analysis.'],['Logbox: Medical • B2B SaaS','Explore more prototypes on GitHub.']])part=replace(part,from,to);
  return part;
 });
 section('framer-m4dmhz-container','framer-1ymsxrh',part=>replace(part,'Increased tap through from the feed into the post. Which led to higher retention and more "aha" moments','Ticket booking, QR presentation and journey history in one passenger flow.').replace(/\/vendor\/framerusercontent\.com\/images\/FF0v8B2xhAfWfJeXfK4H4RnhRRw\.png(?:\?[^\s`"<>]+)?/g,'/personal/assets/metro-flow.svg'));
 return text;
}
let modified=0;
for(const file of await walk(path.join(out,'vendor'))){if(!/\.(mjs|js|json|css)$/.test(file))continue;let text=await fs.readFile(file,'utf8');const before=text;
 if(path.basename(file).startsWith('09z_toCCH'))text=personalizeWork(text);
 if(/\.(mjs|js)$/.test(file))text=text.replace(/`((?:\\[\s\S]|[^`\\])*)`|"((?:\\[\s\S]|[^"\\])*)"|'((?:\\[\s\S]|[^'\\])*)'/g,(whole,t,d,s)=>{const quote=t!==undefined?'`':d!==undefined?'"':"'";const raw=t??d??s;if(quote==='`'&&raw.includes('${'))return whole;const decoded=decodeString(raw,quote);const value=replaceValue(decoded);return value!==decoded?JSON.stringify(value):whole;});
 else text=localizeAssets(text);
 if(path.basename(file).startsWith('n3aQpPOIiQ-')){
  text=homeSemantics(text);
  // Keep the already-visible hero eager after hydration too; preserve all Motion controllers.
  text=text.replace(/background:\{[^{}]*zreYWHKtYVvdYwuZm8gBYAa3IiA[^{}]*\}/g,block=>block.replace(/loading:[^,]+,/g,'').replace('background:{','background:{loading:"eager",'));
 }
 // Case studies are now editable HTML pages generated from content/projects.json.
 if(file.includes('script_main.'))text=text.replace(/\w+:\{elements:\{\},page:C\(\(\)=>import\(`[^`]+`\)\),path:`\/case-studies\/[^`]+`\},?/g,'');
 if(['n3aQpPOIiQ-','Du1hgjZRKl','09z_toCCH'].some(prefix=>path.basename(file).startsWith(prefix))){
  // The page is inside Framer's Suspense boundary; a root effect fires too early.
  const pageRoot='function(e,n){';
  if(text.split(pageRoot).length!==2)throw Error('Framer page changed: review the hydration handoff.');
  text='import {M as smEffect} from "./react.D6X0ds_s.mjs";\n'+text.replace(pageRoot,pageRoot+'smEffect(()=>{document.documentElement.dataset.smHydrated="true";document.dispatchEvent(new Event("sm:hydrated"));},[]);');
 }
 if(text!==before){await fs.writeFile(file,text);modified++;}
}
for(const rel of ['index.html','work/index.html','about/index.html']){
 let html=await fs.readFile(path.join(source,rel),'utf8');
 if(rel==='work/index.html')html=personalizeWork(html,true);
 // Change text nodes and attributes without disturbing production element geometry.
 const rawBlocks=[];
 html=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,block=>{rawBlocks.push(block);return `<!--SM_RAW_${rawBlocks.length-1}-->`});
 html=html.replace(/>([^<>]+)</g,(whole,value)=>'>'+replaceValue(value.replaceAll('&#x27;',"'").replaceAll('&amp;','&').replaceAll('&quot;','"')).replaceAll('&','&amp;').replaceAll('"','&quot;')+'<');
 html=html.replace(/<!--SM_RAW_(\d+)-->/g,(_,index)=>rawBlocks[Number(index)]);
 for(const [from,to] of Object.entries(links))html=html.replaceAll(from,to.replaceAll('&','&amp;'));
 html=localizeAssets(html).replaceAll('Jackie Zhang',profile.name).replaceAll('aria-label="Product Designer"','aria-label="'+profile.role+'"');
 if(rel==='index.html')html=homeSemantics(html,true);
 const heading=rel==='index.html'?`${profile.name} — AI, design and code`:rel.startsWith('work/')?'Projects and experiments':`About ${profile.name}`;
 // Keep the accessible heading outside the React hydration container.
 html=html.replace('<div id="main"',`<h1 id="sm-page-heading" class="sm-sr-only">${htmlEscape(heading)}</h1><div role="main" id="main" aria-labelledby="sm-page-heading"`);
 // Lighthouse identified this notebook illustration as the mobile LCP image.
 html=html.replace(/<img\b[^>]*>/g,tag=>tag.includes('zreYWHKtYVvdYwuZm8gBYAa3IiA')?tag.replace(/\s+(?:loading|fetchpriority|sizes)="[^"]*"/g,'').replace('<img ',`<img loading="eager" fetchpriority="high" sizes="${heroSizes}" `):tag);
 if(rel==='index.html'){
  const family=responsiveImages[heroImage],srcset=Object.values(family).map(item=>`/personal/assets/${item.file} ${item.width}w`).join(',');
  html=html.replace('</head>',`<link rel="preload" as="image" href="/personal/assets/${family.default.file}" imagesrcset="${srcset}" imagesizes="${heroSizes}" fetchpriority="high"></head>`);
 }
 html=html.replace(/<meta\s+(?:name|property)="(?:description|og:title|og:description|og:image|og:url|twitter:title|twitter:description|twitter:image)"[^>]*>/g,'').replace(/<link[^>]+rel="(?:canonical|icon|apple-touch-icon)"[^>]*>/g,'');
 html=html.replace('</head>',`<meta name="description" content="${htmlEscape(profile.intro)}"><meta property="og:title" content="${profile.name} — AI, design & code"><meta property="og:description" content="${htmlEscape(profile.intro)}"><meta property="og:image" content="/personal/assets/social-card.svg"><link rel="icon" href="/personal/assets/favicon.svg"><link rel="stylesheet" href="/personal/personal.css"><script type="module" src="/personal/personal.js"></script></head>`);
 const page=rel==='index.html'?'/':rel.split('/')[0];
 html=html.replace('<html ',`<html data-personalized="satyarth" data-sm-page="${page==='/'?'/':'/'+page}" `);
 const dest=path.join(out,rel);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,html);
}
await fs.writeFile(path.join(out,'personal/profile.json'),JSON.stringify(profile,null,2));
await fs.writeFile(path.join(out,'personal/projects.json'),JSON.stringify(projects,null,2));
await fs.writeFile(path.join(out,'personal/personal.css'),optimizeMedia(await fs.readFile('src/personal/personal.css','utf8')));
await fs.writeFile(path.join(out,'personal/personal.js'),optimizeMedia(await fs.readFile('src/personal/personal.js','utf8')));
await buildCasePages(out,projects.map(p=>({...p,image:mediaVariants[p.image]??p.image,secondaryImage:mediaVariants[p.secondaryImage]??p.secondaryImage})),profile);
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
