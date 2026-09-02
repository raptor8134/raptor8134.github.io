import React from "react";

export function Card({label,index,title,meta,footer,interactive=false,padded=true,children,style,...rest}){
  const [h,setH]=React.useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{background:interactive&&h?"var(--surface-card-hover)":"var(--surface-card)",
        border:interactive&&h?"var(--border-accent)":"var(--border-hairline)",
        borderRadius:"var(--radius-1)",cursor:interactive?"pointer":"default",
        transition:"var(--transition-control)",display:"flex",flexDirection:"column",...style}} {...rest}>
      {(label||index)&&(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"var(--space-3)",
          padding:"var(--space-2) var(--space-4)",borderBottom:"var(--border-hairline)",
          fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
          textTransform:"uppercase",color:h&&interactive?"var(--text-accent)":"var(--text-muted)"}}>
          <span>{label}</span><span style={{color:"var(--text-faint)"}}>{index}</span>
        </div>)}
      <div style={{padding:padded?"var(--space-4)":0,display:"flex",flexDirection:"column",gap:"var(--space-2)",flex:1}}>
        {title&&<div style={{fontFamily:"var(--font-display)",fontSize:"var(--size-xl)",color:"var(--text-strong)",
          letterSpacing:"var(--track-tight)",lineHeight:"var(--leading-snug)"}}>{title}</div>}
        {meta&&<div style={{fontSize:"var(--size-xs)",color:"var(--text-muted)"}}>{meta}</div>}
        {children}
      </div>
      {footer&&<div style={{padding:"var(--space-3) var(--space-4)",borderTop:"var(--border-hairline)",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-3)",
        fontSize:"var(--size-xs)",color:"var(--text-muted)"}}>{footer}</div>}
    </div>
  );
}
