import React from "react";

export function Tabs({items=[],value,onChange,style,...rest}){
  return <div role="tablist" style={{display:"flex",gap:0,borderBottom:"var(--border-hairline)",...style}} {...rest}>
    {items.map(it=>{const v=typeof it==="string"?it:it.value,l=typeof it==="string"?it:it.label,
      n=typeof it==="object"?it.count:undefined,on=v===value;
      return <button key={v} role="tab" aria-selected={on} onClick={()=>onChange&&onChange(v)}
        style={{all:"unset",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"var(--space-2)",
          padding:"0 var(--space-3)",height:"var(--control-h)",fontFamily:"var(--font-mono)",
          fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",
          color:on?"var(--text-strong)":"var(--text-muted)",
          borderBottom:on?"2px solid var(--accent-spring)":"2px solid transparent",marginBottom:-1,
          background:on?"var(--grad-accent-soft)":"transparent",transition:"var(--transition-control)"}}>
        {l}{n!=null&&<span style={{color:"var(--text-faint)"}}>{n}</span>}
      </button>;})}
  </div>;
}
