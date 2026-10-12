// Run only after deployment: node scripts/verify-live-https.mjs https://YOUR-DOMAIN
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {siteOrigin} from './seo.mjs';
const origin=siteOrigin(process.argv[2],true);
const pages=JSON.parse(await fs.readFile('outputs/satyarth-portfolio/personal/pages.json'));
const routes=[...pages.map(p=>({url:p.url,status:200})),{url:'/thank-you',status:200},{url:'/https-check-missing-page',status:404}];
for(const route of routes){
 const secure=new URL(route.url,origin);
 const response=await fetch(secure,{signal:AbortSignal.timeout(20000)});
 assert.equal(response.status,route.status,secure.href+' status');assert.equal(new URL(response.url).protocol,'https:','Final page must use HTTPS');
 const insecure=new URL(secure);insecure.protocol='http:';
 const redirect=await fetch(insecure,{redirect:'manual',signal:AbortSignal.timeout(20000)});
 assert([301,302,307,308].includes(redirect.status),insecure.href+' must redirect');
 const destination=new URL(redirect.headers.get('location'),insecure);
 assert.equal(destination.protocol,'https:','HTTP must redirect directly to HTTPS');assert.equal(destination.origin,origin,'Redirect must use the configured origin');assert.equal(destination.pathname,secure.pathname,'Redirect must preserve the page path');
 console.log(`${route.url}: HTTPS ${response.status}; HTTP ${redirect.status} → ${destination.href}`);
}
const probe=await fetch(origin.replace(/^https:/,'http:')+'/about?https-check=1',{redirect:'manual',signal:AbortSignal.timeout(20000)});
assert([301,302,307,308].includes(probe.status));assert.equal(new URL(probe.headers.get('location'),origin).href,origin+'/about?https-check=1','HTTP redirect preserves query');
console.log('PASS live HTTPS: certificate validation enabled, public pages reachable, HTTP redirects preserve paths/query, and made-up HTTPS route returns 404. Check browser console separately for runtime mixed-content warnings.');
