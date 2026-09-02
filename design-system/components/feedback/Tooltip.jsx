import React from "react";

export function Tooltip({label,placement="top",children,style,...rest}){
  const [s,setS]=React.useState(false);
  const pos=placement==="bottom"?{top:"calc(100% + 6px)"}:{bottom:"calc(100% + 6px)"};
  return <span onMouseEnter={()=>setS(true)} onMouseLeave={()=>setS(false)}
    style={{position:"relative",display:"inline-flex",...style}} {...rest}>
    {children}
    {s&&<span role="tooltip" style={{position:"absolute",left:"50%",transform:"translateX(-50%)",...pos,
      whiteSpace:"nowrap",padding:"4px 8px",background:"var(--ink-1000)",border:"var(--border-strong)",
      borderRadius:"var(--radius-1)",fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
      color:"var(--text-strong)",zIndex:20,pointerEvents:"none"}}>{label}</span>}
  </span>;
}
