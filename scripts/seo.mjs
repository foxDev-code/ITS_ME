import fs from 'node:fs/promises';
import path from 'node:path';
import {buildPrivacyPages,privacyPage,termsPage,thankYouPage,measurementId,consentMarkup} from './privacy.mjs';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function shareTags(page,origin){
 const image=origin+'/personal/assets/'+page.shareImage;
 const tags={
  'og:title':page.title,'og:description':page.description,'og:type':page.url.startsWith('/projects/')?'article':'website',
  'og:url':origin+page.url,'og:site_name':page.title.split(' | ').at(-1),'og:image':image,'og:image:type':'image/png','og:image:width':'1200','og:image:height':'630','og:image:alt':page.shareAlt,
  'twitter:card':'summary_large_image','twitter:title':page.title,'twitter:description':page.description,'twitter:image':image,'twitter:image:alt':page.shareAlt
 };
 return Object.entries(tags).map(([key,value])=>`<meta ${key.startsWith('og:')?'property':'name'}="${key}" content="${escape(value)}">`).join('');
}
export function siteOrigin(value,production=false){
 if(production&&!value)throw Error('Set SITE_URL to your real HTTPS launch origin before a production build.');
 const url=new URL(value||'http://localhost:4173');
 if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw Error('SITE_URL must be an HTTP(S) origin with no path, credentials, query or fragment.');
 if(production&&(url.protocol!=='https:'||/^(localhost|127\.|\[::1\]|.*\.localhost$)/.test(url.hostname)||url.hostname.endsWith('.invalid')||url.hostname==='example.com'))throw Error('Production SITE_URL must be your real public HTTPS origin.');
 return url.origin;
}
export async function buildSEO(out,projects,profile,origin){
 const gaId=measurementId(process.env.GA_MEASUREMENT_ID??profile.gaMeasurementId);
 await buildPrivacyPages(out,profile,gaId);
 const about=JSON.parse(await fs.readFile('content/about-extras.json','utf8'));
 const aboutSections=`<div class="sm-about-extras"><section id="faq" aria-labelledby="sm-faq-title"><p class="sm-kicker">A few useful answers</p><h2 id="sm-faq-title">Before we start.</h2><div class="sm-faq">${about.faq.filter(item=>!item.needsConfirmation).map(item=>`<details name="portfolio-faq"><summary>${escape(item.question)}<span aria-hidden="true">+</span></summary><p>${escape(item.answer)}</p></details>`).join('')}</div><p class="sm-faq-links"><a href="/work">Explore project stories</a><a href="${escape(profile.github)}" target="_blank" rel="noopener noreferrer">Browse my GitHub</a><a href="mailto:${escape(profile.email)}">Email Satyarth</a></p></section><section id="testimonials" aria-labelledby="sm-feedback-title"><p class="sm-kicker">Testimonials</p><h2 id="sm-feedback-title">Room for real feedback.</h2><p class="sm-feedback-note">Placeholders only. No reviews have been published here.</p><div class="sm-feedback-grid">${about.reviewPlaceholders.map(slot=>`<article class="sm-review-placeholder" data-sm-review-placeholder="${escape(slot.id)}" aria-label="Empty review placeholder ${escape(slot.id)}"><h3>Review placeholder ${escape(slot.id)}</h3><p>[Exact review text to be supplied]</p><p class="sm-placeholder-attribution">[Approved name and role to be supplied]</p></article>`).join('')}</div></section></div>`;
 const alts=JSON.parse(await fs.readFile('content/image-alts.json','utf8'));
 const variants=JSON.parse(await fs.readFile('content/media-variants.json','utf8'));
 for(const [original,variant] of Object.entries(variants))if(Object.hasOwn(alts,original))alts[variant]=alts[original];
 const responsive=JSON.parse(await fs.readFile('content/responsive-images.json','utf8'));
 for(const [original,family] of Object.entries(responsive)){
  if(!Object.hasOwn(alts,original))throw Error('Responsive image needs alt review: '+original);
  for(const item of Object.values(family))alts[item.file]=alts[original];
 }
 const applyAlts=html=>html.replace(/<img\b[^>]*>/g,tag=>{
  const src=tag.match(/\bsrc="([^"]+)"/)?.[1];
  const key=src?.split('?')[0].split('/').pop();
  if(!Object.hasOwn(alts,key))throw Error('Image needs an alt-text review: '+src);
  return tag.replace(/\s+alt="[^"]*"/gi,'').replace(/^<img\b/,`<img alt="${escape(alts[key])}"`);
 });
 const defaultShare={shareImage:'share-default-placeholder.png',shareAlt:'foxDev portfolio card with cream paper, vermilion accents and a chip sketch'};
 const projectShares={
  'agri-sarthi':{shareImage:'share-agri-sarthi.png',shareAlt:'Agri Sarthi share card with the crop-care interface, trees and a plant-health card'},
  'suraksha-one':{shareImage:'share-suraksha-one.png',shareAlt:'Suraksha One share card with an exploded helmet showing circuit boards, sensors and wiring'}
 };
 const main=[
  {url:'/',name:'AI, Design & Code',description:'Explore Satyarth Mishra’s work across AI engineering, digital products and visual design, with selected projects and creative experiments.'},
  {url:'/work',name:'Projects & Experiments',description:'Explore projects in crop awareness, safety interfaces, mobility and AI workflows, alongside smaller technical and creative experiments.'},
  {url:'/about',name:'About Me',description:'Meet Satyarth Mishra, a Computer Science and AI student in Greater Noida exploring engineering, visual design and creative collaboration.'},
  privacyPage,termsPage
 ];
 const pages=[...main,...projects.map(p=>({url:`/projects/${p.id}/`,name:p.name,description:p.summary,...projectShares[p.id]}))].map(p=>({...defaultShare,...p,title:`${p.name} | ${profile.siteName}`,canonical:origin+p.url}));
 const nav='<nav aria-label="Site pages"><a href="/">Homepage</a><a href="/work">Projects & experiments</a><a href="/about">About Satyarth</a><a href="/privacy">Privacy policy</a><a href="/terms">Website terms</a><button type="button" data-cookie-settings>Cookie settings</button></nav>';
 for(const page of pages){
  const file=path.join(out,page.url,'index.html');
  let html=await fs.readFile(file,'utf8');
  html=html.replace(/<title>[\s\S]*?<\/title>/gi,'').replace(/<meta\b(?=[^>]*(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)")[^>]*>/gi,'').replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/gi,'');
  html=applyAlts(html).replace(/<meta\b[^>]*name="robots"[^>]*>/gi,'').replace('</head>',`<title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">${shareTags(page,origin)}<link rel="canonical" href="${escape(origin+page.url)}"></head>`);
  if(page.url==='/')html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:profile.siteName,alternateName:profile.name,url:origin+'/'}).replaceAll('<','\\u003c')}</script></head>`);
  const projectLinks=page.url==='/work'?`<p>Explore the project stories</p><nav aria-label="All project stories">${projects.map(p=>`<a href="/projects/${escape(p.id)}/">${escape(p.name)}</a>`).join('')}<a href="https://foxdev-portfolio2.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio 02 ↗</a></nav>`:'';
  html=html.replace('</body>',`${page.url==='/about'?aboutSections:''}<footer class="sm-site-index">${projectLinks}${nav}</footer>${consentMarkup(gaId)}</body>`);
  await fs.writeFile(file,html);
 }
 const home=await fs.readFile(path.join(out,'index.html'),'utf8');
 const fonts=[...home.matchAll(/@font-face\s*\{[^}]+\}/g)].map(m=>m[0]).join('\n');
 const errorPage={...defaultShare,url:'/404.html',title:`Page Not Found | ${profile.siteName}`,description:'This page could not be found. Return to the homepage or explore Satyarth Mishra’s work and background.'};
 await fs.writeFile(path.join(out,'404.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page Not Found | ${escape(profile.siteName)}</title><meta name="description" content="This page could not be found. Return to the homepage or explore Satyarth Mishra’s work and background."><meta name="robots" content="noindex,follow"><style>${fonts}</style><link rel="stylesheet" href="/personal/personal.css"></head><body class="sm-not-found"><main><span class="sm-kicker">404 / A loose page</span><h1>This page wandered<br>out of the notebook.</h1><p>The link may be outdated, or the address may have a typo. Let’s get you back to something worth exploring.</p><a class="sm-home-button" href="/">Back to the homepage ↗</a>${nav}<span class="sm-error-signature">${escape(profile.siteName)}</span></main></body></html>`);
 const errorFile=path.join(out,'404.html');
 await fs.writeFile(errorFile,(await fs.readFile(errorFile,'utf8')).replace('</head>',shareTags(errorPage,origin)+'</head>'));
 await fs.writeFile(errorFile,(await fs.readFile(errorFile,'utf8')).replace('</body>',`<footer class="sm-site-index">${nav}</footer>${consentMarkup(gaId)}</body>`));
 const thanks={...defaultShare,...thankYouPage,title:`${thankYouPage.name} | ${profile.siteName}`};
 const thanksFile=path.join(out,'thank-you/index.html');
 await fs.writeFile(thanksFile,(await fs.readFile(thanksFile,'utf8')).replace('</head>',shareTags(thanks,origin)+`<link rel="canonical" href="${escape(origin+thanks.url)}"></head>`).replace('</body>',`<footer class="sm-site-index">${nav}</footer>${consentMarkup(gaId)}</body>`));
 for(const page of [...pages,{url:'/thank-you'},{url:'/404.html'}]){
  const file=page.url==='/404.html'?errorFile:path.join(out,page.url,'index.html');
  const html=(await fs.readFile(file,'utf8')).replace(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>/gi,'').replace(/@font-face\s*\{[^}]*\}/g,face=>/font-display\s*:/.test(face)?face:face.replace('{','{font-display:swap;'));
  await fs.writeFile(file,html.replace('</head>','<link rel="icon" type="image/svg+xml" href="/personal/assets/favicon.svg"><link rel="icon" type="image/png" sizes="48x48" href="/personal/assets/favicon-48.png"><link rel="apple-touch-icon" sizes="180x180" href="/personal/assets/apple-touch-icon.png"></head>'));
 }
 await fs.writeFile(path.join(out,'personal/image-alts.json'),JSON.stringify(alts,null,2));
 await fs.writeFile(path.join(out,'personal/pages.json'),JSON.stringify(pages,null,2));
 await fs.writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p=>`  <url><loc>${escape(origin+p.url)}</loc></url>`).join('\n')}\n</urlset>\n`);
 await fs.writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
 // Existing review artifacts are not public portfolio pages and must not be indexed.
 const review=path.join(out,'review');
 for(const file of await fs.readdir(review).catch(()=>[])){if(!file.endsWith('.html'))continue;const target=path.join(review,file);let html=await fs.readFile(target,'utf8');if(!/name="robots"/.test(html))await fs.writeFile(target,html.replace('</head>','<meta name="robots" content="noindex,follow"></head>'));}
 await fs.writeFile(path.join(out,'SEO-PAGES.md'),'# Page metadata\n\n'+(origin.includes('localhost')?'LOCAL PREVIEW ONLY: Set SITE_URL and run the production build before launch.\n\n':'')+'| Page | Title | Description |\n|---|---|---|\n'+pages.map(p=>`| ${p.url} | ${p.title.replaceAll('|','\\|')} | ${p.description} |`).join('\n')+'\n');
 console.log(`SEO: ${pages.length} public pages; sitemap origin ${origin}${origin.includes('localhost')?' (local preview only)':''}`);
 console.log(`Contact: email only; no submission endpoint. GA4: ${gaId?'configured, consent required':'disabled; set a real GA_MEASUREMENT_ID to enable'}.`);
 return pages;
}
