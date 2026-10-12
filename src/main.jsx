import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, MousePointer2, Music2, Sparkles} from 'lucide-react';
import './styles.css';

const A='/assets/';
const rail=['4f24529e8ee6bae1.png','02784691810fd0cc.png','495d46d87ab09a43.png','e153334a216bdd54.png','7fd95a4beb3742aa.png','a3ac46eddb5e059d.png','d9e466355b06d864.png','a0ea72e3ec5a3a62.png'];
const jobs=[
 {brand:'BASH',url:'https://bash.com/',sub:'South Africa’s largest omni-channel fashion and lifestyle shopping platform',lesson:"Learnt to think beyond what's expected",work:['BashPay','Internal Packing Tool','Kiosk','Point of Sale'],impact:'Payment portal that increased payment success rate to 80%',art:'df05f17fc4ff402a.png',tone:'lime'},
 {brand:'PULSE',url:'https://www.linkedin.com/company/pulseliveco/',sub:'Watch the race from the athletes’ point of view',lesson:"Learnt that design is a team sport that involves people outside of design",work:['Stream uploader','Home feed','Race platform','Event timeline'],impact:'Enabled athletes to easily upload their GoPro footage onto the app',art:'e7a54003d634324b.png',tone:'blue'},
 {brand:'HEYGO',url:'https://www.linkedin.com/company/virtualtrips/',sub:'Your ticket to see the world',lesson:'Learnt design is a powerful alignment tool',work:['Streaming UI','Stream creator'],impact:'A better streaming experience increased tipping by 8% per stream',art:'4047c226d11dd430.png',tone:'orange'},
 {brand:'DOTSLASH',url:'https://dotslash.co.za/',sub:'Helping businesses thrive in the digital landscape.',lesson:'Learnt how to make a good design, great.',work:['Dekra','Balwin Fibre','Junk Mail','+4 other large projects…'],impact:'Digital products built for ambitious businesses',art:'c4321b12261459c8.png',tone:'pink'}
];
const quests=[
 ['Drift','Creator','Design & Code','Personal library of images you found online or created','c614a685566655ac.png','#ffd863'],
 ['TF2048','Creator','Bot design · Site design · Concept art · 3D','Puzzle-based NFT','b4fc1b6272ed7e71.png','#e96c52'],
 ["Who’s Speaking",'Creator','Designer & Framer Developer','Follow speakers and see where they are speaking','6c60b96c923b45e0.png','#79cdd5'],
 ['Triple Time','Founding Product Designer','Product & Motion Designer','AI-powered medical note taker for doctors','f0289da821463aba.png','#b9dd77'],
 ['ResQued','Founding Product Designer','Product Designer','Helping ordinary people deliver extraordinary acts of kindness','05ca77f61088d736.png','#f4a5b8']
];

function Rail({side}){return <div className={'rail '+side}><div className="rail-track">{[...rail,...rail].map((x,i)=><img key={i} src={A+x}/>)}</div></div>}
function Nav(){return <nav><a href="#home" aria-label="Home"><span className="face">⌣</span></a><a href="#about">about</a><a className="active" href="#work">work</a><a href="#connect">connect</a></nav>}
function Intro({dismiss,onDismiss}){if(dismiss)return null;return <div className="intro-wrap"><div className="intro-card"><button onClick={onDismiss}>×</button><p>Hi! Thanks for visiting my site!</p><p>It is still quite a work in progress,<br/>especially for mobile!</p><p>I don’t want to simply resize it for mobile view, but rather adapt it, so that will require a bit more thought.</p><p>In the meantime, please visit on desktop :)</p><p>Otherwise, if you’re feeling like life needs a bit more chaos, then feel free to scroll!</p><div className="doodle">✿　◇　▱　○　◇　⌁</div><div className="creature">ʕ•ᴥ•ʔ</div></div></div>}
function Job({j,i}){return <section className={'job '+j.tone}>
 <div className="job-num">0{i+1}</div><div className="job-head"><a href={j.url} target="_blank">{j.brand}<ArrowUpRight/></a><p>{j.sub}</p></div>
 <div className="job-art"><img src={A+j.art}/><span className="stamp">PRODUCT<br/>DESIGN</span></div>
 <h3>{j.lesson}</h3><div className="job-info"><div><b>Notable work</b>{j.work.map(x=><span key={x}>{x}</span>)}</div><p>{j.impact}</p></div>
 </section>}
function App(){const [dismiss,setDismiss]=useState(false);const [sound,setSound]=useState(false);const cursor=useRef(null);
 useEffect(()=>{const f=e=>{if(cursor.current)cursor.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`};addEventListener('pointermove',f);return()=>removeEventListener('pointermove',f)},[]);
 return <><div className="cursor" ref={cursor}/><Rail side="left"/><Rail side="right"/><main id="home">
 <header id="about"><a className="seal" href="#home">張</a><div><p>Product designer, visual storyteller & maker of delightful digital things.</p><h1>JACKIE<br/>ZHANG</h1></div><div className="status"><i/> Based in Cape Town<br/><small>Currently making useful things</small></div></header>
 <section className="marquee"><div>{['Zhang','Grew up in a restaurant','Digital world','Fynbos','Night owl','More fynbos','Even more fynbos','The Black Axe!'].map((x,i)=><span key={i}>{x} ✦ </span>)}</div></section>
 <div id="work" className="work-title"><Sparkles/><p>Places I’ve been,</p><h2>things I’ve learnt</h2><span>SCROLL TO EXPLORE ↓</span></div>
 {jobs.map((j,i)=><Job j={j} i={i} key={j.brand}/>)}
 <section className="quests"><p>WHEN I’M NOT AT WORK</p><h2>Side Quests</h2><div className="quest-grid">{quests.map((q,i)=><a href="#connect" className="quest" key={q[0]} style={{'--q':q[5]}}><span className="qnum">0{i+1}</span><img src={A+q[4]}/><h3>{q[0]} <ArrowUpRight/></h3><b>{q[1]}</b><small>{q[2]}</small><p>{q[3]}</p></a>)}</div></section>
 <footer id="connect"><span>LET’S MAKE SOMETHING</span><h2>Say hello.</h2><a href="mailto:hello@jackiezhang.co.za">hello@jackiezhang.co.za <ArrowUpRight/></a><p>Designed with curiosity, caffeine and a tiny bit of chaos.</p></footer>
 </main><button className={'sound '+(sound?'on':'')} onClick={()=>setSound(!sound)}><Music2/> {sound?'on':'off'}</button><Nav/><Intro dismiss={dismiss} onDismiss={()=>setDismiss(true)}/></>}

createRoot(document.getElementById('root')).render(<App/>);
