import React from "react";

export function Input({label,hint,prompt=false,invalid=false,size="md",style,...rest}){
  const [f_,setF]=React.useState(false);
  return <label style={{display:"flex",flexDirection:"column",gap:"var(--space-1)",width:"100%"}}>
    {label&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
      textTransform:"uppercase",color:f_?"var(--text-accent)":"var(--text-muted)",transition:"var(--transition-control)"}}>{label}</span>}
    <span style={{display:"flex",alignItems:"center",gap:"var(--space-2)",
      height:size==="sm"?"var(--control-h-sm)":"var(--control-h)",padding:"0 var(--pad-control-x)",
      background:"var(--bg-inset)",borderRadius:"var(--radius-1)",
      border:invalid?"1px solid var(--signal-fail)":(f_?"var(--border-accent)":"var(--border-hairline)"),
      boxShadow:f_&&!invalid?"var(--ring-focus)":"none",transition:"var(--transition-control)"}}>
      {prompt&&<span style={{color:"var(--accent-spring)",fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)"}}>&gt;</span>}
      <input onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{all:"unset",flex:1,minWidth:0,fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",
          color:"var(--text-strong)",...style}} {...rest}/>
    </span>
    {hint&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
      color:invalid?"var(--signal-fail)":"var(--text-faint)"}}>{hint}</span>}
  </label>;
}
