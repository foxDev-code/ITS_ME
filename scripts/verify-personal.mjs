import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve('outputs/satyarth-portfolio');
async function walk(dir){const files=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);files.push(...entry.isDirectory()?await walk(p):[p]);}return files;}
const files=await walk(root);
let modules=0,localReferences=0;
for(const file of files){
 if(file.endsWith('.mjs')){new vm.SourceTextModule(await fs.readFile(file,'utf8'),{identifier:file});modules++;}
 if(!file.endsWith('.html'))continue;
 const html=await fs.readFile(file,'utf8');
 for(const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[^" ]*)?"/g)){
  if(match[1].startsWith('//'))continue;
  let target=path.join(root,decodeURIComponent(match[1]));
  const stat=await fs.stat(target).catch(()=>null);
  assert(stat,`Missing local reference ${match[1]} in ${file}`);
  if(stat.isDirectory()&&!match[1].startsWith('/vendor/'))await fs.access(path.join(target,'index.html'));
  localReferences++;
 }
 for(const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/(?:src=|application\/|text\/)/.test(match[1])||!match[2].trim())continue;
  if(/type="module"/.test(match[1]))new vm.SourceTextModule(match[2]);else new vm.Script(match[2]);
 }
}
const profile=JSON.parse(await fs.readFile(path.join(root,'personal/profile.json')));
assert.equal(profile.github,'https://github.com/foxDev-code');
assert.equal(profile.githubCta,'For more projects, visit my GitHub ↗');
const projects=JSON.parse(await fs.readFile(path.join(root,'personal/projects.json')));
assert.equal(profile.twitter,'https://x.com/iamsatyarth_');
assert.equal(projects.filter(p=>p.featured).length,3,'Homepage must feature exactly three projects');
for(const project of projects.filter(p=>p.featured))assert(project.contribution&&project.outcome,`Featured project needs contribution and scope: ${project.id}`);
const enhancements=await fs.readFile(path.join(root,'personal/personal.js'),'utf8');
const workDestinations=vm.runInNewContext('('+enhancements.match(/const workDestinations=(\{[^;]+\});/)[1]+')');
for(const href of Object.values(workDestinations))await fs.access(path.join(root,href,'index.html'));
const workPreviews=vm.runInNewContext('('+enhancements.match(/const workPreviews=(\{[^;]+\});/)[1]+')');
for(const [file,alt] of Object.values(workPreviews)){await fs.access(path.join(root,'personal/assets',file));assert(alt,'Project previews need descriptions');}
new vm.SourceTextModule(enhancements);
assert(!enhancements.includes('cards(projects)'),'Do not duplicate the Work page gallery');
assert(!enhancements.includes('disciplines()'),'Do not repeat the skills grid across personal sections');
assert(enhancements.includes('profile.twitter'),'Contact links must include X');
await fs.access(path.join(root,'personal/assets/github-profile.png'));
assert.equal(profile.visualReferences.length,2);
for(const photo of profile.visualReferences)assert(photo.creator&&photo.source.startsWith('https://unsplash.com/photos/'),'Reference photos need visible source credits');
assert(enhancements.includes('These photographs are not my own.'),'Keep external photography separate from personal work');
const styles=await fs.readFile(path.join(root,'personal/personal.css'),'utf8');
assert(styles.includes('html[data-sm-page="/"] .sm-added{order:13}'),'Join Framer mobile section ordering');
assert(styles.includes('.sm-contact-links{order:99}'),'Contact links must follow the content on mobile');
assert(!/\[data-framer-name="Screenies"\][^{]*\{display:none/.test(styles),'Keep the native screenshot collage visible');
assert(styles.includes('[data-framer-name="Footer"]{order:14}'),'Footer must follow the restored collage and personal content');
const gallery=vm.runInNewContext(enhancements.match(/const gallery=(\[[\s\S]*?\n\]);/)[1],{profile});
const slots=vm.runInNewContext('('+enhancements.match(/const gallerySlots=(\{[^;]+\});/)[1]+')');
const floatingSlots=vm.runInNewContext('('+enhancements.match(/const floatingSlots=(\{[^;]+\});/)[1]+')');
assert.equal(Object.keys(floatingSlots).length,9,'Keep the floating gallery curated to nine frames');
assert.equal(new Set(Object.values(floatingSlots)).size,9,'No repeated artwork in the floating gallery');
for(const index of Object.values(floatingSlots))assert(gallery[index],'Every floating frame needs an existing composition');
assert.equal(gallery.length,9,'The cutting mat has nine picture slots');
assert.equal(new Set(gallery.map(item=>item.image)).size,9,'All nine compositions must differ');
assert.equal(gallery.filter(item=>item.kind==='Project').length,3,'Project images must not dominate the visual collage');
assert.equal(gallery.filter(item=>item.kind==='Reference photograph').length,2);
for(const index of Object.values(slots))assert(gallery[index],'Every native frame must map to a composition');
for(const item of gallery){
 assert(item.title&&item.description&&item.kind,'Every composition needs context');
 if(item.image.startsWith('https://'))assert(item.href.startsWith('https://unsplash.com/')&&item.description.includes('not my photography'),'External photographs need truthful credit');
 else await fs.access(path.join(root,'personal/assets',item.image));
 if(item.kind==='Project')await fs.access(path.join(root,item.href,'index.html'));
 else if(item.kind!=='Reference photograph')assert(item.description.includes('made for this portfolio'),'Do not present new studies as past client work');
}
assert(enhancements.includes('viewer.showModal()')&&enhancements.includes('method="dialog"'),'Use native modal focus and dismissal');
assert(enhancements.includes('viewerTrigger.focus({preventScroll:true})'),'Restore keyboard focus after closing artwork');
assert(styles.includes('.framer-9vsaio>div>div{position:relative!important;inset:auto!important;width:100%!important;height:100%!important'),'Mobile collage children must size to their grid cells');
assert(styles.includes('.sm-screen-photo[src*="study-"]{object-fit:contain!important}'),'Do not crop lettering in graphic studies');
assert(styles.includes('[data-framer-name="Middle spacer"]{min-width:0!important;width:clamp(210px,26vw,350px)!important}'),'Floating gallery center spacer must shrink with the viewport');
assert(styles.includes('div:has(>.sm-art-frame){max-width:min(300px,calc(100% - 24px))!important}'),'Floating frames must fit their columns with rotation clearance');
assert(styles.includes('aspect-ratio:var(--sm-art-ratio)'),'Use artwork proportions instead of letterboxed legacy screenshot sizes');
assert(styles.includes('[data-framer-name="Middle spacer"]{display:none!important}'),'Single-column gallery must not retain the desktop center spacer');
assert(enhancements.includes('workIndex(projects.filter(p=>p.featured))')&&!enhancements.includes('function cards('),'Keep home project entries compact');
for(const project of projects.filter(p=>p.featured)){
 const story=await fs.readFile(path.join(root,'projects',project.id,'index.html'),'utf8');
 assert(story.includes('My contribution')&&story.includes(project.contribution.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')),'Preserve detailed contributions in case studies');
}
assert(styles.includes('.framer-ezdzs4 .framer-text{font-size:35px!important}'),'Long rotating words must fit the mobile notebook');
assert(!styles.includes('[data-framer-name="Side hustles"]{display:none'),'Keep the Side Quests notebook visible');
assert(!styles.includes('[data-framer-name="Left Frame"],html[data-sm-page="/"] [data-framer-name="Right Frame"]{visibility:hidden'),'Keep illustrated side strips visible');
assert(enhancements.includes('fox-seal.png')&&enhancements.includes("'QA Matrix':'/projects/qa-matrix/'"),'Decorate and correctly link Side Quests');
await fs.access(path.join(root,'personal/assets/fox-seal.png'));
assert.equal(profile.intro,'I turn ideas into intelligent products—connecting machine learning, thoughtful interfaces and visual storytelling.','Opening introduction must stay unchanged');
// Regression: the stacked value cards require opaque paper, not icon-only SVGs.
const home=await fs.readFile(path.join(root,'index.html'),'utf8');
const publicPages=JSON.parse(await fs.readFile(path.join(root,'personal/pages.json'),'utf8'));
for(const page of publicPages)assert(!/jackie|jackielszhang/i.test(await fs.readFile(path.join(root,page.url,'index.html'),'utf8')),`Reference identity leaked into ${page.url}`);
for(const file of files.filter(file=>file.endsWith('.mjs')||/^searchIndex-.*\.json$/.test(path.basename(file)))){
 const text=await fs.readFile(file,'utf8');
 assert(!/jackie|jackielszhang/i.test(text),`Reference identity leaked into runtime data: ${file}`);
 if(/^searchIndex-/.test(path.basename(file))){const index=JSON.parse(text);assert.deepEqual(Object.keys(index).sort(),publicPages.map(page=>page.url).sort(),'Search index must contain only current public pages');for(const page of publicPages)assert.equal(index[page.url].description,page.description);}
}
assert(!/jackie|jackielszhang/i.test(await fs.readFile('README.md','utf8')),'Main project README must use the portfolio identity');
assert(home.includes('/personal/assets/satyarth-cutout.png')&&!home.includes('/personal/assets/monogram.svg'),'Polaroid must use the portrait cutout');
assert(!styles.includes('[data-framer-name="Fundam"]{display:none'),'Keep the independent draggable mask visible');
assert(!styles.includes('[data-framer-name="About me section"]{z-index:6'),'Preserve the native collage/card stacking');
const photoModule=await fs.readFile(files.find(file=>file.endsWith('n3aQpPOIiQ-Bry_zZoNC9Hg-cxP44K3mHfgGkcALR5o.BR2SGY8g.mjs')),'utf8');
assert(photoModule.includes('dragSnapToOrigin:!0')&&photoModule.includes('whileHover:Si')&&photoModule.includes('__framer__transformTrigger:`onInView`'),'Retain native mask return, hover tilt and in-view motion');
assert((await fs.readFile(path.join(root,'personal/assets/satyarth-portrait.png'))).equals(await fs.readFile('work/personalization/assets/satyarth-portrait.png')),'Preserve the supplied photograph');
for(const paper of ['rhT0iPheLHJdGQAZ04lGqNb0I.png','m0nSd9OmKrRp1nvRHVH89tLs0mg.png','0aKOwaR29QHg04I7MHlsi9j1g4.png'])assert(home.includes(paper),`Missing value-card paper: ${paper}`);
for(const file of files.filter(f=>f.endsWith('.mjs')||f.endsWith('.html')))assert(!/\/personal\/assets\/belief-[012]\.svg/.test(await fs.readFile(file,'utf8')),`Transparent value-card regression in ${file}`);
for(const project of projects){await fs.access(path.join(root,'projects',project.id,'index.html'));await fs.access(path.join(root,'personal/assets',project.image));}
assert((await fs.readFile(path.join(root,'personal/Satyarth_Mishra_Resume.pdf'))).subarray(0,5).toString()==='%PDF-');
console.log(`PASS: ${modules} JavaScript modules, inline scripts, ${localReferences} local references, ${projects.length} project pages, résumé and GitHub CTA.`);
