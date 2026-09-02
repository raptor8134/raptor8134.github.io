import React from "react";
import { Logotype } from "../core/Logotype.jsx";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";

export function SiteHeader({links=[],active,onNavigate,action,navPrefix,brand,style,...rest}){
  const [open,setOpen]=React.useState(false);
  const navigate=v=>{setOpen(false);onNavigate&&onNavigate(v)};
  return <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-5)",
    height:56,padding:"0 var(--space-6)",borderBottom:"var(--border-hairline)",
    background:"color-mix(in oklab,var(--bg-canvas) 88%,transparent)",backdropFilter:"blur(8px)",
    position:"sticky",top:0,zIndex:10,...style}} {...rest}>
    <button onClick={()=>navigate("work")} style={{all:"unset",cursor:"pointer"}} aria-label="Home">{brand||<Logotype size={14}/>}</button>
    <nav className={"pf-header-nav"+(open?" pf-open":"")} style={{alignItems:"center",gap:"var(--space-5)"}}>
      {navPrefix}
      {links.map(l=>{const v=typeof l==="string"?l:l.value,t=typeof l==="string"?l:l.label,on=v===active;
        return <button key={v} onClick={()=>navigate(v)}
          style={{all:"unset",cursor:"pointer",display:"inline-flex",alignItems:"center",height:"100%",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
            letterSpacing:"var(--track-caps)",textTransform:"uppercase",
            color:on?"var(--text-strong)":"var(--text-muted)"}}>
          <span style={{borderBottom:on?"1px solid var(--accent-spring)":"1px solid transparent",paddingBottom:2}}>{t}</span>
        </button>;})}
      {action||<Button size="sm" variant="secondary" prefix={<Icon name="download" size={13}/>}>CV</Button>}
    </nav>
    <button onClick={()=>setOpen(!open)} className="pf-header-burger" aria-label={open?"Close menu":"Open menu"}
      style={{all:"unset",cursor:"pointer",color:"var(--text-strong)"}}>
      <Icon name={open?"x":"menu"} size={20}/>
    </button>
  </header>;
}
