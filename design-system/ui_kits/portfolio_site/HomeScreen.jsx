function HomeScreen({onOpen}){
  const {Button,Icon,Card,Tag,SectionRule,Logotype,ScrollBackdrop,Breadcrumb}=window.DS;
  const {Terminal,KeyValueList}=window.DS;
  const {Tabs}=window.DS;
  const {Input}=window.DS;
  const data=window.SITE_DATA;
  const [tab,setTab]=React.useState("all");
  const [q,setQ]=React.useState("");
  const [bgIdx,setBgIdx]=React.useState(()=>Math.floor(Math.random()*data.backdrop.length));
  React.useEffect(()=>{
    const t=setInterval(()=>setBgIdx(i=>(i+1)%data.backdrop.length),7000);
    return ()=>clearInterval(t);
  },[]);
  const list=data.projects.filter(p=>
    (tab==="all"||p.tags.some(t=>t.includes(tab))||(tab==="failure"&&p.tags.includes("failure")))&&
    (q===""||(p.title+p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <section style={{position:"relative",padding:"var(--space-9) var(--space-6) var(--space-7)"}}>
        <ScrollBackdrop image={data.backdrop[bgIdx]} scrim="rgba(18,18,18,.55)"/>
        <div style={{width:"min(540px,100%)",margin:"0 auto",color:"#EDEDED",textAlign:"center",padding:"0 var(--space-4)",boxSizing:"border-box"}}>
        <div>
          <div style={{marginBottom:"var(--space-4)",display:"flex",justifyContent:"center"}}><Logotype size={14} variant="name" style={{color:"#EDEDED"}}/></div>
          <h1 style={{fontSize:"var(--size-5xl)",lineHeight:1.04,marginBottom:"var(--space-4)",color:"#EDEDED"}}>
            Half scientist,<br/>half engineer,<br/><span style={{color:"#2BE08A"}}>all builder</span>
          </h1>
          <p style={{fontSize:"var(--size-lg)",maxWidth:"100%"}}>
            <span style={{color:"#FFFFFF"}}>I'm a materials science and engineering student, semiconductor researcher, rocketry enthusiast, amateur machinist, and your next hire.</span>
          </p>
          <div style={{display:"flex",gap:"var(--space-2)",marginTop:"var(--space-5)",justifyContent:"center",flexWrap:"wrap"}}>
            <Button prefix={<Icon name="arrow-down" size={13}/>} onClick={()=>onOpen(data.projects[0].id)} style={{width:169,justifyContent:"center"}}>Latest project</Button>
            <Button variant="secondary" style={{color:"#EDEDED",borderColor:"#EDEDED",width:169,justifyContent:"center"}} prefix={<Icon name="download" size={13}/>}>Download Resume</Button>
          </div>
        </div>
        </div>
      </section>

      <section style={{padding:"calc(var(--space-8) / 2) var(--space-6) var(--space-8)",maxWidth:"var(--container)",margin:"0 auto"}}>
        <div style={{borderBottom:"2px solid var(--line-1)",paddingBottom:"var(--space-3)",marginBottom:"var(--space-6)"}}>
          <Breadcrumb size="xl" items={["work"]}/>
        </div>
        <SectionRule index="01" label="Selected projects"/>
        <div className="pf-tabs-row" style={{alignItems:"flex-end",justifyContent:"space-between",gap:"var(--space-5)",margin:"calc(var(--space-4) / 2) 0 var(--space-5)"}}>
          <Tabs items={[{value:"all",label:"All",count:data.projects.length},{value:"uhv",label:"Vacuum",count:1},{value:"composites",label:"Composites",count:1}]} value={tab} onChange={setTab}/>
          <div className="pf-search-wrap" style={{width:240}}><Input prompt size="sm" placeholder="filter projects…" value={q} onChange={e=>setQ(e.target.value)}/></div>
        </div>
        <div className="pf-grid-2" style={{gap:"var(--space-4)"}}>
          {list.map(p=>(
            <Card key={p.id} label="Project" index={p.index} title={p.title} interactive onClick={()=>onOpen(p.id)}
              footer={<><span>Read case study</span><Icon name="arrow-up-right" size={13}/></>}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)",letterSpacing:"var(--track-caps)"}}>{p.year}</span>
              <div className="pf-card-row">
                <p style={{fontSize:"var(--size-xs)",color:"var(--text-body)",margin:0,flex:1}}>{p.summary}</p>
                <div className="pf-card-img">
                  <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)",textTransform:"uppercase",letterSpacing:"var(--track-caps)"}}>image</span>
                </div>
              </div>
            </Card>))}
          {list.length===0&&<div style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",color:"var(--text-faint)",padding:"var(--space-5)",border:"var(--border-dashed)"}}>no matches for "{q}"</div>}
        </div>
      </section>
    </div>
  );
}
window.HomeScreen=HomeScreen;
