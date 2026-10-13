// Extra launch safeguards. This is not a full security, accessibility or Core Web Vitals certification.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {gzipSync} from 'node:zlib';
const root='outputs/satyarth-portfolio';
const pages=JSON.parse(await fs.readFile(root+'/personal/pages.json'));
const profile=JSON.parse(await fs.readFile(root+'/personal/profile.json'));
const deployment=JSON.parse(await fs.readFile('vercel.json'));
const variants=JSON.parse(await fs.readFile('content/media-variants.json'));
const ratio=(a,b)=>{const luminance=hex=>hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);return (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05)};
assert.equal(ratio('ffffff','ffffff'),1);assert.equal(ratio('000000','ffffff'),21);
const styles=await fs.readFile(root+'/personal/personal.css','utf8');
const tone=name=>styles.match(new RegExp('--sm-'+name+':#([a-f0-9]{6})'))[1];
assert(styles.includes('.framer-1astofc .framer-text{color:#171717!important'),'Use sufficiently dark text on the vermilion card');
const contrast=[[tone('text-on-dark'),tone('ink')],[tone('text-on-paper'),tone('paper')],['171717',tone('red')],[tone('ink'),tone('paper')]].map(([foreground,background])=>({foreground,background,ratio:ratio(foreground,background)}));
for(const pair of contrast)assert(pair.ratio>=4.5,'Text contrast: '+JSON.stringify(pair));
const patterns={privateKey:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,awsAccessKey:/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,googleApiKey:/\bAIza[0-9A-Za-z_-]{35}\b/,githubToken:/\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{30,}\b/,githubFineGrained:/\bgithub_pat_[A-Za-z0-9_]{50,}\b/,providerSecret:/\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}\b/};
const findings=[];let files=0;
async function scan(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory()){assert(entry.name!=='.git','Never deploy Git internals');await scan(file);continue;}files++;assert(!/^(?:\.env(?:\..*)?|id_rsa|credentials\.json)$/i.test(entry.name),'Sensitive file must not be deployed: '+file);if(!/\.(?:html|m?js|css|json|svg|txt|md)$/.test(file))continue;const text=await fs.readFile(file,'utf8');for(const [rule,pattern] of Object.entries(patterns))if(pattern.test(text))findings.push({file,rule});}}
await scan(root);assert.deepEqual(findings,[],'Possible frontend credentials: review file/rule only; never print token values');
let before=0,after=0;
for(const [source,target] of Object.entries(variants)){
 assert(/^[\w-]+\.(?:png|jpe?g)$/.test(source)&&/^[\w-]+\.webp$/.test(target),'Variant paths must be simple media filenames');
 const original=await fs.stat('work/personalization/assets/'+source),optimized=await fs.readFile(root+'/personal/assets/'+target);
 assert(optimized.length<original.size*.9,'Variant must save at least 10%: '+target);assert.equal(optimized.toString('ascii',0,4),'RIFF');assert.equal(optimized.toString('ascii',8,12),'WEBP');before+=original.size;after+=optimized.length;
}
for(const [file,size] of [['favicon-48.png',48],['apple-touch-icon.png',180]]){const bytes=await fs.readFile(root+'/personal/assets/'+file);assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);}
const external=new Set(),payload=[];
for(const url of [profile.github,profile.linkedin,profile.twitter,...profile.visualReferences.map(p=>p.source)])external.add(url);
for(const page of [...pages,{url:'/thank-you'},{url:'/404.html'}]){
 const html=await fs.readFile(page.url==='/404.html'?root+'/404.html':path.join(root,page.url,'index.html'),'utf8');
 assert(html.includes('href="/personal/assets/favicon-48.png"')&&html.includes('href="/personal/assets/apple-touch-icon.png"'),'Favicon coverage: '+page.url);
 if(pages.includes(page))assert(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html),'Public page must remain indexable: '+page.url);
 assert(html.includes('href="/terms"'),'Footer terms link: '+page.url);
 for(const face of html.match(/@font-face\s*\{[^}]*\}/g)??[])assert(/font-display\s*:\s*(?:swap|optional)/.test(face),'Do not block text on missing font-display: '+page.url);
 if(page.url==='/'){const data=[...html.matchAll(/type="application\/ld\+json"[^>]*>([^<]+)</g)].map(m=>JSON.parse(m[1]));assert(data.some(d=>d['@type']==='WebSite'&&d.name==='foxDev'&&d.alternateName==='Satyarth Mishra'&&d.url==='https://foxdev-portfolio.vercel.app/'),'Site-name structured data');}
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one page heading: '+page.url);
 if(['/','/work','/about'].includes(page.url))assert(/<h1 id="sm-page-heading" class="sm-sr-only">[^<]+<\/h1><div role="main" id="main" aria-labelledby="sm-page-heading"/.test(html),'Keep page heading accessible and outside the hydration root');
 if(page.url==='/privacy')assert(html.includes('Enhanced Measurement is enabled')&&html.includes('does not guarantee')&&html.includes('scrolling, outbound link clicks and file-download clicks'),'Disclose enabled automatic analytics and URL limitations');
 if(page.url==='/')for(const tag of html.match(/<img\b[^>]*>/g).filter(t=>t.includes('zreYWHKtYVvdYwuZm8gBYAa3IiA')))assert(tag.includes('loading="eager"')&&tag.includes('fetchpriority="high"'),'Do not lazy-load the measured mobile LCP illustration');
 if(page.url==='/terms')assert(html.includes('Template — owner review required.')&&html.includes('Third-party designs'),'Terms must preserve third-party ownership and require review');
 for(const match of html.matchAll(/<a\b[^>]*href="(https:\/\/[^"#]+)"/g))external.add(match[1].replaceAll('&amp;','&'));
 payload.push({path:page.url,htmlBytes:Buffer.byteLength(html),gzipBytes:gzipSync(html).length});
}
for(const file of ['scripts/serve.mjs','scripts/personal-pages.mjs']){
 const source=await fs.readFile(file,'utf8'),legacy=vm.runInNewContext('('+source.match(/const legacy=(\{[^;]+\});/)[1]+')');
 for(const [old,id] of Object.entries(legacy))assert(deployment.redirects.some(r=>r.source===`/case-studies/${old}/:path*`&&r.destination===`/projects/${id}/`&&r.permanent===true),'Vercel must match local legacy redirects: '+old);
}
const runtime=await fs.readFile(root+'/personal/personal.js','utf8');assert(runtime.includes("item.setAttribute('role','button')")&&runtime.includes("event.key==='Enter'||event.key===' '"),'Connect must have a keyboard equivalent');
// Exercise both handoff orders: React ready before the module, and ready afterwards.
const handoff=runtime.slice(runtime.indexOf("if(document.documentElement.dataset.smHydrated==='true')"));
for(const ready of [true,false]){let starts=0,listener;vm.runInNewContext(handoff,{document:{documentElement:{dataset:{smHydrated:ready?'true':undefined}},addEventListener(name,callback,options){assert.equal(name,'sm:hydrated');assert.equal(options.once,true);listener=callback;}},startPersonalization(){starts++;}});assert.equal(starts,Number(ready));if(!ready){listener();assert.equal(starts,1);}}
const bootstrap=await fs.readFile(root+'/vendor/framerusercontent.com/sites/684hnbMBXBVbej1PQ2QXEz/script_main.BRbenO11.mjs','utf8');
assert(bootstrap.includes('smEffect(()=>{')&&bootstrap.includes('g(t,_(SmReady,{children:u}),{onRecoverableError:n})'),'Preserve React errors and signal the committed render');
const bing=await fs.readFile(root+'/BingSiteAuth.xml','utf8');assert.equal(bing,await fs.readFile('content/BingSiteAuth.xml','utf8'));assert(/<user>[A-F0-9]{32}<\/user>/.test(bing),'Bing root verification file');assert(!(await fs.readFile(root+'/sitemap.xml','utf8')).includes('BingSiteAuth'),'Verification file is not a public content page');
const keyHandler=runtime.match(/item\.addEventListener\('keydown',(event=>\{[^\n]+\})\);/)[1];
let clicks=0;const onKey=vm.runInNewContext('('+keyHandler+')',{item:{click(){clicks++;}}});
for(const key of ['Enter',' ','Escape']){const event={key,preventDefault(){this.prevented=true;}};onKey(event);assert.equal(!!event.prevented,key!=='Escape');}assert.equal(clicks,2);
assert(runtime.includes("link.setAttribute('aria-label','foxDev homepage')")&&runtime.includes("root.querySelectorAll('ul:has(>.ticker-item)')")&&runtime.includes("role.setAttribute('role','img')"),'Keep logo, ticker and role semantics fixes');
const robots=await fs.readFile(root+'/robots.txt','utf8');assert(/User-agent: \*\s+Allow: \//.test(robots)&&!/^Disallow:\s*\/\s*$/m.test(robots),'General allow rule covers OAI-SearchBot too');
const result={checkedAt:new Date().toISOString(),filesScanned:files,credentialFindings:findings,contrast,compression:{files:Object.keys(variants).length,before,after,saved:before-after},payload,externalLinks:[]};
if(process.argv.includes('--external')){
 const pending=[...external];
 await Promise.all(Array.from({length:4},async()=>{while(pending.length){const url=pending.shift();try{const response=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(12000)});result.externalLinks.push({url,status:response.status,finalUrl:response.url});}catch{result.externalLinks.push({url,status:'unverified: timeout or network failure'});}}}));
 const broken=result.externalLinks.filter(r=>[404,410].includes(r.status));
 if(broken.length){console.error('Broken external destinations: '+JSON.stringify(broken));process.exitCode=1;}
}
await fs.mkdir('work/launch-check',{recursive:true});await fs.writeFile('work/launch-check/expanded-checks.json',JSON.stringify(result,null,2));
console.log(`${process.exitCode?'NEEDS FIXES':'PASS'} extra launch checks: ${files} deployed files scanned; no recognized credential patterns; ${pages.length} indexable public pages; terms, site name, favicon sizes, redirect coverage, text-token contrast and ${Object.keys(variants).length} smaller WebP variants.`);
console.log(JSON.stringify({contrastRatios:contrast.map(c=>Number(c.ratio.toFixed(2))),compression:result.compression,payload:payload.filter(p=>['/','/work','/about'].includes(p.path)),checkedExternal:result.externalLinks.length,externalNeedsReview:result.externalLinks.filter(r=>r.status!==200)},null,2));
