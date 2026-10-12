import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {measurementId} from './privacy.mjs';
assert.equal(measurementId(),null);assert.equal(measurementId('G-XXXXXXXXXX'),null);
assert.throws(()=>measurementId('bad-id'));assert.equal(measurementId('G-ABC1234567'),'G-ABC1234567');
const profile=JSON.parse(await fs.readFile('content/profile.json','utf8'));
assert.equal(measurementId(profile.gaMeasurementId),'G-S475283TKN');
const source=await fs.readFile('src/personal/consent.js','utf8');
function scenario({id='G-ABC1234567',stored=null,storageWorks=true}={}){
 const handlers={},events={},scripts=[],writes=[],deletedCookies=[];let saved=stored,reloads=0;
 const element=()=>({hidden:false,textContent:'',isConnected:true,focused:false,addEventListener(name,fn){this[name]=fn},focus(){this.focused=true}});
 const accept=element(),reject=element(),close=element(),title=element(),description=element(),button=element();
 const banner={hidden:true,querySelector(selector){return selector.includes('accepted')?accept:selector.includes('denied')?reject:close}};
 const document={title:'Portfolio | Satyarth Mishra',referrer:'https://referrer.test/private?q=email@example.test',head:{append(script){scripts.push(script)}},createElement:element,getElementById(name){return {'sm-privacy-config':{textContent:JSON.stringify({measurementId:id})},'sm-cookie-banner':banner,'sm-cookie-title':title,'sm-cookie-description':description}[name]},querySelector(){return {content:'https://portfolio.test/about?email=secret@example.test#private'}},addEventListener(name,fn){handlers[name]=fn},get cookie(){return '_ga=old; _ga_ABC1234567=old; unrelated=keep'},set cookie(value){deletedCookies.push(value)}};
 const window={addEventListener(name,fn){events[name]=fn}};
 const location={href:'https://portfolio.test/about?email=secret@example.test#private',hostname:'portfolio.test',reload(){reloads++}};
 const localStorage={getItem(){if(!storageWorks)throw Error('Storage unavailable');return saved},setItem(key,value){if(!storageWorks)throw Error('Storage unavailable');saved=value;writes.push({key,value})}};
 vm.runInNewContext(source,{document,window,location,localStorage,Date,URL,JSON,Number});
 return {accept,reject,close,banner,title,description,button,scripts,writes,deletedCookies,window,get reloads(){return reloads},open(){handlers.click({target:{closest:()=>button}})},change(value,key='sm-analytics-consent-v1'){saved=value;events.storage({key})}};
}
const fresh=scenario();assert(!fresh.banner.hidden);assert.equal(fresh.scripts.length,0,'No Google script before consent');assert.equal(fresh.window.dataLayer,undefined,'No Google queue before consent');
const actual=scenario({id:profile.gaMeasurementId});assert.equal(actual.scripts.length,0);actual.reject.click();assert.equal(actual.scripts.length,0);actual.open();actual.accept.click();assert.equal(actual.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-S475283TKN');
const generatedConfig=(await fs.readFile('outputs/satyarth-portfolio/index.html','utf8')).match(/id="sm-privacy-config"[^>]*>([^<]+)</)[1];
assert.equal(JSON.parse(generatedConfig).measurementId,measurementId(process.env.GA_MEASUREMENT_ID??profile.gaMeasurementId),'Build must wire the real ID while honoring an explicit environment override');
fresh.reject.click();assert(fresh.banner.hidden);assert.equal(fresh.scripts.length,0);assert.equal(fresh.writes.length,1);
fresh.open();assert(fresh.reject.focused);fresh.accept.click();assert.equal(fresh.scripts.length,1);assert.equal(fresh.scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-ABC1234567');
const commands=fresh.window.dataLayer.map(x=>Array.from(x));const config=commands.find(x=>x[0]==='config');assert.equal(config[2].allow_google_signals,false);assert.equal(config[2].allow_ad_personalization_signals,false);assert.equal(config[2].cookie_expires,15552000);assert.equal(config[2].cookie_update,false);
assert.equal(config[2].page_location,'https://portfolio.test/about');assert.equal(config[2].page_referrer,'https://referrer.test');assert.equal(commands.filter(x=>x[0]==='event'&&x[1]==='page_view').length,1);
fresh.accept.click();assert.equal(fresh.scripts.length,1,'No duplicate tag');fresh.open();fresh.reject.click();assert.equal(fresh.window['ga-disable-G-ABC1234567'],true);assert.equal(fresh.reloads,1,'Reload unloads Google after withdrawal');assert(fresh.deletedCookies.some(x=>x.startsWith('_ga=')));assert(!fresh.deletedCookies.some(x=>x.startsWith('unrelated=')));
for(const id of [null,'G-XXXXXXXXXX','broken']){const disabled=scenario({id});assert.equal(disabled.scripts.length,0);assert(disabled.banner.hidden);disabled.open();assert(disabled.accept.hidden&&disabled.reject.hidden);assert(disabled.close.focused);disabled.close.click();assert(disabled.banner.hidden);}
const preference=choice=>JSON.stringify({choice,expires:Date.now()+86400000});
const accepted=scenario({stored:preference('accepted')});assert.equal(accepted.scripts.length,1);assert(accepted.banner.hidden);
const denied=scenario({stored:preference('denied')});assert.equal(denied.scripts.length,0);assert(denied.banner.hidden);
for(const stored of ['broken',JSON.stringify({choice:'accepted',expires:Date.now()-1}),JSON.stringify({choice:'accepted',expires:Date.now()+181*86400000})]){const expired=scenario({stored});assert.equal(expired.scripts.length,0);assert(!expired.banner.hidden);}
const blocked=scenario({storageWorks:false});blocked.accept.click();assert.equal(blocked.scripts.length,1,'Explicit consent works with blocked localStorage');
accepted.change(null,null);assert.equal(accepted.reloads,1,'Clearing storage in another tab revokes loaded analytics');
const otherTab=scenario();otherTab.change(preference('accepted'));assert.equal(otherTab.scripts.length,1);otherTab.change(preference('denied'));assert.equal(otherTab.reloads,1);
console.log('PASS consent: no Google tag before acceptance or after rejection; placeholder disabled; one tag after acceptance; withdrawal, expiry, blocked storage, cross-tab changes and query/referrer sanitization. No requests were sent to Google.');
