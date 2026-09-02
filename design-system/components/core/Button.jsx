import React from "react";

const V={
  primary:{background:"var(--grad-accent)",color:"var(--ink-900)",border:"1px solid transparent"},
  secondary:{background:"transparent",color:"var(--text-strong)",border:"var(--border-strong)"},
  ghost:{background:"transparent",color:"var(--text-body)",border:"1px solid transparent"},
  danger:{background:"transparent",color:"var(--signal-fail)",border:"1px solid rgba(255,107,94,.5)"}
};
const S={
  sm:{height:"var(--control-h-sm)",padding:"0 var(--space-2)",fontSize:"var(--size-2xs)"},
  md:{height:"var(--control-h)",padding:"0 var(--space-3)",fontSize:"var(--size-xs)"},
  lg:{height:"var(--control-h-lg)",padding:"0 var(--space-4)",fontSize:"var(--size-sm)"}
};

export function Button({variant="primary",size="md",disabled=false,prefix,suffix,full=false,as="button",children,style,...rest}){
  const [h,setH]=React.useState(false),[a,setA]=React.useState(false);
  const Tag=as;
  const v=V[variant]||V.primary;
  return (
    <Tag
      disabled={Tag==="button"?disabled:undefined}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setA(false)}}
      onMouseDown={()=>setA(true)} onMouseUp={()=>setA(false)}
      style={{
        display:full?"flex":"inline-flex",width:full?"100%":undefined,alignItems:"center",justifyContent:"center",
        gap:"var(--space-2)",fontFamily:"var(--font-mono)",fontWeight:"var(--weight-medium)",
        letterSpacing:"var(--track-caps)",textTransform:"uppercase",borderRadius:"var(--radius-1)",
        cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,whiteSpace:"nowrap",
        transition:"var(--transition-control),transform var(--dur-1) var(--ease-term)",
        transform:a&&!disabled?"translateY(1px)":"none",textDecoration:"none",
        ...v,...S[size],
        ...(h&&!disabled?(variant==="primary"
          ?{filter:"brightness(1.08)"}
          :{background:"var(--bg-hover)",borderColor:variant==="danger"?"var(--signal-fail)":"var(--line-accent)",color:variant==="ghost"?"var(--text-strong)":v.color}):null),
        ...style
      }}
      {...rest}
    >{prefix}<span>{children}</span>{suffix}</Tag>
  );
}
