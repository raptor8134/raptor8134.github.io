function ProjectSheet(){
  const {SectionRule,KeyValueList,SpecTable,Meter,Figure,Callout}=window.DS;
  const p=window.SITE_DATA.projects[0];
  return <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"18mm 16mm 14mm",gap:"var(--space-4)"}}>
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,borderBottom:"2px solid var(--text-strong)",paddingBottom:"var(--space-3)"}}>
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-muted)"}}>Project {p.index} · {p.year}</div>
        <h1 style={{fontSize:24,marginTop:6,color:"var(--text-strong)"}}>{p.title}</h1>
      </div>
    </header>
    <p style={{fontSize:12,lineHeight:1.6,margin:0,maxWidth:"none",color:"var(--text-body)"}}>{p.summary}</p>
    <KeyValueList columns={2} items={p.meta}/>
    <div><SectionRule index="01" label="Method"/>
      <div style={{marginTop:"var(--space-3)",display:"flex",flexDirection:"column",gap:"var(--space-2)"}}>
        {p.body.filter(b=>b.p).slice(0,3).map((b,i)=><p key={i} style={{fontSize:10.5,lineHeight:1.55,margin:0,maxWidth:"none"}}>{b.p}</p>)}
      </div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)"}}>
      {p.body.filter(b=>b.fig).slice(0,2).map((b,i)=><Figure key={i} {...b.fig} ratio="4 / 3"/>)}
    </div>
    <div><SectionRule index="02" label="Results"/>
      <div style={{display:"grid",gridTemplateColumns:"1.25fr 1fr",gap:"var(--space-4)",marginTop:"var(--space-3)",alignItems:"start"}}>
        <SpecTable dense {...p.body.find(b=>b.table).table}/>
        <div style={{display:"flex",flexDirection:"column",gap:"var(--space-3)"}}>{p.meters.map(m=><Meter key={m.label} {...m}/>)}</div>
      </div></div>
    <Callout tone="note" title="Test conditions">Room temperature, 10 Hz, R = 0.1, n = 6 per condition. Fatigue per ASTM E466.</Callout>
    <footer style={{marginTop:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"var(--border-hairline)",paddingTop:"var(--space-2)",fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-faint)"}}>
      <span>James Notley · {p.id}</span><span>Page 2 / 2</span></footer>
  </div>;
}
window.ProjectSheet=ProjectSheet;
