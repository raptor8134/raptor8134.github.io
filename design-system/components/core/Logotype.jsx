import React from "react";

/** Wordmark. No logo mark exists for this brand; the name set in type IS the mark. */
export function Logotype({size=18,variant="full",gradient=false,style,...rest}){
  const txt=variant==="initials"?"JN":"JAMES NOTLEY";
  return <span style={{display:"inline-flex",alignItems:"baseline",gap:size*.45,
    fontFamily:"var(--font-mono)",fontWeight:"var(--weight-bold)",fontSize:size,
    letterSpacing:"var(--track-wide)",lineHeight:1,color:"var(--text-strong)",...style}} {...rest}>
    <span style={gradient?{background:"var(--grad-accent)",WebkitBackgroundClip:"text",backgroundClip:"text",color:"transparent"}:undefined}>{txt}</span>
  </span>;
}
