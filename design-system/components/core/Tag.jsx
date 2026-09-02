import React from "react";

export function Tag({children,onRemove,selected=false,style,...rest}){
  const [h,setH]=React.useState(false);
  return <span onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{display:"inline-flex",alignItems:"center",gap:6,height:22,padding:"0 8px",
      background:selected?"var(--grad-accent-soft)":(h?"var(--bg-hover)":"transparent"),
      border:selected?"var(--border-accent)":"var(--border-hairline)",borderRadius:"var(--radius-1)",
      fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",
      color:selected?"var(--text-strong)":"var(--text-body)",transition:"var(--transition-control)",...style}} {...rest}>
    <span style={{color:"var(--text-faint)"}}>#</span>{children}
    {onRemove&&<button onClick={onRemove} aria-label="Remove" style={{all:"unset",cursor:"pointer",color:"var(--text-muted)",fontSize:"var(--size-xs)"}}>×</button>}
  </span>;
}
