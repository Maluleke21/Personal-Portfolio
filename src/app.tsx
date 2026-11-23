const {useState,useEffect,useRef}=React;
const projects=[
 ['FitForge','React · TypeScript','A mobile-first fitness app for planning workouts, logging nutrition and tracking progress.','assets/fitforge.svg','https://fitforge-ide-handoff.web.app'],
 ['Healthcare_DB','Python · pandas · PostgreSQL','An ETL pipeline that turns nested CDC records into relational tables for SQL analysis.','assets/healthcare.webp','https://github.com/Maluleke21/healthcare_db-etl-pipeline'],
 ['Mn’wanati','AI · IoT · GIS','A water-management prototype exploring how sensor readings and location data can help identify leaks.','',''],
 ['Fredrose Security','React · TypeScript · Vite','A responsive service directory and enquiry flow for a South African security company.','assets/fredrose.webp','https://github.com/Maluleke21/fredrose-Security']
];
const apps=['Finder','Safari','Notes','Calendar','Mail','Camera','Photos'];
function AppIcon({name, date}) {
  return <span className={'object '+name} aria-hidden="true"><i>{name==='Calendar' ? date.toLocaleDateString('en-GB',{day:'numeric',timeZone:'Africa/Johannesburg'}) : null}</i></span>;
}
const linkedin='https://www.linkedin.com/in/hlavutelo-denrol-maluleke-321837296/';
const email='malulekedenrol@gmail.com';
function App(){
 const [locked,setLocked]=useState(true),[app,setApp]=useState(''),[index,select]=useState(0),[date,setDate]=useState(new Date());
 const start=useRef(0), opener=useRef(null), lockButton=useRef(null), panel=useRef(null);
 const open=(name:string)=>{setLocked(false);setApp(name)};
 function close(){setApp('');requestAnimationFrame(()=>opener.current?.focus())}
 useEffect(()=>{let timer=setInterval(()=>setDate(new Date()),1000);return ()=>clearInterval(timer)},[]);
 useEffect(()=>{if(app)panel.current?.focus(); const key=(e:KeyboardEvent)=>{if(e.key==='Escape'&&app)close();else if(locked&&e.key==='Enter'&&document.activeElement===document.body)setLocked(false)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[locked,app]);
 const time=date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Johannesburg'});
 const day=date.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',timeZone:'Africa/Johannesburg'});
 const item=projects[index];
 const cv='assets/Hlavutelo-Maluleke-CV.pdf';
 return <main className={locked?'locked':'desktop'} onTouchStart={e=>start.current=e.touches[0].clientY} onTouchEnd={e=>{if(locked&&start.current-e.changedTouches[0].clientY>55)setLocked(false)}}>
 <div className="wall"/><header><b><i className="mark">h.</i> Hlavutelo</b><span className="system">{locked?'Lock screen':app||'Finder'}</span><span className="place">Johannesburg, ZA <em/> SAST</span>{!locked&&<button onClick={()=>{setApp('');setLocked(true);requestAnimationFrame(()=>lockButton.current?.focus())}}>Lock</button>}</header>
 {locked?<section className="cover"><div className="clock"><p>{day}</p><h1>{time}</h1></div><div className="identity"><div className="eyebrow"><span/> Personal portfolio</div><h2>Hlavutelo<br/><i>Maluleke.</i></h2><p>Software developer &amp; data engineer</p></div><button ref={lockButton} className="unlock" onClick={()=>setLocked(false)}><strong>⌃</strong> Open desktop</button><button className="notice" onClick={()=>open('Finder')}><span className="mini">h.</span><span><small>Finder <time>now</time></small><b>Selected projects</b><span>Explore my software and data work.</span></span></button></section>:<>
 <div className="shortcuts">{apps.map(n=><button key={n} onClick={e=>{opener.current=e.currentTarget;open(n)}}><AppIcon name={n} date={date}/>{n}</button>)}</div>
 {!app&&<div className="deskTitle"><div className="eyebrow"><span/> Personal workspace</div><h2>Hlavutelo’s<br/><i>desktop.</i></h2></div>}
 {app&&<section className="window" ref={panel} tabIndex={-1} aria-label={app}><div className="bar"><button onClick={close} aria-label="Close window">×</button><b>{app}</b></div><div className="inside">
 {app==='Finder'&&<><div className="eyebrow">Project archive</div><h3>Selected work</h3><div className="projectGrid"><nav><button aria-pressed={index===-1} onClick={()=>select(-1)}>CV</button>{projects.map((p,i)=><button aria-pressed={index===i} key={p[0]} onClick={()=>select(i)}>{p[0]}</button>)}</nav>{index===-1?<article className="cvFile"><h4>Hlavutelo Maluleke · CV</h4><p>PDF · 6 pages</p><div><a href={cv} download="Hlavutelo-Maluleke-CV.pdf">Download CV</a><a href={cv} target="_blank" rel="noreferrer">Open full size</a></div><object data={cv} type="application/pdf" aria-label="Hlavutelo Maluleke CV preview"><p>Use Open full size to read the PDF.</p></object></article>:<article>{item[3]&&<img className={'projectImage p'+index} src={item[3]} alt={item[0]+' project preview'}/>}<h4>{item[0]}</h4><small>{item[1]}</small><p>{item[2]}</p>{item[4]&&<a href={item[4]} target="_blank" rel="noreferrer">{index===0?'Open app':'View repository'}</a>}{index===1&&<Pipeline/>}</article>}</div></>}
 {app==='Safari'&&<><div className="eyebrow">Bookmarks</div><h3>On the web</h3>{[['GitHub','Source code','https://github.com/Maluleke21'],['FitForge','Live fitness app',projects[0][4]],['LinkedIn','Professional profile',linkedin]].map(([n,d,u])=><a className="row" href={u} target="_blank" rel="noreferrer" key={n}><b>{n}</b><small>{d}</small></a>)}</>}
 {app==='Notes'&&<><div className="eyebrow">About me</div><h3>Developer’s notes</h3><p>I’m Hlavutelo Maluleke, a software developer and data engineer based in Johannesburg. At FNB, I worked with the Dynamic Decisioning team on scoring workflows and data pipelines.</p><h4>Building a healthcare pipeline</h4><p>I used Python and pandas to clean nested CDC records before loading them into PostgreSQL. Keeping extraction, transformation and loading separate made it easier to trace a SQL result back to its source.</p><button className="action" onClick={()=>{select(1);open('Finder')}}>Explore Healthcare_DB</button></>}
 {app==='Calendar'&&<><div className="eyebrow">Career timeline</div><h3>Experience</h3>{[['Apr 2025 – Apr 2026','FNB · Dynamic Decisioning','Developed and tested scoring workflows with Camunda, SQL and Spark.'],['Sep 2024 – Mar 2025','CAPACITI / UVU Africa','Data engineering internship focused on ETL, cleaning data and Agile delivery.'],['2023','IIE Rosebank College','Completed a Diploma in Information Technology in Software Development.']].map(([d,n,s])=><div className="row" key={d}><small>{d}</small><b>{n}</b><p>{s}</p></div>)}</>}
 {app==='Camera'&&<Camera openRoll={()=>open('Photos')}/>}
 {app==='Photos'&&<Photos openCamera={()=>open('Camera')}/>}
 {app==='Mail'&&<><div className="eyebrow">Contact</div><h3>Get in touch</h3><p>For software development, data engineering and project enquiries.</p>{email&&<a className="row" href={'mailto:'+email}><b>Email</b><small>{email}</small></a>}<a className="row" href={linkedin} target="_blank" rel="noreferrer"><b>LinkedIn</b><small>Hlavutelo Denrol Maluleke</small></a></>}
 </div></section>}
 <nav className="dock" aria-label="Applications">{apps.map(n=><button title={n} aria-label={n} aria-pressed={app===n} key={n} onClick={e=>{opener.current=e.currentTarget;open(n)}}><AppIcon name={n} date={date}/></button>)}</nav></>}
 </main>
}
ReactDOM.render(<App/>, document.getElementById('root'));
