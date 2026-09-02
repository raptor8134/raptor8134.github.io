import React from "react";

export function Switch({label,checked=false,onChange,disabled=false,style,...rest}){
  return <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-2)",
    cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,fontFamily:"var(--font-mono)",
    fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",textTransform:"uppercase",
    color:checked?"var(--text-strong)":"var(--text-muted)",...style}}>
    <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled}
      style={{position:"absolute",opacity:0,width:0,height:0}} {...rest}/>
    <span style={{width:34,height:16,padding:2,display:"inline-flex",alignItems:"center",
      justifyContent:checked?"flex-end":"flex-start",background:checked?"var(--grad-accent)":"var(--bg-inset)",
      border:checked?"1px solid transparent":"var(--border-strong)",borderRadius:"var(--radius-1)",
      transition:"var(--transition-control)"}}>
      <span style={{width:10,height:10,background:checked?"var(--ink-900)":"var(--text-muted)",
        transition:"var(--transition-control)"}}/>
    </span>
    {label}
  </label>;
}
