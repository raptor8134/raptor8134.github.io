import React from "react";

/**
 * Full-width micrograph backdrop for a title/intro card, seen through the house scrim and
 * blur. Mount as the first child of a `position:relative` container (the intro/hero block);
 * it fills that container edge to edge, behind the content. `images` picks one at random on
 * mount; `image` is reactive — changing it (e.g. on an interval) crossfades to the new src.
 */
export function ScrollBackdrop({images=[],image,scrim="var(--bg-scrim)",blur="var(--blur-backdrop)",label="Microstructure image",style,...rest}){
  const [picked]=React.useState(()=>images.length?images[Math.floor(Math.random()*images.length)]:null);
  const chosen=image||picked;
  const [layers,setLayers]=React.useState(()=>chosen?[{src:chosen,visible:true}]:[]);
  const prevChosen=React.useRef(chosen);
  React.useEffect(()=>{
    if(chosen===prevChosen.current)return;
    prevChosen.current=chosen;
    setLayers(ls=>[...ls.map(l=>({...l,visible:false})),{src:chosen,visible:false}]);
    const raf=requestAnimationFrame(()=>setLayers(ls=>ls.map((l,i)=>i===ls.length-1?{...l,visible:true}:l)));
    const cleanup=setTimeout(()=>setLayers(ls=>ls.filter((l,i)=>i===ls.length-1)),1300);
    return ()=>{cancelAnimationFrame(raf);clearTimeout(cleanup);};
  },[chosen]);
  return <div aria-hidden="true" style={{position:"absolute",inset:0,zIndex:-1,overflow:"hidden",
    background:"var(--ink-900)",...style}} {...rest}>
    <div style={{position:"absolute",inset:0,backgroundColor:chosen?"#121212":"var(--ink-1000)"}}>
      {layers.map((l,i)=>(
        <div key={l.src+i} style={{position:"absolute",inset:0,
          backgroundImage:`url("${l.src}")`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",
          filter:"saturate(.7) contrast(1.05)",opacity:l.visible?1:0,transition:"opacity 1200ms ease"}}/>
      ))}
      {!chosen&&<div style={{position:"absolute",inset:0,backgroundImage:"var(--grid-overlay)",
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:"var(--size-2xs)",
          letterSpacing:"var(--track-caps)",textTransform:"uppercase",color:"var(--fg-4)"}}>{label}</span>
      </div>}
    </div>
    <div style={{position:"absolute",inset:0,backdropFilter:`blur(${blur})`,WebkitBackdropFilter:`blur(${blur})`,
      maskImage:"radial-gradient(ellipse 70% 70% at center,transparent 62%,black 100%)",
      WebkitMaskImage:"-webkit-radial-gradient(ellipse 70% 70% at center,transparent 62%,black 100%)"}}/>
    <div style={{position:"absolute",inset:0,background:scrim}}/>
  </div>;
}
