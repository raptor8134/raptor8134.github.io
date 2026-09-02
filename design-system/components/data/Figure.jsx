import React from "react";

export function Figure({src,alt="",caption,index,ratio="4 / 3",placeholder="Micrograph / rig photo",style,...rest}){
  return <figure style={{margin:0,display:"flex",flexDirection:"column",gap:"var(--space-2)",...style}} {...rest}>
    <div style={{aspectRatio:ratio,background:"var(--bg-inset)",border:"var(--border-hairline)",
      borderRadius:"var(--radius-1)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",
      backgroundImage:src?undefined:"var(--grid-overlay)"}}>
      {src?<img src={src} alt={alt} style={{width:"100%",height:"100%",objectFit:"cover",filter:"saturate(.85)"}}/>
        :<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
          textTransform:"uppercase",color:"var(--text-faint)"}}>{placeholder}</span>}
    </div>
    {(caption||index)&&<figcaption style={{display:"flex",gap:"var(--space-2)",fontFamily:"var(--font-mono)",
      fontSize:"var(--size-2xs)",color:"var(--text-muted)",lineHeight:"var(--leading-snug)"}}>
      {index&&<span style={{color:"var(--accent-spring)"}}>{index}</span>}<span>{caption}</span>
    </figcaption>}
  </figure>;
}
