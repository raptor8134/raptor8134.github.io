import React from "react";

const BASE="https://unpkg.com/lucide-static@0.451.0/icons/";

/** Monochrome glyph. Renders the Lucide SVG as a CSS mask so it inherits currentColor. */
export function Icon({name,size=15,strokeWidth,style,...rest}){
  const url=`url("${BASE}${name}.svg")`;
  return <span role="img" aria-hidden="true" data-icon={name}
    style={{display:"inline-block",width:size,height:size,flex:"0 0 auto",background:"currentColor",
      WebkitMaskImage:url,maskImage:url,WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",
      WebkitMaskPosition:"center",maskPosition:"center",WebkitMaskSize:"contain",maskSize:"contain",
      verticalAlign:"-0.15em",...style}} {...rest}/>;
}
