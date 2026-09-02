import React from "react";
import { Icon } from "../core/Icon.jsx";

const M={note:{c:"var(--signal-info)",i:"info"},ok:{c:"var(--signal-ok)",i:"check"},
  warn:{c:"var(--signal-warn)",i:"triangle-alert"},fail:{c:"var(--signal-fail)",i:"octagon-alert"}};

export function Callout({tone="note",title,children,style,...rest}){
  const m=M[tone]||M.note;
  return <div style={{display:"flex",gap:"var(--space-3)",padding:"var(--space-3) var(--space-4)",
    background:"var(--bg-panel)",border:"var(--border-hairline)",borderLeft:`2px solid ${m.c}`,
    borderRadius:"var(--radius-1)",...style}} {...rest}>
    <Icon name={m.i} size={15} style={{color:m.c,marginTop:2}}/>
    <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:0}}>
      {title&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
        letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:m.c}}>{title}</span>}
      <div style={{fontSize:"var(--size-xs)",color:"var(--text-body)",lineHeight:"var(--leading-body)"}}>{children}</div>
    </div>
  </div>;
}
