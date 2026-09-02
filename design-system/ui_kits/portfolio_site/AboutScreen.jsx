function AboutScreen({onContact}){
  const {Breadcrumb,SectionRule,KeyValueList,SpecTable,Tag,Tooltip,Button,Icon}=window.DS;
  const data=window.SITE_DATA;
  return (
    <article style={{maxWidth:"var(--container)",margin:"0 auto",padding:"calc(var(--space-8) / 2) var(--space-6) var(--space-8)"}}>
      <div style={{borderBottom:"2px solid var(--line-1)",paddingBottom:"var(--space-3)"}}>
        <Breadcrumb size="xl" items={["about"]}/>
      </div>
      <div className="pf-grid-2" style={{gap:"var(--space-8)",margin:"var(--space-6) 0 0"}}>
        <div>
          <p style={{fontSize:"var(--size-xl)",lineHeight:1.45,color:"var(--text-strong)",maxWidth:"46ch",margin:"0 0 var(--space-5)"}}>
            I'm a materials science and engineering student at UC Riverside, building hardware for ultra-high vacuum systems and rocketry.
          </p>
          <p style={{fontSize:"var(--size-md)"}}>As a researcher on the MEMENCYS fellowship at the Bartels Lab, I design and build vacuum systems for semiconductor material growth, including a manipulator-compatible heated stage and a multi-source metal deposition chamber.</p>
          <p style={{fontSize:"var(--size-md)"}}>As Airframe Lead for the Highlander Space Program, I led a team of seven students fabricating launch vehicle airframes from fiberglass and sheet metal, and built the filament winder documented on this site.</p>
          <p style={{fontSize:"var(--size-md)"}}>I write projects up in full because half-documented work gets repeated. If something here is useful and the detail is missing, ask and I will send the data.</p>
        </div>
        <div>
          {data.cv.length>0&&<><SectionRule index="01" label="Experience"/>
          <div style={{margin:"var(--space-3) 0 var(--space-7)",fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)"}}>
            {data.cv.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"var(--space-3)",padding:"6px 0",borderBottom:"var(--border-hairline)"}}>
                <div style={{color:"var(--text-strong)"}}><strong style={{fontWeight:"var(--weight-bold)"}}>{d.role}</strong><br/>{d.org.split(" — ")[0]}</div>
                <div style={{fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-muted)",whiteSpace:"nowrap",textAlign:"right"}}>{d.key}</div>
              </div>))}
          </div></>}

          <SectionRule index="02" label="Instruments & methods"/>
          <p style={{fontSize:"var(--size-xs)",color:"var(--text-muted)",margin:"var(--space-3) 0 var(--space-3)"}}>Hover for the full name.</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"var(--space-7)"}}>
            {[["uhv","Ultra high vacuum systems"],["cnc","CNC machining"],["cfrp","CFRP composites"],["fdm","FDM 3D printing"],["sem","Scanning electron microscopy"],["xrd","X-ray diffraction"],["utm","Universal testing machine"],["solidworks","SolidWorks"],["fusion360","Fusion 360 + simulation"],["python","Python"]]
              .map(([t,full])=><Tooltip key={t} label={full}><Tag>{t}</Tag></Tooltip>)}
          </div>

          <SectionRule index="03" label="Education"/>
          <div style={{margin:"var(--space-3) 0 0"}}>
            <SpecTable dense columns={["Institution","Degree","Grad"]} rows={[["UC Riverside",<>BS, Materials Science and Engineering<br/>3.71 GPA, Tau Beta Pi</>,"Dec 2026"]]}/>
          </div>
        </div>
      </div>
    </article>
  );
}
window.AboutScreen=AboutScreen;
