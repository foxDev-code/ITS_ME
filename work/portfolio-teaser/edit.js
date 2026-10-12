import path from 'node:path';
import {fileURLToPath} from 'node:url';
export default async ({project,frame,text,rect,media,path:drawPath})=>{
 const dir=path.dirname(fileURLToPath(import.meta.url));
 const p=await project({dir,size:'1080x1920',fps:24,background:'#222320'});
 const C='#f2e6d2',R='#e35342',D='#222320';
 const portrait=await p.add(path.join(dir,'assets/portrait.png'));
 const art={};for(const n of ['curiosity','play','signal'])art[n]=await p.add(path.join(dir,'assets/'+n+'.png'));
 const soundtrack=await p.add(path.join(dir,'assets/soundtrack.wav'));p.cut(soundtrack,{at:0,dur:20});
 const title=(s,x,y,size,color=C,width=900,extra={})=>text(s,{x,y,width,height:size*1.4,fontFamily:'Playfair Display',fontSize:size,color,...extra});
 const mono=(s,x,y,color=C,size=22)=>text(s,{x,y,width:900,height:55,fontFamily:'Space Mono',fontSize:size,color,letterSpacing:3});
 const motion={enter:{from:{y:70,opacity:0},duration:.7,easing:'house'},exit:{to:{y:-30,opacity:0},duration:.35}};
 const line=(x,y,w,color=R)=>rect({x,y,width:w,height:3,fill:color,animate:[{property:'scaleX',from:0,to:1,duration:.8,easing:'house'}]});
 const paper=(x,y,w,h,children,rotation=0)=>frame({x,y,width:w,height:h,layout:'none',background:C,radius:12,shadow:{y:22,blur:45,color:'#00000066'},animate:[{property:'rotation',from:rotation-5,to:rotation,duration:1,easing:'house'},{property:'offsetY',from:100,to:0,duration:1,easing:'house'},{property:'opacity',from:0,to:1,duration:.45}]},children);
 p.compose([
  mono('SATYARTH MISHRA / PORTFOLIO',90,155,C,19),
  frame({x:90,y:480,width:900,height:820,layout:'none',motion},[
   title('Follow',0,0,151),title('curiosity.',0,182,143,R),
   line(5,405,820),title('Make room',0,472,113),title('for possibility.',0,625,107,C,900,{italic:true})
  ]),
  mono('AI  /  DESIGN  /  CODE',90,1540,C,26),
  mono('GREATER NOIDA, INDIA',90,1620,'#b9b3a7',18),
  rect({x:90,y:1770,width:900,height:2,fill:'#66665c'}),
  rect({x:90,y:1770,width:900,height:4,fill:R,animate:[{property:'scaleX',from:0,to:1,duration:4,easing:'linear'}]})
 ],{at:0,dur:4,name:'01 Curiosity'});
 p.compose([
  rect({width:1080,height:1920,fill:C}),
  mono('01 / THE PERSON BEHIND THE PIXELS',90,150,D,17),
  title('A human touch.',90,240,112,D),
  paper(188,470,704,960,[
   media({file:portrait,x:24,y:24,width:656,height:764,fit:'cover',radius:3}),
   text('Satyarth',{x:45,y:805,width:620,height:135,fontFamily:'Caveat',fontWeight:700,fontSize:116,color:R,align:'center'}),
  ],-4),
  line(90,1560,900,D),
  title('Engineering. Visual thinking. Play.',90,1610,39,D),
  mono('INDEPENDENT EXPLORATIONS',90,1730,D,18)
 ],{at:4,dur:4.5,name:'02 Portrait'});
 p.compose([
  mono('02 / EXPLORATIONS',90,150,C,20),
  title('Less noise.',90,250,123),title('More character.',90,400,105,R),
  paper(80,650,610,565,[media({file:art.curiosity,x:18,y:18,width:574,height:516,fit:'contain'})],-6),
  paper(440,1090,550,515,[media({file:art.signal,x:18,y:18,width:514,height:420,fit:'contain'}),mono('SIGNAL / NOISE',22,455,D,12)],5),
  mono('TYPE STUDIES + CREATIVE EXPERIMENTS',90,1740,C,17)
 ],{at:8.5,dur:5,name:'03 Graphic studies'});
 p.compose([
  rect({width:1080,height:1920,fill:R}),
  mono('03 / AT THE INTERSECTION',90,150,D,20),
  frame({x:90,y:460,width:900,height:850,layout:'none',motion},[
   title('AI.',0,0,240,D),
   title('Design.',0,285,195,C),
   title('Code.',0,540,220,D),
  ]),
  line(90,1480,900,D),
  title('Built with care.',90,1550,95,D,900,{italic:true}),
  mono('IDEAS THAT FEEL LIKE SOMETHING.',90,1750,D,17)
 ],{at:13.5,dur:3.5,name:'04 Disciplines'});
 p.compose([
  mono('SATYARTH MISHRA',90,155,C,26),
  frame({x:90,y:550,width:900,height:650,layout:'none',motion},[
   title('Come for',0,0,125),title('the curiosity.',0,150,125,R),
   title('Stay for the work.',0,395,91,C,900,{italic:true})
  ]),
  line(90,1410,900),
  text('Explore my work',{x:90,y:1470,width:880,height:100,fontFamily:'Inter',fontSize:54,color:C}),
  mono('GITHUB.COM/FOXDEV-CODE',90,1600,C,23),
  mono('AI / DESIGN / CODE',90,1750,'#b9b3a7',18)
 ],{at:17,dur:3,name:'05 Invitation'});
 // This is a graphic teaser, not a browser recording or a claim that the site is live.
 for(const t of [1.5,5.8,10.5,15,18.5])await p.frame(t,'renders/check-'+t+'.png');
 if(p.duration()!==20)throw Error('Expected a 20-second teaser');
 if(process.env.RENDER_VIDEO==='1')await p.render('renders/portfolio-teaser.mp4',{bitrate:8000000,concurrency:2,shards:4});
};
