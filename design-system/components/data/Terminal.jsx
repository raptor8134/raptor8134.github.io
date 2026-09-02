import React from "react";

export function Terminal({title="~/notley",lines=[],cursor=true,style,...rest}){
  return <div style={{background:"var(--bg-inset)",border:"var(--border-hairline)",borderRadius:"var(--radius-1)",
    fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",overflow:"hidden",...style}} {...rest}>
    <div style={{display:"flex",alignItems:"center",gap:"var(--space-2)",padding:"6px var(--space-3)",
      borderBottom:"var(--border-hairline)",color:"var(--text-faint)",fontSize:"var(--size-2xs)",
      letterSpacing:"var(--track-caps)",textTransform:"uppercase"}}>
      <span style={{width:6,height:6,background:"var(--accent-spring)"}}/>{title}
    </div>
    <div style={{padding:"var(--space-3)",display:"flex",flexDirection:"column",gap:2,
      backgroundImage:"var(--scanline)"}}>
      {lines.map((l,i)=>{const cmd=typeof l==="object"&&l.cmd,txt=typeof l==="string"?l:(l.cmd||l.out);
        return <div key={i} style={{display:"flex",gap:"var(--space-2)",lineHeight:"var(--leading-snug)"}}>
          <span style={{color:cmd?"var(--accent-spring)":"transparent"}}>&gt;</span>
          <span style={{color:cmd?"var(--text-strong)":"var(--text-body)",whiteSpace:"pre-wrap"}}>{txt}</span>
        </div>;})}
      {cursor&&<div style={{display:"flex",gap:"var(--space-2)"}}>
        <span style={{color:"var(--accent-spring)"}}>&gt;</span>
        <span style={{width:7,height:14,background:"var(--accent-spring)",animation:"ds-blink var(--blink)"}}/>
      </div>}
    </div>
  </div>;
}
