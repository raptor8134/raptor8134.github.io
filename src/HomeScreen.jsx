function HomeScreen({onOpen}){
  const {Button,Icon,Card,Tag,SectionRule,Logotype,ScrollBackdrop,Breadcrumb}=window.DS;
  const {Terminal,KeyValueList}=window.DS;
  const {Tabs}=window.DS;
  const {Input}=window.DS;
  const data=window.SITE_DATA;
  const hero=data.site.hero||{};
  const cfg=data.site.projects||{};
  const pinned=cfg.pinned||[];
  const [tab,setTab]=React.useState("all");
  const [q,setQ]=React.useState("");
  const [bgIdx,setBgIdx]=React.useState(()=>Math.floor(Math.random()*data.backdrop.length));
  React.useEffect(()=>{
    if(data.backdrop.length<2)return;
    const t=setInterval(()=>setBgIdx(i=>(i+1)%data.backdrop.length),7000);
    return ()=>clearInterval(t);
  },[]);
  const shown=data.projects.filter(p=>!p.draft);
  const matchTab=(p,m)=>{
    if(m==="all")return true;
    const s=String(m).toLowerCase();
    return (p.category||"").toLowerCase()===s||p.tags.some(t=>t.toLowerCase().includes(s));
  };
  const tabItems=[{value:"all",label:"All",count:shown.length}].concat(
    (cfg.tabs||[])
      .map(t=>({value:t.match||t.label,label:t.label,count:shown.filter(p=>matchTab(p,t.match||t.label)).length}))
      .filter(t=>t.count>0));   // hide tabs with no projects
  const pinRank=id=>{const i=pinned.indexOf(id);return i===-1?pinned.length+1:i;};
  let list=shown.filter(p=>
    matchTab(p,tab)&&
    (q===""||(p.title+p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())));
  // in the "All" tab, pinned projects come first (Array.sort is stable, so the
  // rest keep folder order)
  if(tab==="all") list=[...list].sort((a,b)=>pinRank(a.id)-pinRank(b.id));
  const primary=shown[0];
  const sec=hero.secondaryCta||{};
  return (
    <div>
      <section style={{position:"relative",padding:"var(--space-9) var(--space-6) var(--space-7)"}}>
        <ScrollBackdrop image={data.backdrop[bgIdx]} scrim="rgba(18,18,18,.55)"/>
        <div style={{width:"min(540px,100%)",margin:"0 auto",color:"#EDEDED",textAlign:"center",padding:"0 var(--space-4)",boxSizing:"border-box"}}>
        <div>
          <div style={{marginBottom:"var(--space-4)",display:"flex",justifyContent:"center"}}><Logotype size={14} variant="name" style={{color:"#EDEDED"}}/></div>
          <h1 style={{fontSize:"var(--size-5xl)",lineHeight:1.04,marginBottom:"var(--space-4)",color:"#EDEDED"}}
            dangerouslySetInnerHTML={{__html:hero.headlineHtml||""}}/>
          <p style={{fontSize:"var(--size-lg)",maxWidth:"100%"}}>
            <span style={{color:"#FFFFFF"}}>{hero.intro}</span>
          </p>
          <div style={{display:"flex",gap:"var(--space-2)",marginTop:"var(--space-5)",justifyContent:"center",flexWrap:"wrap"}}>
            {primary&&<Button prefix={<Icon name="arrow-down" size={13}/>} onClick={()=>onOpen(primary.id)} style={{width:169,justifyContent:"center"}}>{hero.primaryCta||"Latest project"}</Button>}
            <Button as={sec.href?"a":"button"} href={sec.href} variant="secondary" style={{color:"#EDEDED",borderColor:"#EDEDED",width:169,justifyContent:"center"}} prefix={<Icon name="download" size={13}/>}>{sec.label||"Download Resume"}</Button>
          </div>
        </div>
        </div>
      </section>

      <section style={{padding:"calc(var(--space-8) / 2) var(--space-6) var(--space-8)",maxWidth:"var(--container)",margin:"0 auto"}}>
        <div style={{borderBottom:"2px solid var(--line-1)",paddingBottom:"var(--space-3)",marginBottom:"var(--space-5)"}}>
          <Breadcrumb size="xl" items={["projects"]}/>
        </div>
        <div className="pf-tabs-row" style={{alignItems:"flex-end",justifyContent:"space-between",gap:"var(--space-5)",margin:"0 0 var(--space-5)"}}>
          <Tabs items={tabItems} value={tab} onChange={setTab}/>
          <div className="pf-search-wrap" style={{width:240}}><Input prompt size="sm" placeholder="filter projects…" value={q} onChange={e=>setQ(e.target.value)}/></div>
        </div>
        <div className="pf-grid-2" style={{gap:"var(--space-4)"}}>
          {list.map(p=>(
            <Card key={p.id} label="Project" index={p.index} title={p.title} interactive onClick={()=>onOpen(p.id)}
              footer={<><span>Read case study</span><Icon name="arrow-up-right" size={13}/></>}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)",letterSpacing:"var(--track-caps)"}}>{p.year}</span>
              <div className="pf-card-row">
                <p style={{fontSize:"var(--size-xs)",color:"var(--text-body)",margin:0,flex:1}}>{p.summary}</p>
                {p.cardImage
                  ? <div className="pf-card-img" style={{backgroundImage:`url("${p.cardImage}")`,backgroundSize:"cover",backgroundPosition:"center"}}/>
                  : <div className="pf-card-img">
                      <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)",textTransform:"uppercase",letterSpacing:"var(--track-caps)"}}>image</span>
                    </div>}
              </div>
            </Card>))}
          {list.length===0&&<div style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",color:"var(--text-faint)",padding:"var(--space-5)",border:"var(--border-dashed)"}}>no matches for "{q}"</div>}
        </div>
      </section>
    </div>
  );
}
window.HomeScreen=HomeScreen;
