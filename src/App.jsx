function ContactSection(){
  const {SectionRule,Input,Textarea,Button,Icon,Breadcrumb}=window.DS;
  const c=window.SITE_DATA.site.contact;
  const [sent,setSent]=React.useState(false);
  return <section id="contact" style={{padding:"calc(var(--space-8) / 2) var(--space-6) var(--space-9)",maxWidth:"var(--container)",margin:"0 auto"}}>
    <div style={{borderBottom:"2px solid var(--line-1)",paddingBottom:"var(--space-3)",marginBottom:"var(--space-6)"}}>
      <Breadcrumb size="xl" items={["contact"]}/>
    </div>
    <div className="pf-grid-2" style={{gap:"var(--space-7)",marginTop:"var(--space-5)"}}>
      <div>
        <p style={{fontSize:"var(--size-xl)",lineHeight:1.45,color:"var(--text-strong)",maxWidth:"36ch",margin:0}}>
          {c.blurb}
        </p>
        {c.email&&<a href={"mailto:"+c.email} style={{display:"inline-block",marginTop:"var(--space-4)",fontFamily:"var(--font-mono)",fontSize:"var(--size-sm)"}}>{c.email}</a>}
        {c.phone&&<a href={"tel:"+(c.phoneHref||c.phone)} style={{display:"block",marginTop:"var(--space-2)",fontFamily:"var(--font-mono)",fontSize:"var(--size-sm)"}}>{c.phone}</a>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"var(--space-3)"}}>
        {sent
          ? <div style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",color:"var(--accent-spring)"}}>{c.sentMessage}</div>
          : <>
            <Input label="Email" placeholder="you@email.xyz"/>
            <Textarea label="Message" rows={5}/>
            <Button onClick={()=>setSent(true)} prefix={<Icon name="mail" size={13}/>}>Send</Button>
          </>}
      </div>
    </div>
  </section>;
}
window.ContactSection=ContactSection;

function SiteFooter(){
  const {Logotype,SectionRule,Icon}=window.DS;
  const links=window.SITE_DATA.site.footer.links||[];
  return <footer style={{borderTop:"var(--border-hairline)",padding:"var(--space-6)"}}>
    <div style={{maxWidth:"var(--container)",margin:"0 auto"}}>
      <SectionRule gradient/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:"var(--space-5)",marginTop:"var(--space-4)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"var(--space-2)"}}>
          <Logotype size={14}/>
        </div>
        <div style={{display:"flex",gap:"var(--space-4)",alignItems:"center"}}>
          {links.map(l=>(
            <a key={l.href} href={l.href} aria-label={l.label} style={{color:"var(--text-strong)",fontWeight:"var(--weight-bold)",borderBottom:"none"}}>
              <Icon name={l.icon||"external-link"} size={14}/>
            </a>))}
        </div>
      </div>
    </div>
  </footer>;
}

// Each project also has its own clean URL: /<project-id>/ . On a direct hit the
// page injects window.__ROUTE__; in-app navigation keeps the URL in sync with
// history.pushState, and Back/Forward is handled by the popstate listener below.
const PROJECT_IDS=(window.SITE_DATA.projects||[]).map(p=>p.id);
function routeFromPath(){
  const seg=(typeof location!=="undefined"?location.pathname:"/").replace(/^\/+|\/+$/g,"");
  return seg&&PROJECT_IDS.indexOf(seg)!==-1?{name:"project",id:seg}:{name:"page"};
}
function pushPath(p){
  if(typeof history!=="undefined"&&location.pathname!==p) history.pushState({},"",p);
}

function App(){
  const {SiteHeader,Button,Icon,Switch}=window.DS;
  const S=window.SITE_DATA.site;
  const [route,setRoute]=React.useState(()=>window.__ROUTE__||routeFromPath());
  const [active,setActive]=React.useState((S.nav&&S.nav[0])||"work");
  const [paper,setPaper]=React.useState(false);
  React.useEffect(()=>{
    // flip the palette with control transitions off, so it changes in one step
    const root=document.documentElement;
    root.setAttribute("data-theme-animating","");
    document.body.dataset.theme=paper?"paper":"";
    void document.body.offsetWidth;                 // commit the new colours now
    root.removeAttribute("data-theme-animating");
  },[paper]);

  React.useEffect(()=>{
    const onPop=()=>{setRoute(routeFromPath());window.scrollTo(0,0)};
    window.addEventListener("popstate",onPop);
    return ()=>window.removeEventListener("popstate",onPop);
  },[]);

  // keep <title> in sync across in-app navigation (direct loads already ship the right one)
  React.useEffect(()=>{
    const base=S.name+(S.role?" — "+S.role:"");
    const p=route.name==="project"&&(window.SITE_DATA.projects||[]).find(x=>x.id===route.id);
    document.title=p?p.title+" — "+S.name:base;
  },[route]);

  React.useEffect(()=>{
    if(route.name!=="page")return;
    const ids=S.nav||["work","about","contact"];
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)});
    },{rootMargin:"-40% 0px -50% 0px"});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el)});
    return ()=>obs.disconnect();
  },[route.name]);

  const scrollToId=id=>{
    const el=document.getElementById(id);
    if(el)window.scrollTo({top:el.offsetTop-56,behavior:"smooth"});
  };
  const goSection=id=>{
    if(route.name!=="page"){setRoute({name:"page"});pushPath("/");setTimeout(()=>scrollToId(id),0);return}
    scrollToId(id);
  };
  const open=id=>{setRoute({name:"project",id});pushPath("/"+id+"/");window.scrollTo(0,0)};
  const backHome=()=>{setRoute({name:"page"});pushPath("/");window.scrollTo(0,0)};

  const resume=S.resume||{};
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <SiteHeader links={S.nav} active={route.name==="project"?(S.nav&&S.nav[0]||"work"):active}
      onNavigate={goSection}
      brand={<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-sm)",letterSpacing:"var(--track-wide)",color:"var(--text-strong)"}}>[jn@portfolio ~] <span style={{animation:"cursor-blink 1s step-end infinite"}}>_</span></span>}
      navPrefix={<span className="style-switch"><Switch checked={paper} onChange={()=>setPaper(!paper)}/></span>}
      action={<Button as={resume.href?"a":"button"} href={resume.href} size="sm" variant="secondary" prefix={<Icon name="download" size={13}/>}>{resume.label||"Resume"}</Button>}/>
    <main style={{flex:1}}>
      {route.name==="page"&&<>
        <section id="work"><window.HomeScreen onOpen={open}/></section>
        <section id="about"><window.AboutScreen/></section>
        <window.ContactSection/>
      </>}
      {route.name==="project"&&<window.ProjectScreen id={route.id} onBack={backHome} onOpen={open}/>}
    </main>
    <SiteFooter/>
  </div>;
}
window.App=App;
