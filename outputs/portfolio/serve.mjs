import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(fileURLToPath(new URL('./',import.meta.url)));
const port=Number(process.env.PORT||process.argv[2]||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.mp4':'video/mp4','.webm':'video/webm','.mp3':'audio/mpeg'};
http.createServer(async(req,res)=>{
 try{
  const requestURL=new URL(req.url,'http://localhost');
  let pathname=decodeURIComponent(requestURL.pathname);
  let file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  let stat;try{stat=await fsp.stat(file);if(stat.isDirectory()){file=path.join(file,'index.html');stat=await fsp.stat(file)}}catch{res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}
  const contentType=mime[path.extname(file)]||'application/octet-stream';
  const scale=requestURL.searchParams.get('scale-down-to');
  if(/^\d+$/.test(scale||'')){try{const scaled=file+'.scale-'+scale;const scaledStat=await fsp.stat(scaled);file=scaled;stat=scaledStat}catch{}}
  const headers={'Content-Type':contentType,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'};
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),stat.size-1):stat.size-1;if(start>=stat.size||end<start){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end()};res.writeHead(206,{...headers,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res)}
  else{res.writeHead(200,{...headers,'Content-Length':stat.size,'Accept-Ranges':'bytes'});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res)}
 }catch(err){console.error(err.message);res.writeHead(500);res.end('Unable to load page');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://localhost:${port}`));
