import React from "react";

const T={
  neutral:{color:"var(--text-muted)",border:"var(--border-hairline)",background:"transparent"},
  accent:{color:"var(--accent-spring)",border:"var(--border-accent)",background:"rgba(43,224,138,.08)"},
  info:{color:"var(--signal-info)",border:"1px solid rgba(34,211,238,.45)",background:"rgba(34,211,238,.08)"},
  warn:{color:"var(--signal-warn)",border:"1px solid rgba(240,192,90,.45)",background:"rgba(240,192,90,.08)"},
  fail:{color:"var(--signal-fail)",border:"1px solid rgba(255,107,94,.45)",background:"rgba(255,107,94,.08)"}
};

export function Badge({tone="neutral",dot=false,children,style,...rest}){
  return <span style={{display:"inline-flex",alignItems:"center",gap:"var(--space-1)",height:18,
    padding:"0 6px",borderRadius:"var(--radius-1)",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
    letterSpacing:"var(--track-caps)",textTransform:"uppercase",lineHeight:1,...T[tone],...style}} {...rest}>
    {dot&&<span style={{width:5,height:5,background:"currentColor",borderRadius:"var(--radius-pill)"}}/>}
    {children}
  </span>;
}
