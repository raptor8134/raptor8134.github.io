import React from "react";

export function KeyValueList({items=[],columns=1,style,...rest}){
  return <dl style={{display:"grid",gridTemplateColumns:`repeat(${columns},minmax(0,1fr))`,
    gap:"var(--space-1) var(--space-6)",margin:0,fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",...style}} {...rest}>
    {items.map((it,i)=><div key={i} style={{display:"flex",alignItems:"baseline",gap:"var(--space-2)",
      padding:"6px 0",borderBottom:"var(--border-hairline)"}}>
      <dt style={{fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",
        color:"var(--text-muted)",whiteSpace:"nowrap"}}>{it.key}</dt>
      <span style={{flex:1,borderBottom:"var(--border-dashed)",opacity:.5,transform:"translateY(-3px)"}}/>
      <dd style={{margin:0,color:"var(--text-strong)",fontVariantNumeric:"tabular-nums",textAlign:"right"}}>{it.value}</dd>
    </div>)}
  </dl>;
}
