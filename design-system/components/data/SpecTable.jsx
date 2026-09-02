import React from "react";

export function SpecTable({columns=[],rows=[],caption,dense=false,style,...rest}){
  const pad=dense?"6px var(--space-3)":"var(--space-2) var(--space-3)";
  return <div style={{border:"var(--border-hairline)",borderRadius:"var(--radius-1)",overflow:"hidden",...style}} {...rest}>
    <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"var(--font-mono)",fontSize:"var(--size-xs)"}}>
      {caption&&<caption style={{captionSide:"top",textAlign:"left",padding:pad,
        borderBottom:"var(--border-hairline)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
        textTransform:"uppercase",color:"var(--text-muted)",background:"var(--bg-inset)"}}>{caption}</caption>}
      <thead><tr>{columns.map((c,i)=><th key={i} style={{textAlign:i?"right":"left",padding:pad,
        borderBottom:"var(--border-strong)",fontSize:"var(--size-2xs)",letterSpacing:"var(--track-caps)",
        textTransform:"uppercase",color:"var(--text-muted)",fontWeight:"var(--weight-regular)"}}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r,ri)=><tr key={ri}>{r.map((c,ci)=><td key={ci}
        style={{textAlign:ci?"right":"left",padding:pad,borderBottom:ri===rows.length-1?"none":"var(--border-hairline)",
          color:ci?"var(--text-strong)":"var(--text-body)",fontVariantNumeric:"tabular-nums"}}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
