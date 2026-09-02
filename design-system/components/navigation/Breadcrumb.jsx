import React from "react";

export function Breadcrumb({items=[],size="sm",style,...rest}){
  const fs=size==="xl"?"var(--size-xl)":size==="lg"?"var(--size-lg)":"var(--size-2xs)";
  return <nav style={{display:"flex",alignItems:"center",gap:"var(--space-2)",fontFamily:"var(--font-mono)",
    fontSize:fs,letterSpacing:"var(--track-wide)",color:"var(--text-muted)",...style}} {...rest}>
    <span style={{color:"var(--accent-spring)"}}>~</span>
    {items.map((it,i)=>{const l=typeof it==="string"?it:it.label,last=i===items.length-1;
      return <React.Fragment key={i}>
        <span style={{color:"var(--text-faint)"}}>/</span>
        <span style={{color:last?"var(--text-strong)":"var(--text-muted)"}}>{l}</span>
      </React.Fragment>;})}
  </nav>;
}
