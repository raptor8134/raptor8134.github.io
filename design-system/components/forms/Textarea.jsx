import React from "react";

export function Textarea({label,hint,rows=4,invalid=false,style,...rest}){
  const [f_,setF]=React.useState(false);
  return <label style={{display:"flex",flexDirection:"column",gap:"var(--space-1)",width:"100%"}}>
    {label&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
      textTransform:"uppercase",color:f_?"var(--text-accent)":"var(--text-muted)"}}>{label}</span>}
    <textarea rows={rows} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{background:"var(--bg-inset)",border:invalid?"1px solid var(--signal-fail)":(f_?"var(--border-accent)":"var(--border-hairline)"),
        borderRadius:"var(--radius-1)",padding:"var(--space-2) var(--pad-control-x)",resize:"vertical",
        fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",lineHeight:"var(--leading-body)",
        color:"var(--text-strong)",outline:"none",boxShadow:f_&&!invalid?"var(--ring-focus)":"none",
        transition:"var(--transition-control)",...style}} {...rest}/>
    {hint&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)"}}>{hint}</span>}
  </label>;
}
