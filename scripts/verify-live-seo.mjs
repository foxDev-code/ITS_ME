// Read-only deployment audit. Optional third argument tests a local server with production metadata.
import fs from 'node:fs/promises';
import {siteOrigin} from './seo.mjs';
import {measurementId} from './privacy.mjs';
const profile=JSON.parse(await fs.readFile('content/profile.json','utf8'));
const origin=siteOrigin(process.argv[2]??profile.siteUrl,true);
const transport=process.argv[3]?siteOrigin(process.argv[3]):origin;
const pages=JSON.parse(await fs.readFile('outputs/satyarth-portfolio/personal/pages.json','utf8'));
const alts=JSON.parse(await fs.readFile('outputs/satyarth-portfolio/personal/image-alts.json','utf8'));
const problems=[],records=[],links=new Set(),incoming=new Set(),shareImages=new Set();
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#x27;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const attr=(tag,name)=>decode(tag.match(new RegExp('\\b'+name+'="([^"]*)"','i'))?.[1]??'');
const check=(valid,message)=>{if(!valid)problems.push(message)};
const request=(url,options={})=>{const target=new URL(url);return fetch(target.origin===origin?transport+target.pathname+target.search:url,{...options,signal:AbortSignal.timeout(20000)})};
const get=url=>request(url);
let imageCount=0;
for(const page of [...pages,{url:'/thank-you'}]){
 const response=await get(origin+page.url),html=await response.text();
 check(response.status===200,page.url+': HTTP '+response.status);
 check(response.headers.get('x-content-type-options')==='nosniff',page.url+': missing nosniff header');
 check(response.headers.get('referrer-policy')==='strict-origin-when-cross-origin',page.url+': unexpected referrer policy');
 const tags=new Map();
 for(const tag of html.match(/<meta\b[^>]*>/gi)??[]){const key=attr(tag,'name')||attr(tag,'property');check(!tags.has(key),page.url+': duplicate '+key);tags.set(key,attr(tag,'content'));}
 const title=decode(html.match(/<title>([^<]*)<\/title>/i)?.[1]??'');
 records.push({path:page.url,status:response.status,title,description:tags.get('description')});
 check(title.endsWith(' | '+profile.siteName),page.url+': outdated or missing site title');
 if(page.title){check(title===page.title,page.url+': title differs from current build');check(tags.get('description')===page.description,page.url+': description differs from current build');}
 if(page.title)check(!tags.get('robots')?.includes('noindex')&&!response.headers.get('x-robots-tag')?.includes('noindex'),page.url+': public page must remain indexable');
 const canonical=(html.match(/<link\b[^>]*>/gi)??[]).find(t=>attr(t,'rel')==='canonical');
 check(canonical&&attr(canonical,'href')===origin+page.url,page.url+': incorrect canonical URL');
 for(const key of ['og:title','og:description','og:type','og:url','og:image','twitter:card','twitter:title','twitter:description','twitter:image'])check(tags.get(key),page.url+': missing '+key);
 check(tags.get('og:url')===origin+page.url,page.url+': incorrect og:url');
 check(tags.get('og:site_name')===profile.siteName,page.url+': missing site name');
 for(const icon of ['favicon.svg','favicon-48.png','apple-touch-icon.png'])check(html.includes('href="/personal/assets/'+icon+'"'),page.url+': missing '+icon);
 if(page.url==='/'){const data=[...html.matchAll(/type="application\/ld\+json"[^>]*>([^<]+)</g)].map(m=>JSON.parse(m[1]));check(data.some(d=>d['@type']==='WebSite'&&d.name===profile.siteName&&d.url===origin+'/'),'/ : missing WebSite structured data');}
 check(tags.get('og:title')===title&&tags.get('twitter:title')===title,page.url+': inconsistent share titles');
 check(tags.get('twitter:card')==='summary_large_image',page.url+': incorrect Twitter card');
 check(tags.get('og:image')===tags.get('twitter:image'),page.url+': inconsistent share images');
 const image=tags.get('og:image');
 check(image?.startsWith(origin+'/personal/assets/'),page.url+': share image is not on the public HTTPS origin');
 if(image?.startsWith(origin+'/personal/assets/'))shareImages.add(image);
 for(const tag of html.match(/<img\b[^>]*>/gi)??[]){const src=attr(tag,'src'),key=src.split('?')[0].split('/').pop();check(/\balt="/.test(tag)&&Object.hasOwn(alts,key)&&attr(tag,'alt')===alts[key],page.url+': image alt mismatch '+src);imageCount++;}
 for(const tag of html.match(/<a\b[^>]*>/gi)??[]){const href=attr(tag,'href');if(!href)continue;const url=new URL(href,origin+page.url);if(url.origin!==origin)continue;url.hash='';links.add(url.href);if(url.pathname!==page.url)incoming.add(url.pathname);}
 check(/<footer\b[\s\S]*?href="\/privacy"/.test(html),page.url+': missing footer privacy link');
 check(!/<form\b/i.test(html),page.url+': unexpected submission form; audit protections before launch');
 const config=html.match(/id="sm-privacy-config"[^>]*>([^<]+)</)?.[1];
 check(config&&JSON.parse(config).measurementId===measurementId(process.env.GA_MEASUREMENT_ID??profile.gaMeasurementId),page.url+': real GA4 ID is not deployed');
 check(html.includes('src="/personal/consent.js"'),page.url+': missing consent integration');
 if(page.url==='/thank-you')check(tags.get('robots')?.includes('noindex'),'/thank-you: missing noindex');
 if(page.url==='/about'){
  const faq=JSON.parse(await fs.readFile('content/about-extras.json','utf8'));
  check((html.match(/<details name="portfolio-faq">/g)??[]).length===faq.faq.filter(f=>!f.needsConfirmation).length,'About: missing FAQ items');
  const reviews=html.match(/<section id="testimonials"[\s\S]*?<\/section>/)?.[0]??'';
  check((reviews.match(/data-sm-review-placeholder=/g)??[]).length===faq.reviewPlaceholders.length&&reviews.includes('Placeholders only. No reviews have been published here.')&&!/<blockquote|<img|★|☆/.test(reviews),'About: review placeholders need inspection');
 }
 console.log(`${page.url}: HTTP ${response.status}; ${title}`);
}
check(new Set(records.map(r=>r.title)).size===records.length,'Titles are not unique');
check(new Set(records.map(r=>r.description)).size===records.length,'Descriptions are not unique');
for(const page of pages)check(incoming.has(page.url),'Orphan page: '+page.url);
for(const url of links){const response=await request(url,{method:'HEAD'});check(response.status===200,'Broken internal link: '+url+' HTTP '+response.status);}
for(const url of shareImages){const response=await get(url),bytes=Buffer.from(await response.arrayBuffer());check(response.status===200&&bytes.length>=24&&bytes.subarray(1,4).toString()==='PNG'&&bytes.readUInt32BE(16)===1200&&bytes.readUInt32BE(20)===630,'Share card must be a reachable 1200 × 630 PNG: '+url);}
for(const [icon,size] of [['favicon-48.png',48],['apple-touch-icon.png',180]]){const response=await get(origin+'/personal/assets/'+icon),bytes=Buffer.from(await response.arrayBuffer());check(response.status===200&&bytes.length>=24&&bytes.readUInt32BE(16)===size&&bytes.readUInt32BE(20)===size,'Incorrect favicon dimensions: '+icon);}
const deployment=JSON.parse(await fs.readFile('vercel.json'));
for(const rule of deployment.redirects){const route=rule.source.replace('/:path*',''),response=await request(origin+route,{redirect:'manual'});check([301,308].includes(response.status)&&new URL(response.headers.get('location')??'/',origin).pathname===rule.destination,'Legacy redirect missing: '+route);}
const sitemapResponse=await get(origin+'/sitemap.xml'),xml=await sitemapResponse.text();
check(sitemapResponse.status===200,'Sitemap is unreachable');
const locations=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1]));
check(JSON.stringify(locations.slice().sort())===JSON.stringify(pages.map(p=>origin+p.url).sort()),'Sitemap must list exactly the public HTTPS pages');
const robotsResponse=await get(origin+'/robots.txt'),robots=await robotsResponse.text();
check(robotsResponse.status===200&&!/^Disallow:\s*\/\s*$/mi.test(robots)&&robots.includes('Sitemap: '+origin+'/sitemap.xml'),'Robots must allow crawling and link the live sitemap');
for(const route of ['/launch-check-missing-page','/missing/deep/launch-check'])for(const method of ['GET','HEAD']){const response=await request(origin+route,{method});check(response.status===404,method+' '+route+': expected 404, got '+response.status);if(method==='GET')check((await response.text()).includes('This page wandered'),route+': missing custom error page');console.log(`${method} ${route}: HTTP ${response.status}`);}
await fs.mkdir('work/launch-check',{recursive:true});
await fs.writeFile('work/launch-check/'+(transport===origin?'live':'local')+'-seo.json',JSON.stringify({checkedAt:new Date().toISOString(),origin,transport,pages:records,internalLinks:links.size,htmlImages:imageCount,shareImages:[...shareImages],problems,limits:['No GA4 dashboard access or analytics receipt verification','No actual WhatsApp or LinkedIn preview render','External destinations and full accessibility are not certified']},null,2));
if(problems.length){console.error('NOT READY: '+problems.length+' findings\n'+problems.join('\n'));process.exitCode=1;}
else console.log(`PASS ${transport===origin?'live':'local transport'} SEO/share: ${records.length} pages, ${links.size} internal destinations, ${imageCount} image instances, ${shareImages.size} share PNGs; GA4 configuration and consent markup present. Run consent tests and browser checks separately.`);
