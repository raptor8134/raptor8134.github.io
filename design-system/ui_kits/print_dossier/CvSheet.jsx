function CvSheet(){
  const {Logotype,SectionRule,KeyValueList,SpecTable,Tag,Badge}=window.DS;
  const d=window.SITE_DATA;
  return <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"18mm 16mm 14mm",gap:"var(--space-5)"}}>
    <header style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"2px solid var(--text-strong)",paddingBottom:"var(--space-3)"}}>
      <div>
        <div style={{fontFamily:"var(--font-mono)",fontWeight:700,fontSize:26,letterSpacing:"var(--track-wide)",color:"var(--text-strong)"}}>JAMES NOTLEY</div>
        <div style={{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-muted)",marginTop:4}}>Materials engineer · Sheffield, UK</div>
      </div>
      <div style={{textAlign:"right",fontFamily:"var(--font-mono)",fontSize:10,color:"var(--text-body)",lineHeight:1.7}}>
        james@notley.eng<br/>notley.eng<br/>github.com/jnotley
      </div>
    </header>
    <p style={{fontSize:11,lineHeight:1.6,margin:0,maxWidth:"none"}}>
      Materials engineer specialising in additive metals, fatigue and failure analysis. Six years between aerostructures and additive manufacturing, with a record of turning material problems back into process problems that can be fixed on the shop floor.
    </p>
    <div><SectionRule index="01" label="Experience"/><div style={{marginTop:"var(--space-3)"}}>
      {[["Senior materials engineer","Kelvin Additive","2023 — now",["Owned qualification of Ti-6Al-4V lattice parts from powder intake to fatigue sign-off.","Cut post-HIP scrap by 38% by re-orienting load-bearing struts within 20° of vertical.","Wrote the group's build-acceptance procedure, now used across three machines."]],
        ["Materials engineer","Barrow Aerostructures","2020 — 2023",["Ran a 240-weld porosity survey that reduced fillet-weld rework by a third.","Closed a repeat gearbox shaft failure to a grinding burn missed by two inspection passes."]],
        ["Graduate engineer","Barrow Aerostructures","2019 — 2020",["Built a four-station dead-weight creep rig for £3,850, still the teaching standard."]]]
        .map(([role,org,yrs,bullets])=><div key={role} style={{marginBottom:"var(--space-4)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12}}>
            <span style={{fontFamily:"var(--font-display)",fontSize:14,color:"var(--text-strong)"}}>{role} · {org}</span>
            <span style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"var(--track-caps)",color:"var(--text-muted)",whiteSpace:"nowrap"}}>{yrs}</span>
          </div>
          <ul style={{margin:"6px 0 0",paddingLeft:0,listStyle:"none",display:"flex",flexDirection:"column",gap:3}}>
            {bullets.map(b=><li key={b} style={{display:"flex",gap:8,fontFamily:"var(--font-mono)",fontSize:10.5,lineHeight:1.5,color:"var(--text-body)"}}>
              <span style={{color:"var(--accent-spring)"}}>—</span><span>{b}</span></li>)}
          </ul></div>)}
    </div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-6)"}}>
      <div><SectionRule index="02" label="Education"/>
        <div style={{marginTop:"var(--space-3)"}}><KeyValueList items={[{key:"2019",value:"MEng Materials Science"},{key:"",value:"University of Sheffield, 1st"}]}/></div></div>
      <div><SectionRule index="03" label="Certifications"/>
        <div style={{marginTop:"var(--space-3)"}}><KeyValueList items={[{key:"BINDT",value:"RT / PT Level 2"},{key:"IMMM",value:"CEng"}]}/></div></div>
    </div>
    <div><SectionRule index="04" label="Methods"/>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:"var(--space-3)"}}>
        {["sem","edx","xrd","ct","dic","fatigue","abaqus","python","gmaw","slm","hip","metallography"].map(t=><Tag key={t}>{t}</Tag>)}
      </div></div>
    <footer style={{marginTop:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"var(--border-hairline)",paddingTop:"var(--space-2)",fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-faint)"}}>
      <span>Curriculum vitae · 2026</span><span>Page 1 / 2</span></footer>
  </div>;
}
window.CvSheet=CvSheet;
