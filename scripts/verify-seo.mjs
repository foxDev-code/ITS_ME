import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import vm from 'node:vm';
import {siteOrigin,shareTags} from './seo.mjs';
const root=path.resolve('outputs/satyarth-portfolio');
const namespaces=new Set(['http://www.w3.org/2000/svg','http://www.w3.org/1999/xlink','http://www.w3.org/1999/xhtml','http://www.w3.org/1998/Math/MathML','http://www.w3.org/XML/1998/namespace','http://www.w3.org/2000/xmlns/']);
const insecureURLs=text=>[...text.matchAll(/(?:http|ws):\/\/[^\s"'`<>)}\\]+/g)].map(m=>m[0]).filter(url=>!namespaces.has(url));
assert.equal(insecureURLs('<svg xmlns="http://www.w3.org/2000/svg">').length,0,'XML namespace is not a resource request');
for(const source of ['<img src="http://assets.test/a.png">','a{background:url(http://assets.test/a.png)}','fetch("http://api.test/data")','new WebSocket("ws://api.test")'])assert.equal(insecureURLs(source).length,1,'Detect insecure resource references');
async function scanResources(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await scanResources(file);else if(/\.(?:m?js|css|svg)$/.test(file)){const urls=insecureURLs(await fs.readFile(file,'utf8'));assert.deepEqual(urls,[],'Insecure URL needs review in '+file);}}}
await scanResources(path.join(root,'vendor'));await scanResources(path.join(root,'personal'));
assert.throws(()=>siteOrigin(undefined,true));
for(const value of ['http://localhost:4173','https://example.com','https://test.invalid','https://site.test/path'])assert.throws(()=>siteOrigin(value,true));
assert.equal(siteOrigin('https://portfolio.test',true),'https://portfolio.test');
const pages=JSON.parse(await fs.readFile(path.join(root,'personal/pages.json')));
const imageAlts=JSON.parse(await fs.readFile(path.join(root,'personal/image-alts.json')));
assert(shareTags(pages[0],'https://portfolio.test').includes('content="https://portfolio.test/personal/assets/share-default-placeholder.png"'),'Production share image must use the configured origin');
const runtime=await fs.readFile(path.join(root,'personal/personal.js'),'utf8');
const altFunction=runtime.match(/function applyImageAlts\(\)\{[\s\S]*?\n\}/)[0];
const imageNodes=Object.keys(imageAlts).map(key=>({src:'/personal/assets/'+key,description:null,getAttribute(name){return name==='src'?this.src:this.description},set alt(value){this.description=value}}));
const altContext={URL,imageAlts,document:{querySelectorAll:()=>imageNodes},location:{href:'https://portfolio.test/'}};
vm.runInNewContext(altFunction+';applyImageAlts();',altContext);
for(const node of imageNodes)assert.equal(node.description,imageAlts[node.src.split('/').pop()],'Runtime image alt: '+node.src);
imageNodes[0].src='/personal/assets/helmet-front.png';vm.runInNewContext('applyImageAlts()',altContext);assert.equal(imageNodes[0].description,imageAlts['helmet-front.png'],'Alt follows an image source change');
const profile=JSON.parse(await fs.readFile(path.join(root,'personal/profile.json')));
const gallery=vm.runInNewContext(runtime.match(/const gallery=(\[[\s\S]*?\n\]);/)[1],{profile});
for(const shot of gallery){const key=new URL(shot.image,'https://portfolio.test/').pathname.split('/').pop();assert(Object.hasOwn(imageAlts,key)&&imageAlts[key],'Gallery artwork needs specific alt: '+key);}
const navigation=runtime.match(/document\.addEventListener\('click',event=>\{[\s\S]*?\},true\);/)[0];
let handler,destination;
vm.runInNewContext(navigation,{URL,pages,document:{addEventListener:(_,fn)=>handler=fn},location:{origin:'https://portfolio.test',pathname:'/work',href:'https://portfolio.test/work',assign:url=>destination=url}});
const makeEvent=(href,extra={})=>({button:0,target:{closest:()=>({href,target:'',dataset:{},hasAttribute:()=>false})},preventDefault(){this.prevented=true},stopImmediatePropagation(){this.stopped=true},...extra});
const projectClick=makeEvent('https://portfolio.test/projects/nexus-ai-ops/');handler(projectClick);assert.equal(destination,'https://portfolio.test/projects/nexus-ai-ops/');assert(projectClick.prevented&&projectClick.stopped);
for(const event of [makeEvent('https://portfolio.test/projects/nexus-ai-ops/',{ctrlKey:true}),makeEvent('https://github.com/foxDev-code')]){destination=undefined;handler(event);assert.equal(destination,undefined);assert(!event.prevented);}
assert.equal(new Set(pages.map(p=>p.title)).size,pages.length,'Unique titles');
assert.equal(new Set(pages.map(p=>p.description)).size,pages.length,'Unique descriptions');
const xml=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');
const locations=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]));
assert.deepEqual(locations.map(u=>u.pathname),pages.map(p=>p.url),'Sitemap follows public page registry');
assert(!/\/review|\/404|\/case-studies|\/admin|\/login|\/thank-you/.test(xml));
const robots=await fs.readFile(path.join(root,'robots.txt'),'utf8');
assert(!/^Disallow:\s*\/\s*$/mi.test(robots));
assert(robots.includes(`Sitemap: ${locations[0].origin}/sitemap.xml`));
const child=spawn(process.execPath,[path.join(root,'serve.mjs'),'0'],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
try{
 const base=await new Promise((resolve,reject)=>{let output='';const timeout=setTimeout(()=>reject(Error('Server startup timed out')),10000);child.on('error',reject);child.on('exit',code=>{clearTimeout(timeout);reject(Error('Test server exited '+code))});child.stdout.on('data',b=>{output+=b;const match=output.match(/http:\/\/localhost:\d+/);if(match){clearTimeout(timeout);resolve(match[0])}})});
 const incoming=new Set();let links=0,images=0,resources=0;const shareImages=new Set();
 const checkResources=html=>{
  for(const match of html.matchAll(/<(img|script|link|video|audio|source|iframe|object|embed)\b[^>]*>/gi)){
   const tag=match[0];if(match[1].toLowerCase()==='link'&&!/rel="(?:stylesheet|preload|modulepreload|icon|apple-touch-icon|preconnect|dns-prefetch)"/i.test(tag))continue;
   for(const attribute of tag.matchAll(/(?:src|srcset|href|poster|data)="([^"]+)"/gi)){assert.deepEqual(insecureURLs(attribute[1]),[],'Insecure resource '+attribute[1]);assert(!attribute[1].startsWith('//'),'Use explicit HTTPS for external resources');resources++;}
  }
  for(const match of html.matchAll(/url\(\s*["']?([^\s)"']+)/g))assert.deepEqual(insecureURLs(match[1]),[],'Insecure CSS resource');
  for(const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))assert(!/"@type"\s*:\s*(?:\[[^\]]*)?"(?:FAQPage|Review|AggregateRating)"/.test(match[1]),'No FAQ or review-star schema');
 };
 const checkShare=async(html,page)=>{
  const tags=new Map();
  for(const match of html.matchAll(/<meta\b[^>]*>/g)){
   const key=match[0].match(/(?:name|property)="([^"]+)"/)?.[1];if(!key?.match(/^(og:|twitter:)/))continue;
   assert(!tags.has(key),'Duplicate share tag '+key+' on '+page.url);
   tags.set(key,match[0].match(/content="([^"]*)"/)?.[1]);
  }
  for(const key of ['og:title','og:description','og:type','og:url','og:image','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'])assert(tags.get(key),page.url+' missing '+key);
  assert.equal(tags.get('twitter:card'),'summary_large_image');
  assert.equal(tags.get('og:url'),locations[0].origin+page.url);
  assert.equal(tags.get('og:image'),tags.get('twitter:image'));
  assert.equal(tags.get('og:title'),tags.get('twitter:title'));
  assert.equal(tags.get('og:description'),tags.get('twitter:description'));
  assert.equal(tags.get('og:image:width'),'1200');assert.equal(tags.get('og:image:height'),'630');
  assert.equal(tags.get('og:image:type'),'image/png');
  const image=new URL(tags.get('og:image'));assert.equal(image.origin,locations[0].origin);assert(image.pathname.endsWith('.png'));
  if(!shareImages.has(image.pathname)){
   const response=await fetch(base+image.pathname);assert.equal(response.status,200);assert(response.headers.get('content-type').startsWith('image/png'));
   const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.subarray(1,4).toString(),'PNG');assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);assert(bytes.length<5*1024*1024);
   shareImages.add(image.pathname);
  }
 };
 for(const page of pages){
  const res=await fetch(base+page.url);assert.equal(res.status,200,page.url);const html=await res.text();
  checkResources(html);
  assert.equal((html.match(/<title>/g)||[]).length,1,page.url+' title count');
  assert.equal((html.match(/<meta name="description"/g)||[]).length,1,page.url+' description count');
  const escaped=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  assert(html.includes(`<title>${escaped(page.title)}</title>`));assert(html.includes(`name="description" content="${escaped(page.description)}"`));
  await checkShare(html,page);
  assert(html.includes('id="sm-privacy-config"')&&html.includes('src="/personal/consent.js"'),'Consent controls on '+page.url);
  assert(/<footer class="sm-site-index">[\s\S]*?href="\/privacy"/.test(html),'Footer privacy link on '+page.url);
  assert(!/<form\b/.test(html),'Email-only pages must not acquire a submission form');
  for(const match of html.matchAll(/<img\b[^>]*>/g)){
   const src=match[0].match(/\bsrc="([^"]+)"/)?.[1];const key=src?.split('?')[0].split('/').pop();
   assert(Object.hasOwn(imageAlts,key),'Unreviewed image '+src);
   assert.equal(match[0].match(/\balt="([^"]*)"/)?.[1],escaped(imageAlts[key]),page.url+' image '+src);images++;
  }
  for(const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"[^>]*>/g)){
   const url=new URL(match[1].replaceAll('&amp;','&'),base+page.url);if(url.origin!==base)continue;
   const target=await fetch(url,{method:'HEAD'});assert.equal(target.status,200,`${page.url} -> ${url.pathname}`);links++;
   if(url.pathname!==page.url)incoming.add(url.pathname);
  }
 }
 for(const p of pages)assert(incoming.has(p.url),'Orphan page: '+p.url);
 for(const route of ['/sitemap.xml','/robots.txt'])assert.equal((await fetch(base+route)).status,200);
 const thanks=await fetch(base+'/thank-you');assert.equal(thanks.status,200);const thanksHTML=await thanks.text();assert(thanksHTML.includes('name="robots" content="noindex,follow"'));assert(thanks.headers.get('x-robots-tag').includes('noindex'));assert(!xml.includes('/thank-you'));await checkShare(thanksHTML,{url:'/thank-you'});
 checkResources(thanksHTML);
 assert(thanksHTML.includes('does not confirm that a message was sent or received'),'No false receipt confirmation');
 assert.equal((await fetch(base+'/personal/consent.js')).status,200);
 for(const route of ['/','/about','/api/contact']){const response=await fetch(base+route,{method:'POST',body:'name=Test&email=test%40example.test&message=test'});assert.equal(response.status,405);assert.equal(response.headers.get('allow'),'GET, HEAD');}
 console.log('PASS privacy/contact: footer privacy links, no submission forms, POST rejected with 405, thank-you HTTP 200 + noindex and excluded from sitemap.');
 for(const route of ['/this-page-does-not-exist-seo-check','/missing/deep/page','/404.html']){
  const response=await fetch(base+route);assert.equal(response.status,404);const errorHTML=await response.text();assert(errorHTML.includes('This page wandered'));checkResources(errorHTML);await checkShare(errorHTML,{url:'/404.html'});assert.equal((await fetch(base+route,{method:'HEAD'})).status,404);console.log(`GET ${route} -> HTTP 404`);
 }
 const aboutContent=JSON.parse(await fs.readFile('content/about-extras.json'));
 const aboutHTML=await (await fetch(base+'/about')).text();
 assert.equal((aboutHTML.match(/<details name="portfolio-faq">/g)||[]).length,aboutContent.faq.filter(f=>!f.needsConfirmation).length);
 const escaped=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 for(const faq of aboutContent.faq){assert(faq.evidence.length,'FAQ must cite existing content');if(!faq.needsConfirmation)assert(aboutHTML.includes(escaped(faq.question))&&aboutHTML.includes(escaped(faq.answer)),'Published FAQ content');else assert(!aboutHTML.includes(escaped(faq.question)),'Unconfirmed FAQ stays unpublished');}
 const reviewSection=aboutHTML.match(/<section id="testimonials"[\s\S]*?<\/section>/)[0];
 assert.equal((reviewSection.match(/data-sm-review-placeholder=/g)||[]).length,aboutContent.reviewPlaceholders.length);
 assert(reviewSection.includes('Placeholders only. No reviews have been published here.'));
 assert(!/<img|<blockquote|rating|★|☆/.test(reviewSection),'Placeholders must not invent photos, quotes or ratings');
 assert.equal((await fetch(base+'/case-studies/heygo-creator/',{redirect:'manual'})).status,301);
 console.log(`PASS SEO: ${pages.length} public pages, ${links} internal link checks, unique metadata, no orphan pages, sitemap, robots, 404 GET/HEAD, legacy redirect and production URL guard.`);
 console.log(`PASS share/alt: ${pages.length} public pages plus 404, ${shareImages.size} PNG cards at 1200 × 630, ${images} HTML image instances and ${Object.keys(imageAlts).length} reviewed runtime image sources.`);
 console.log(`PASS launch content: ${resources} resource attributes plus bundled JS/CSS/SVG scans; no insecure resource URLs. Native FAQ and empty review placeholders present; no FAQ/review-star schema. Live TLS and HTTP redirects still require deployment.`);
}finally{child.kill();}
