import React from "react";

export function Meter({label,value=0,max=100,unit,tone="accent",style,...rest}){
  const pct=Math.max(0,Math.min(100,(value/max)*100));
  const fill=tone==="accent"?"var(--grad-accent)":`var(--signal-${tone})`;
  return <div style={{display:"flex",flexDirection:"column",gap:"var(--space-1)",width:"100%",...style}} {...rest}>
    <div style={{display:"flex",justifyContent:"space-between",fontFamily:"var(--font-mono)",
      fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase"}}>
      <span style={{color:"var(--text-muted)"}}>{label}</span>
      <span style={{color:"var(--text-strong)",fontVariantNumeric:"tabular-nums",letterSpacing:0}}>{value}{unit&&` ${unit}`}</span>
    </div>
    <div style={{height:6,background:"var(--bg-inset)",border:"var(--border-hairline)",borderRadius:"var(--radius-1)",overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height:"100%",background:fill,transition:`width var(--dur-4) var(--ease-term)`}}/>
    </div>
  </div>;
}
