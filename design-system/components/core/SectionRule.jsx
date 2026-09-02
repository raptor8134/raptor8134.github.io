import React from "react";

export function SectionRule({label,index,gradient=false,style,...rest}){
  const grad=gradient==="smooth"?"var(--grad-accent-smooth)":gradient?"var(--grad-accent)":"var(--line-1)";
  return <div style={{display:"flex",alignItems:"center",gap:"var(--space-3)",width:"100%",...style}} {...rest}>
    {index&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",color:"var(--text-faint)"}}>{index}</span>}
    {label&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
      textTransform:"uppercase",color:"var(--text-muted)",whiteSpace:"nowrap"}}>{label}</span>}
    <span style={{flex:1,height:1,background:grad,opacity:gradient?.7:1}}/>
  </div>;
}
