import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Checkbox({label,checked=false,onChange,disabled=false,style,...rest}){
  return <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-2)",
    cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,fontFamily:"var(--font-mono)",
    fontSize:"var(--size-xs)",color:"var(--text-body)",...style}}>
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled}
      style={{position:"absolute",opacity:0,width:0,height:0}} {...rest}/>
    <span style={{width:15,height:15,display:"inline-flex",alignItems:"center",justifyContent:"center",
      background:checked?"var(--grad-accent)":"var(--bg-inset)",
      border:checked?"1px solid transparent":"var(--border-strong)",borderRadius:"var(--radius-1)",
      color:"var(--ink-900)",transition:"var(--transition-control)"}}>
      {checked&&<Icon name="check" size={11}/>}
    </span>
    {label}
  </label>;
}
