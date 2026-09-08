function RawHtml({html,tag,style}){
  const T=tag||"span";
  return <T style={style} dangerouslySetInnerHTML={{__html:html||""}}/>;
}

function ArticleBlock({block}){
  const {SpecTable,Figure,Callout,SectionRule}=window.DS;
  if(block.h!=null)return <RawHtml tag="h2" html={block.h} style={{fontSize:"var(--size-2xl)",margin:"var(--space-7) 0 var(--space-3)",maxWidth:"32ch"}}/>;
  if(block.p!=null)return <p style={{fontSize:"var(--size-md)",lineHeight:"var(--leading-body)",color:"var(--text-body)",maxWidth:"var(--measure)"}}>
    {block.lead&&<strong style={{color:"var(--text-strong)",fontWeight:600}} dangerouslySetInnerHTML={{__html:block.lead+" "}}/>}
    <span dangerouslySetInnerHTML={{__html:block.p}}/>
  </p>;
  if(block.list)return <div style={{margin:"var(--space-5) 0",maxWidth:"var(--measure)",borderTop:"var(--border-hairline)",borderBottom:"var(--border-hairline)",padding:"var(--space-4) 0"}}>
    {block.list.title&&<RawHtml html={block.list.title} style={{display:"block",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--text-faint)",marginBottom:"var(--space-3)"}}/>}
    <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:"var(--space-2)"}}>
      {block.list.items.map((it,i)=><li key={i} style={{display:"flex",gap:"var(--space-3)",fontSize:"var(--size-sm)",lineHeight:1.5,color:"var(--text-body)"}}><span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--accent-spring)",paddingTop:2}}>{String(i+1).padStart(2,"0")}</span><span dangerouslySetInnerHTML={{__html:it}}/></li>)}
    </ul></div>;
  if(block.skills!=null)return <div style={{marginTop:"var(--space-7)",paddingTop:"var(--space-4)",borderTop:"var(--border-hairline)",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",lineHeight:1.8,color:"var(--text-faint)",maxWidth:"var(--measure)"}}>Skills: {block.skills}</div>;
  if(block.fig&&block.fig.video&&block.fig.src)return <figure style={{margin:"var(--space-5) 0",display:"flex",flexDirection:"column",gap:"var(--space-2)"}}>
    <div style={{aspectRatio:"4 / 3",background:"var(--bg-inset)",border:"var(--border-hairline)",overflow:"hidden"}}>
      <video src={block.fig.src} controls playsInline preload="metadata" style={{width:"100%",height:"100%",objectFit:"cover",filter:"saturate(.85)",display:"block"}}/>
    </div>
    {(block.fig.caption||block.fig.index)&&<figcaption style={{display:"flex",gap:"var(--space-2)",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-muted)",lineHeight:"var(--leading-snug)"}}>
      {block.fig.index&&<span style={{color:"var(--accent-spring)"}}>{block.fig.index}</span>}
      {block.fig.caption&&<RawHtml html={block.fig.caption}/>}
    </figcaption>}
  </figure>;
  if(block.fig)return <div style={{margin:"var(--space-5) 0"}}><Figure src={block.fig.src} alt={block.fig.alt} index={block.fig.index}
    placeholder={block.fig.placeholder}
    caption={block.fig.caption?<RawHtml html={block.fig.caption}/>:undefined}/></div>;
  if(block.table)return <div style={{margin:"var(--space-5) 0",maxWidth:"var(--measure)"}}><SpecTable
    caption={block.table.caption?<RawHtml html={block.table.caption}/>:undefined}
    columns={block.table.columns.map((c,i)=><RawHtml key={i} html={c}/>)}
    rows={block.table.rows.map(r=>r.map((c,i)=><RawHtml key={i} html={c}/>))}/></div>;
  if(block.note)return <div style={{margin:"var(--space-5) 0",maxWidth:"var(--measure)"}}><Callout tone={block.note.tone} title={block.note.title}>
    <RawHtml html={block.note.children}/>
  </Callout></div>;
  return null;
}

function ProjectScreen({id,onBack,onOpen}){
  const {Breadcrumb,Tag,SectionRule,KeyValueList,Button,Icon}=window.DS;
  const data=window.SITE_DATA;
  const p=data.projects.find(x=>x.id===id)||data.projects[0];
  const others=data.projects.filter(x=>x.id!==p.id&&!x.draft);
  return (
    <article style={{maxWidth:820,margin:"0 auto",padding:"var(--space-7) var(--space-6) var(--space-9)"}}>
      {p.draft&&<div style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
        textTransform:"uppercase",color:"var(--signal-warn)",border:"1px dashed var(--signal-warn)",
        padding:"var(--space-2) var(--space-3)",marginBottom:"var(--space-4)"}}>
        Unlisted / staging — not linked from the site or indexed
      </div>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-4)",
        borderBottom:"var(--border-hairline)",paddingBottom:"var(--space-3)"}}>
        <Breadcrumb size="xl" items={["work",p.id]}/>
        <Button size="sm" variant="ghost" prefix={<Icon name="arrow-left" size={13}/>} onClick={onBack}>Back</Button>
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:"var(--space-3)",marginTop:"var(--space-5)"}}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
          textTransform:"uppercase",color:"var(--text-faint)"}}>Project {p.index} · {p.year}</span>
      </div>
      <h1 style={{fontSize:"var(--size-4xl)",margin:"var(--space-2) 0 var(--space-4)",maxWidth:"24ch"}}>{p.title}</h1>
      <p style={{fontSize:"var(--size-lg)",lineHeight:1.5,color:"var(--text-strong)",maxWidth:"58ch"}}>{p.summary}</p>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"var(--space-4) 0 var(--space-5)"}}>
        {p.tags.map(t=><Tag key={t}>{t}</Tag>)}
      </div>
      {p.meta&&p.meta.length>0&&<div style={{margin:"var(--space-5) 0 var(--space-6)",maxWidth:"var(--measure)"}}>
        <KeyValueList columns={2} items={p.meta}/>
      </div>}
      <div>{(p.body&&p.body.length?p.body:[{p:"Write-up in progress."}]).map((b,i)=><ArticleBlock key={i} block={b}/>)}</div>
      {others.length>0&&<div style={{marginTop:"var(--space-8)"}}>
        <SectionRule label="More work"/>
        <div style={{display:"flex",flexDirection:"column",marginTop:"var(--space-3)"}}>
          {others.map(o=>(
            <button key={o.id} onClick={()=>onOpen(o.id)} style={{all:"unset",cursor:"pointer",display:"flex",
              alignItems:"baseline",gap:"var(--space-3)",padding:"var(--space-3) 0",borderBottom:"var(--border-hairline)"}}>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)"}}>{o.index}</span>
              <span style={{fontFamily:"var(--font-display)",fontSize:"var(--size-lg)",color:"var(--text-strong)",flex:1}}>{o.title}</span>
              <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",color:"var(--text-muted)"}}>{o.year}</span>
            </button>))}
        </div>
      </div>}
    </article>
  );
}
window.ArticleBlock=ArticleBlock;
window.ProjectScreen=ProjectScreen;
