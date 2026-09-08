function AboutScreen(){
  const {Breadcrumb,SectionRule,KeyValueList,SpecTable,Tag,Tooltip,Button,Icon}=window.DS;
  const a=window.SITE_DATA.about||{};
  const exp=a.experience||[];
  const methods=a.methods||[];
  const edu=a.education||[];
  const splitDegree=d=>{
    const s=String(d).split(" — ");
    return s.length>1?<>{s[0]}<br/>{s.slice(1).join(" — ")}</>:d;
  };
  // the "0X" index in these sub-rules reads at heading ink, not the faint default
  const idx=n=><span style={{color:"var(--text-strong)"}}>{n}</span>;
  return (
    <article style={{maxWidth:"var(--container)",margin:"0 auto",padding:"calc(var(--space-8) / 2) var(--space-6) var(--space-8)"}}>
      <div style={{borderBottom:"2px solid var(--line-1)",paddingBottom:"var(--space-3)"}}>
        <Breadcrumb size="xl" items={["about"]}/>
      </div>
      <div className="pf-grid-2" style={{gap:"var(--space-8)",margin:"var(--space-6) 0 0"}}>
        <div>
          <p style={{fontSize:"var(--size-xl)",lineHeight:1.45,color:"var(--text-strong)",maxWidth:"46ch",margin:"0 0 var(--space-5)"}}>
            {a.intro}
          </p>
          {(a.body||[]).map((html,i)=>(
            <p key={i} style={{fontSize:"var(--size-md)"}} dangerouslySetInnerHTML={{__html:html}}/>
          ))}
        </div>
        <div>
          {exp.length>0&&<><SectionRule index={idx("01")} label="Experience"/>
          <div style={{margin:"var(--space-3) 0 var(--space-7)",fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)"}}>
            {exp.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"var(--space-3)",padding:"6px 0",borderBottom:"var(--border-hairline)"}}>
                <div style={{color:"var(--text-strong)"}}><strong style={{fontWeight:"var(--weight-bold)"}}>{d.role}</strong><br/>{d.org}</div>
                <div style={{fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-muted)",whiteSpace:"nowrap",textAlign:"right"}}>{d.dates}</div>
              </div>))}
          </div></>}

          {methods.length>0&&<>
          <SectionRule index={idx("02")} label="Instruments & methods"/>
          <p style={{fontSize:"var(--size-xs)",color:"var(--text-muted)",margin:"var(--space-3) 0 var(--space-3)"}}>Hover for the full name.</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"var(--space-7)"}}>
            {methods.map(m=><Tooltip key={m.tag} label={m.name}><Tag>{m.tag}</Tag></Tooltip>)}
          </div></>}

          {edu.length>0&&<>
          <SectionRule index={idx("03")} label="Education"/>
          <div style={{margin:"var(--space-3) 0 0"}}>
            <SpecTable dense columns={["Institution","Degree","Grad"]}
              rows={edu.map(e=>[e.institution,splitDegree(e.degree),e.grad])}/>
          </div></>}
        </div>
      </div>
    </article>
  );
}
window.AboutScreen=AboutScreen;
