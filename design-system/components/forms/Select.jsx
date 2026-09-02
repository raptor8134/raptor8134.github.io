import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Select({label,options=[],value,onChange,size="md",style,...rest}){
  const [f_,setF]=React.useState(false);
  return <label style={{display:"flex",flexDirection:"column",gap:"var(--space-1)",width:"100%"}}>
    {label&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
      textTransform:"uppercase",color:f_?"var(--text-accent)":"var(--text-muted)"}}>{label}</span>}
    <span style={{position:"relative",display:"flex",alignItems:"center"}}>
      <select value={value} onChange={onChange} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{appearance:"none",width:"100%",height:size==="sm"?"var(--control-h-sm)":"var(--control-h)",
          padding:"0 28px 0 var(--pad-control-x)",background:"var(--bg-inset)",
          border:f_?"var(--border-accent)":"var(--border-hairline)",borderRadius:"var(--radius-1)",
          fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)",color:"var(--text-strong)",outline:"none",
          transition:"var(--transition-control)",...style}} {...rest}>
        {options.map(o=>{const v=typeof o==="string"?o:o.value,l=typeof o==="string"?o:o.label;
          return <option key={v} value={v}>{l}</option>;})}
      </select>
      <Icon name="chevron-down" size={13} style={{position:"absolute",right:10,color:"var(--text-muted)",pointerEvents:"none"}}/>
    </span>
  </label>;
}
