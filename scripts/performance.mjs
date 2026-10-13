// Shared by server HTML and compiled client props; static hosts do not resize query URLs.
export const heroImage='zreYWHKtYVvdYwuZm8gBYAa3IiA.png';
export const heroSizes='(max-width: 809.98px) 354px, (max-width: 949.98px) 266px, (max-width: 1389.98px) 444px, 527px';
export function nativeImageURLs(value,variants){
 return value.replace(/\/vendor\/framerusercontent\.com\/images\/([\w-]+\.(?:png|jpe?g))(?:\?[^\s"'`<>)]*)?/g,(url,name)=>{
  const family=variants[name];if(!family)return url;
  const scale=new URL(url.replaceAll('&amp;','&'),'https://portfolio.invalid').searchParams.get('scale-down-to');
  return '/personal/assets/'+(Object.hasOwn(family,scale)?family[scale]:family.default).file;
 });
}
export function homeSemantics(value,markup=false){
 let count=0;
 const result=markup?value.replace(/<h3\b([^>]*)>Greater Noida · IST \+5:30<\/h3>/g,(_,attributes)=>{count++;return `<p${attributes}>Greater Noida · IST +5:30</p>`;}):value.replace(/(?:`h3`|"h3")(?=,\{style:\{[^{}]*\},children:(?:"|`)Greater Noida · IST \+5:30(?:"|`))/g,()=>{count++;return '"p"';});
 if(!count)throw Error('Home location markup changed; review heading semantics.');
 return result;
}
