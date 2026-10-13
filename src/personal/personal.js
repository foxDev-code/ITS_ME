const [profile,projects,pages,imageAlts]=await Promise.all(['/personal/profile.json','/personal/projects.json','/personal/pages.json','/personal/image-alts.json'].map(url=>fetch(url).then(r=>{if(!r.ok)throw Error(`Unable to load ${url}`);return r.json()})));
function applyImageAlts(){
 for(const img of document.querySelectorAll('img[src]')){
  const key=new URL(img.getAttribute('src'),location.href).pathname.split('/').pop();
  if(Object.hasOwn(imageAlts,key)&&img.getAttribute('alt')!==imageAlts[key])img.alt=imageAlts[key];
 }
}
// These links lead to generated HTML, not the inherited Framer router's page IDs.
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href]');
 if(!link||link.hasAttribute('download')||link.dataset.smStudy!==undefined||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank')return;
 const url=new URL(link.href,location.href);
 if(url.origin!==location.origin||!pages.some(p=>p.url===url.pathname))return;
 if(url.pathname===location.pathname&&url.hash)return;
 event.preventDefault();event.stopImmediatePropagation();location.assign(url.href);
},true);
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const external=(href,label,extra='')=>`<a class="sm-link ${extra}" href="${e(href)}" ${href.startsWith('http')?'target="_blank" rel="noopener noreferrer"':''}>${e(label)}</a>`;
const github=()=>`<div class="sm-github">${external(profile.github,profile.githubCta,'sm-link--red')}<p>More experiments, source code and ideas in progress · @foxDev-code</p></div>`;
function workIndex(list){return `<div class="sm-work-index">${list.map((p,i)=>`<a href="/projects/${e(p.id)}/"><span class="sm-index-number">0${i+1}</span><h3>${e(p.name)}</h3><span class="sm-index-kind">${e(p.eyebrow)}</span><span class="sm-index-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;}
function interests(){return `<div class="sm-interests">${profile.interests.map((item,i)=>`<article><span class="sm-kicker">0${i+1} / Off-screen & alongside it</span><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('')}</div><div class="sm-moodboard">${profile.visualReferences.map(photo=>`<figure><a href="${e(photo.source)}" target="_blank" rel="noopener noreferrer"><img src="${e(photo.image)}" alt="${e(photo.alt)}" loading="lazy" width="900" height="650"><figcaption><span>${e(photo.title)}</span><small>Photo: ${e(photo.creator)} / Unsplash ↗</small></figcaption></a></figure>`).join('')}<div class="sm-margin-note"><p>Light, paper,<br>a little texture.</p><span>Visual references for this site.<br>These photographs are not my own.</span></div></div>`;}
const contact=()=>`<nav class="sm-links" aria-label="Contact Satyarth">${external('mailto:'+profile.email,'Email ↗')}${external(profile.linkedin,'LinkedIn ↗')}${external(profile.twitter,'X / @iamsatyarth_ ↗')}</nav>`;
// One curated visual vocabulary across the floating frames and cutting mat.
// Studies are new portfolio artwork, never presented as completed client work.
const gallery=[
 {image:'study-curiosity.svg',title:'Room for curiosity',kind:'Typography study',description:'An original type composition made for this portfolio. A reminder to leave a little space for the unexpected.'},
 {image:profile.visualReferences[1].image,title:'Light & geometry',kind:'Reference photograph',description:'Photo by '+profile.visualReferences[1].creator+' / Unsplash. A visual reference, not my photography.',href:profile.visualReferences[1].source},
 {image:'study-field.svg',title:'A field companion',kind:'Project',description:'Agri Sarthi / interface detail',href:'/projects/agri-sarthi/'},
 {image:'study-signal.svg',title:'Signal / noise',kind:'Graphic study',description:'An original graphic experiment made for this portfolio: many competing marks, one clear signal.'},
 {image:'study-helmet.svg',title:'Suraksha One',kind:'Project',description:'Smart helmet / concept render',href:'/projects/suraksha-one/'},
 {image:'study-observe.svg',title:'The art of noticing',kind:'Visual study',description:'An original viewfinder composition made for this portfolio, exploring framing, focus and the things we overlook.'},
 {image:'study-notes.svg',title:'A place for observations',kind:'Project',description:'Agri Sarthi / local field notebook',href:'/projects/agri-sarthi/'},
 {image:profile.visualReferences[0].image,title:'Botanical texture',kind:'Reference photograph',description:'Photo by '+profile.visualReferences[0].creator+' / Unsplash. A visual reference, not my photography.',href:profile.visualReferences[0].source},
 {image:'study-play.svg',title:'Serious about play',kind:'Letterform study',description:'An original letterform and colour study made for this portfolio. Engineering and visual play can share the same desk.'}
];
const gallerySlots={'agri-cover.svg':0,'agri-flow.svg':2,'suraksha-cover.svg':4,'suraksha-flow.svg':1,'metro-cover.svg':3,'metro-flow.svg':5,'nexus-cover.svg':6,'nexus-flow.svg':7,'qa-cover.svg':8,'resume-cover.svg':0,'veena-cover.svg':8,'helmet-card.svg':4};
// Three distinct compositions per chapter; the cutting mat remains the complete index.
const floatingSlots={'agri-cover.svg':0,'agri-flow.svg':2,'suraksha-flow.svg':1,'metro-cover.svg':3,'metro-flow.svg':5,'nexus-flow.svg':7,'helmet-card.svg':4,'qa-cover.svg':8,'veena-cover.svg':6};
const galleryRatios=['10 / 9','4 / 5','10 / 9','11 / 9','9 / 10','9 / 11','10 / 9','4 / 5','10 / 9'];
const workPreviews={'agri-screenshot.svg':['screen-agri-notes.png','Agri Sarthi — working field notebook'],'agri-evolves-card.svg':['screen-agri-scout.png','Agri Sarthi — scouting interface'],'helmet-card.svg':['helmet-exploded.png','Suraksha One — exploded concept render'],'suraksha-cover.svg':['screen-suraksha-home.png','Suraksha One — published web interface'],'suraksha-flow.svg':['helmet-front.png','Suraksha One — helmet concept render']};
const workDestinations={'Agri Sarthi':'/projects/agri-sarthi/','Suraksha One':'/projects/suraksha-one/','METROMAARG':'/projects/metromaarg/','AI Lab':'/projects/nexus-ai-ops/'};
const imageUrl=shot=>shot.image.startsWith('https://')?shot.image:'/personal/assets/'+shot.image;
let viewer,viewerTrigger;
document.addEventListener('click',event=>{
 const link=event.target.closest('a[data-sm-study]');
 if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const shot=gallery[Number(link.dataset.smStudy)];if(!shot)return;
 event.preventDefault();event.stopPropagation();
 viewerTrigger=link;
 if(!viewer){viewer=document.createElement('dialog');viewer.className='sm-viewer';viewer.setAttribute('aria-labelledby','sm-viewer-title');viewer.setAttribute('aria-describedby','sm-viewer-description');viewer.setAttribute('data-lenis-prevent','');document.body.append(viewer);viewer.addEventListener('click',ev=>{if(ev.target===viewer)viewer.close()});viewer.addEventListener('close',()=>{if(viewerTrigger?.isConnected)viewerTrigger.focus({preventScroll:true})});}
 viewer.innerHTML=`<div class="sm-viewer-body"><form method="dialog"><button aria-label="Close artwork" autofocus>Close ×</button></form><img src="${e(imageUrl(shot))}" alt="${e(shot.title)}"><div class="sm-viewer-caption"><p class="sm-kicker">${e(shot.kind)}</p><h2 id="sm-viewer-title">${e(shot.title)}</h2><p id="sm-viewer-description">${e(shot.description)}</p>${shot.href?external(shot.href,'View photographer & source ↗'):''}</div></div>`;
 applyImageAlts();viewer.showModal();
},true);
function makeSection(){const section=document.createElement('section');section.className='sm-added';section.id='satyarth-details';const page=location.pathname.replace(/\/$/,'')||'/';
 if(page==='/')section.innerHTML=`<p class="sm-gallery-note">A little work. A little play. A few things that caught my eye.<small>Original portfolio studies, project details & credited photo references. Click a frame to explore.</small></p><section aria-labelledby="selected-work"><div class="sm-index-heading"><div><p class="sm-kicker">Selected work / 01—03</p><h2 id="selected-work">Behind the making.</h2></div>${external('/work','Explore all work ↗')}</div>${workIndex(projects.filter(p=>p.featured))}${github()}</section><section class="sm-personal" aria-labelledby="personal-title"><p class="sm-kicker">Life outside the code</p><h2 id="personal-title">Curiosity doesn’t<br>clock out.</h2>${interests()}<div class="sm-links">${external('/about','A little more about me ↗')}${external('/personal/Satyarth_Mishra_Resume.pdf','Résumé ↓')}</div></section>`;
 else if(page==='/work')section.innerHTML=`<p class="sm-kicker">Continue exploring</p><h2>The source is open.</h2><p>The stories above explain the decisions. GitHub holds the code, setup notes and smaller experiments.</p>${github()}${contact()}`;
 else if(page==='/about')section.innerHTML=`<p class="sm-kicker">A little context</p><h2>Still learning.<br>Not just coding.</h2><p>I’m a Computer Science and Artificial Intelligence student at GLA University, based in Greater Noida. Alongside engineering, I’m interested in photography, visual storytelling and the small choices that make a layout easier to read.</p><p class="sm-small">${e(profile.education)}</p><section id="community" class="sm-note"><p class="sm-kicker">People & participation</p><h3>Synapse Club</h3><p>I contributed posters, certificates and promotional creatives for the Agentic AI Workshop, alongside workshop support. It’s a part of my work that happens with people, not only inside an editor.</p></section><section class="sm-practice"><p class="sm-kicker">What the three notes on my homepage mean</p><h3>A way of approaching things.</h3><dl><dt>${e(profile.principles[0])}</dt><dd>Move between engineering, photography and visual design. Different questions can lead to different ways of seeing.</dd><dt>${e(profile.principles[1])}</dt><dd>Leave space for type experiments, sketches and ideas without a finished brief. The graphic studies on this site are part of that exploration.</dd><dt>${e(profile.principles[2])}</dt><dd>Make the next step clear, respect people’s data and be honest about what a prototype can do. My project stories explain those choices and their limits.</dd></dl></section><div class="sm-links">${external('/personal/Satyarth_Mishra_Resume.pdf','Résumé ↓')}</div>${contact()}`;
 if(page==='/about')section.insertAdjacentHTML('beforeend',`<figure class="sm-profile-snapshot"><a href="${e(profile.github)}" target="_blank" rel="noopener noreferrer"><img src="/personal/assets/github-profile.png" alt="Screenshot of my public foxDev-code GitHub profile and illustrated avatar" loading="lazy" width="1155" height="330"><figcaption>Elsewhere online / My public GitHub profile ↗<small>Profile screenshot captured September 2026. The avatar is an illustration, not a portrait.</small></figcaption></a></figure>`);
 return section;
}
let pending=false,lastPage='';
function enhance(){pending=false;const page=location.pathname.replace(/\/$/,'')||'/';if(!['/','/work','/about'].includes(page))return;
 const main=document.getElementById('main');const root=main?.querySelector(':scope > div[class*="framer-"]');if(!root)return;
 if(document.documentElement.dataset.smPage!==page)document.documentElement.dataset.smPage=page;
 for(const link of root.querySelectorAll('a[data-framer-name="Face"]')){if(!link.hasAttribute('aria-label'))link.setAttribute('aria-label','foxDev homepage');if(link.getAttribute('href')!=='/')link.setAttribute('href','/');}
 for(const item of root.querySelectorAll('ul:has(>.ticker-item)'))if(item.hasAttribute('role'))item.removeAttribute('role');
 // Reuse Framer's existing contact-panel click behavior; add the missing keyboard equivalent.
 for(const item of root.querySelectorAll('[data-framer-name="Connect"]'))if(!item.querySelector('[data-framer-name="Connect"]')&&!item.closest('[data-sm-connect]')&&!item.closest('a,button')){
  item.dataset.smConnect='true';item.setAttribute('role','button');item.setAttribute('tabindex','0');item.setAttribute('aria-label','Open contact options');
  item.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();item.click();}});
 }
 for(const link of root.querySelectorAll('a[href^="mailto:"]'))if(!link.hasAttribute('aria-label'))link.setAttribute('aria-label','Email Satyarth about AI, products or creative collaboration');
 if(lastPage!==page){document.getElementById('satyarth-details')?.remove();document.getElementById('satyarth-contact-links')?.remove();lastPage=page;}
 if(!document.getElementById('satyarth-details')){const section=makeSection();const anchor=page==='/'?root.querySelector(':scope > [data-framer-name="Footer"]'):page==='/work'?root.querySelector(':scope > [data-framer-name="Foot"]'):null;root.insertBefore(section,anchor);}
 let collageIndex=0;
 if(page==='/')for(const img of root.querySelectorAll('[data-framer-name="Value block"] img, [data-framer-name="Screenies"] img')){
  const key=img.dataset.smGallery||img.getAttribute('src')?.split('/').pop().split('?')[0];
  const floating=img.closest('[data-framer-name="Value block"]');
  let index=floating?floatingSlots[key]:gallerySlots[key];
  const frame=img.closest('a')?.parentElement;
  if(floating&&frame){frame.classList.toggle('sm-omitted-frame',index===undefined);if(index!==undefined){frame.classList.add('sm-floating-card');frame.style.setProperty('--sm-art-ratio',galleryRatios[index]);}}
  if(index===undefined)continue;
  if(!img.dataset.smGallery)img.dataset.smGallery=key;
  if(img.closest('[data-framer-name="Screenies"]'))index=collageIndex++%gallery.length;
  const shot=gallery[index];
  if(img.getAttribute('src')===imageUrl(shot))continue;
  img.removeAttribute('srcset');img.removeAttribute('sizes');img.src=imageUrl(shot);img.alt=shot.title+' — '+shot.kind;img.classList.add('sm-screen-photo');
  const link=img.closest('a');if(link){link.href=shot.kind==='Project'?shot.href:imageUrl(shot);link.removeAttribute('target');link.classList.add('sm-art-frame');link.dataset.caption=shot.title;link.setAttribute('aria-label',shot.title+' — '+shot.kind);if(shot.kind!=='Project'){link.dataset.smStudy=index;link.setAttribute('aria-haspopup','dialog');}else{delete link.dataset.smStudy;link.removeAttribute('aria-haspopup');}}
 }
 if(page==='/'&&!document.getElementById('satyarth-contact-links')){const box=document.createElement('div');box.className='sm-contact-links';box.id='satyarth-contact-links';box.innerHTML=contact();root.append(box);}
 if(page==='/work'){
  for(const link of root.querySelectorAll('a')){const href=workDestinations[link.textContent.trim()];if(href){link.href=href;link.removeAttribute('target');link.classList.add('sm-work-title');}}
  for(const img of root.querySelectorAll('[data-framer-name="Top section"] img')){const key=img.dataset.smWorkPreview||img.getAttribute('src')?.split('/').pop().split('?')[0];const preview=workPreviews[key];if(!preview)continue;img.dataset.smWorkPreview=key;img.classList.add('sm-work-preview');const src='/personal/assets/'+preview[0];if(img.getAttribute('src')!==src){img.removeAttribute('srcset');img.removeAttribute('sizes');img.src=src;img.alt=preview[1];}}
  const side=root.querySelector('[data-framer-name="Side hustles"]');
  if(side&&!side.querySelector('.sm-side-fox'))side.insertAdjacentHTML('beforeend','<figure class="sm-side-fox"><img src="/personal/assets/fox-seal.png" alt="Original vermilion fox seal with a raised paw and spark" width="880" height="1760"><figcaption>Stay curious.</figcaption></figure>');
  const sideLinks={'VEENA Rover':'/projects/veena-rover/','Linear Algebra':'https://github.com/foxDev-code/Linear-Algebra','Synapse Club':'/about#community','QA Matrix':'/projects/qa-matrix/','MCQ Lab':'https://github.com/foxDev-code/Online-MCQ-Test-Platform'};
  for(const [label,href] of Object.entries(sideLinks)){const link=[...(side?.querySelectorAll('a')||[])].find(a=>a.textContent.includes(label));if(link){link.href=href;if(href.startsWith('http')){link.target='_blank';link.rel='noopener noreferrer';}else link.removeAttribute('target');}}
 }
 const metadata=pages.find(p=>p.url===page);if(metadata){
  if(document.title!==metadata.title)document.title=metadata.title;
  const shareImage=new URL('/personal/assets/'+metadata.shareImage,metadata.canonical).href;
  const tags={'description':metadata.description,'og:title':metadata.title,'og:description':metadata.description,'og:type':'website','og:url':metadata.canonical,'og:image':shareImage,'og:image:type':'image/png','og:image:width':'1200','og:image:height':'630','og:image:alt':metadata.shareAlt,'twitter:card':'summary_large_image','twitter:title':metadata.title,'twitter:description':metadata.description,'twitter:image':shareImage,'twitter:image:alt':metadata.shareAlt};
  for(const [key,value] of Object.entries(tags)){
   const attribute=key.startsWith('og:')?'property':'name';
   const matches=[...document.querySelectorAll(`meta[${attribute}="${key}"]`)];
   let tag=matches.shift();for(const duplicate of matches)duplicate.remove();
   if(!tag){tag=document.createElement('meta');tag.setAttribute(attribute,key);document.head.append(tag);}
   if(tag.content!==value)tag.content=value;
  }
 }
 applyImageAlts();
 for(const signature of document.querySelectorAll('[data-framer-name="signature"]')){if(signature.getAttribute('aria-label')!==profile.name){signature.setAttribute('aria-label',profile.name);signature.setAttribute('role','img');}}
 for(const role of document.querySelectorAll('.framer-f3lfa9')){if(role.getAttribute('aria-label')!==profile.role)role.setAttribute('aria-label',profile.role);if(role.getAttribute('role')!=='img')role.setAttribute('role','img');}
 // The reference's About label was decorative. Preserve its hover component and make it navigable.
 for(const item of document.querySelectorAll('[data-framer-name="About"]')){if(item.closest('[data-sm-link]')||item.closest('a')||item.tagName==='A')continue;const value=item.textContent.trim().toLowerCase();if(value==='about'||value==='satyarth'||value===profile.siteName.toLowerCase()){item.dataset.smLink='true';item.setAttribute('role','link');item.setAttribute('tabindex','0');item.setAttribute('aria-label','About Satyarth Mishra');item.style.cursor='pointer';item.addEventListener('click',()=>location.assign('/about'));item.addEventListener('keydown',ev=>{if(ev.key==='Enter')location.assign('/about')});}}
 // Decorative repeated rails are not separate content for assistive technology.
 for(const rail of root.querySelectorAll(':scope > [data-framer-name="Left Frame"], :scope > [data-framer-name="Right Frame"]')){if(!rail.hasAttribute('aria-hidden')){rail.setAttribute('aria-hidden','true');rail.inert=true;}}
 for(const a of document.querySelectorAll('a[target="_blank"]'))if(!a.rel.includes('noopener'))a.rel='noopener noreferrer';
}
function startPersonalization(){
 const observer=new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(enhance)}});
 observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','alt']});observer.observe(document.head,{childList:true,subtree:true});enhance();
}
if(document.documentElement.dataset.smHydrated==='true')startPersonalization();
else document.addEventListener('sm:hydrated',startPersonalization,{once:true});
