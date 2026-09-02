import React from "react";
import { IconButton } from "../core/IconButton.jsx";

export function Dialog({open=false,title,onClose,footer,width=520,children,style,...rest}){
  if(!open)return null;
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:50,display:"flex",
    alignItems:"center",justifyContent:"center",padding:"var(--space-6)",
    background:"rgba(5,8,11,.72)",backdropFilter:"blur(3px)"}}>
    <div role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}
      style={{width,maxWidth:"100%",background:"var(--bg-panel)",border:"var(--border-strong)",
        borderRadius:"var(--radius-1)",boxShadow:"none",...style}} {...rest}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-3)",
        padding:"var(--space-2) var(--space-2) var(--space-2) var(--space-4)",borderBottom:"var(--border-hairline)"}}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
          textTransform:"uppercase",color:"var(--text-muted)"}}>{title}</span>
        <IconButton name="x" label="Close" size="sm" onClick={onClose}/>
      </div>
      <div style={{padding:"var(--space-4)",fontSize:"var(--size-xs)",color:"var(--text-body)"}}>{children}</div>
      {footer&&<div style={{display:"flex",justifyContent:"flex-end",gap:"var(--space-2)",
        padding:"var(--space-3) var(--space-4)",borderTop:"var(--border-hairline)"}}>{footer}</div>}
    </div>
  </div>;
}
