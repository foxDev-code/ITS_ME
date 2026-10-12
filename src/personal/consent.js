(()=>{
 const config=JSON.parse(document.getElementById('sm-privacy-config').textContent);
 const id=/^G-[A-Z0-9]{10}$/.test(config.measurementId||'')&&config.measurementId!=='G-XXXXXXXXXX'?config.measurementId:null;
 const key='sm-analytics-consent-v1',lifetime=180*24*60*60*1000;
 const banner=document.getElementById('sm-cookie-banner');
 const accept=banner.querySelector('[data-consent-choice="accepted"]');
 const reject=banner.querySelector('[data-consent-choice="denied"]');
 const close=banner.querySelector('[data-consent-close]');
 let loaded=false,trigger;
 function preference(){try{const value=JSON.parse(localStorage.getItem(key));return value&&['accepted','denied'].includes(value.choice)&&Number.isFinite(value.expires)&&value.expires>Date.now()&&value.expires<=Date.now()+lifetime?value.choice:null}catch{return null}}
 function loadAnalytics(){
  if(!id||loaded)return;
  loaded=true;window['ga-disable-'+id]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted'});
  window.gtag('js',new Date());
  const locationTag=document.querySelector('meta[property="og:url"]');
  const canonical=new URL(locationTag?.content||location.href);canonical.search='';canonical.hash='';
  let referrer='';try{referrer=document.referrer?new URL(document.referrer).origin:''}catch{}
  window.gtag('config',id,{send_page_view:false,page_location:canonical.href,page_referrer:referrer,allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:lifetime/1000,cookie_update:false,cookie_path:'/'});
  window.gtag('event','page_view',{page_location:canonical.href,page_referrer:referrer,page_title:document.title});
  const script=document.createElement('script');script.id='sm-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(script);
 }
 function clearAnalyticsCookies(){
  const domains=['',...location.hostname.split('.').map((_,i,a)=>a.slice(i).join('.')).filter(d=>d.includes('.'))];
  for(const part of document.cookie.split(';')){const name=part.trim().split('=')[0];if(!/^_ga(?:_|$)/.test(name))continue;for(const domain of domains)document.cookie=name+'=; Max-Age=0; Path=/;'+(domain?' Domain='+domain+';':'');}
 }
 function hide(){banner.hidden=true;if(trigger?.isConnected)trigger.focus({preventScroll:true});}
 function choose(choice){
  try{localStorage.setItem(key,JSON.stringify({choice,expires:Date.now()+lifetime}))}catch{}
  hide();
  if(choice==='accepted')loadAnalytics();
  else{if(id)window['ga-disable-'+id]=true;clearAnalyticsCookies();if(loaded)location.reload();}
 }
 accept.addEventListener('click',()=>choose('accepted'));
 reject.addEventListener('click',()=>choose('denied'));
 close.addEventListener('click',hide);
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-cookie-settings]');if(!button)return;
  trigger=button;banner.hidden=false;(id?reject:close).focus();
 });
 window.addEventListener('storage',event=>{
  if(event.key!==key&&event.key!==null)return;
  const choice=preference();
  if(choice==='accepted'){hide();loadAnalytics();}
  else{if(id)window['ga-disable-'+id]=true;clearAnalyticsCookies();if(loaded)location.reload();else banner.hidden=choice==='denied'||!id;}
 });
 if(!id){document.getElementById('sm-cookie-title').textContent='Analytics is currently off';document.getElementById('sm-cookie-description').textContent='No active Google Analytics ID is configured. Analytics cookies are not used by this site.';accept.hidden=true;reject.hidden=true;close.hidden=false;}
 else{const choice=preference();if(choice==='accepted')loadAnalytics();else banner.hidden=choice==='denied';}
})();
