import React from "react";
import { Icon } from "./Icon.jsx";

export function IconButton({name,label,size="md",variant="ghost",disabled=false,active=false,style,...rest}){
  const [h,setH]=React.useState(false);
  const d={sm:26,md:32,lg:40}[size]||32;
  return (
    <button aria-label={label} disabled={disabled}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{width:d,height:d,display:"inline-flex",alignItems:"center",justifyContent:"center",
        background:active?"var(--bg-active)":(h&&!disabled?"var(--bg-hover)":"transparent"),
        color:active?"var(--text-accent)":(h&&!disabled?"var(--text-strong)":"var(--text-body)"),
        border:variant==="outline"?"var(--border-hairline)":"1px solid transparent",
        borderRadius:"var(--radius-1)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,
        transition:"var(--transition-control)",...style}} {...rest}>
      <Icon name={name} size={size==="sm"?13:size==="lg"?18:15}/>
    </button>
  );
}
