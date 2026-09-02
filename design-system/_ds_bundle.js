/* @ds-bundle: {"format":4,"namespace":"NotleyDesignSystem_566c40","components":[{"name":"ScrollBackdrop","sourcePath":"components/backdrop/ScrollBackdrop.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logotype","sourcePath":"components/core/Logotype.jsx"},{"name":"SectionRule","sourcePath":"components/core/SectionRule.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Figure","sourcePath":"components/data/Figure.jsx"},{"name":"KeyValueList","sourcePath":"components/data/KeyValueList.jsx"},{"name":"Meter","sourcePath":"components/data/Meter.jsx"},{"name":"SpecTable","sourcePath":"components/data/SpecTable.jsx"},{"name":"Terminal","sourcePath":"components/data/Terminal.jsx"},{"name":"Callout","sourcePath":"components/feedback/Callout.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/backdrop/ScrollBackdrop.jsx":"0e6def4a41e0","components/core/Badge.jsx":"6a990ef87f87","components/core/Button.jsx":"522a374bd4bd","components/core/Card.jsx":"cc5643785cdb","components/core/Icon.jsx":"e3502a963232","components/core/IconButton.jsx":"8ae869be3dd1","components/core/Logotype.jsx":"737813ffdf83","components/core/SectionRule.jsx":"c5ce37451c94","components/core/Tag.jsx":"4e7c0a329091","components/data/Figure.jsx":"b6fa99c16991","components/data/KeyValueList.jsx":"f50fda6d19d2","components/data/Meter.jsx":"98a5cc6fb306","components/data/SpecTable.jsx":"4ffdf5ae3dbd","components/data/Terminal.jsx":"7ef6d20b2ac0","components/feedback/Callout.jsx":"42955736816f","components/feedback/Dialog.jsx":"59ebb22708fd","components/feedback/Tooltip.jsx":"477770ce81cb","components/forms/Checkbox.jsx":"51f98e547a3b","components/forms/Input.jsx":"6c2c755a97ef","components/forms/Select.jsx":"e9a8804e1a12","components/forms/Switch.jsx":"f10ba8c79fe7","components/forms/Textarea.jsx":"862652a3c182","components/navigation/Breadcrumb.jsx":"f12fc686ca91","components/navigation/SiteHeader.jsx":"a73c15da7861","components/navigation/Tabs.jsx":"258247402233","ui_kits/portfolio_site/AboutScreen.jsx":"b8f17afff358","ui_kits/portfolio_site/App.jsx":"6e1dcfef990b","ui_kits/portfolio_site/HomeScreen.jsx":"2f7cd80d46b5","ui_kits/portfolio_site/ProjectScreen.jsx":"467b87910658","ui_kits/portfolio_site/data.js":"7c47b48631a0","ui_kits/print_dossier/CvSheet.jsx":"b90368d3fdd7","ui_kits/print_dossier/ProjectSheet.jsx":"4a31fa769166","ui_kits/print_dossier/doc-page.js":"f52ae9c02fca"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NotleyDesignSystem_566c40 = window.NotleyDesignSystem_566c40 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/backdrop/ScrollBackdrop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Full-width micrograph backdrop for a title/intro card, seen through the house scrim and
 * blur. Mount as the first child of a `position:relative` container (the intro/hero block);
 * it fills that container edge to edge, behind the content. `images` picks one at random on
 * mount; `image` is reactive — changing it (e.g. on an interval) crossfades to the new src.
 */
function ScrollBackdrop({
  images = [],
  image,
  scrim = "var(--bg-scrim)",
  blur = "var(--blur-backdrop)",
  label = "Microstructure image",
  style,
  ...rest
}) {
  const [picked] = React.useState(() => images.length ? images[Math.floor(Math.random() * images.length)] : null);
  const chosen = image || picked;
  const [layers, setLayers] = React.useState(() => chosen ? [{
    src: chosen,
    visible: true
  }] : []);
  const prevChosen = React.useRef(chosen);
  React.useEffect(() => {
    if (chosen === prevChosen.current) return;
    prevChosen.current = chosen;
    setLayers(ls => [...ls.map(l => ({
      ...l,
      visible: false
    })), {
      src: chosen,
      visible: false
    }]);
    const raf = requestAnimationFrame(() => setLayers(ls => ls.map((l, i) => i === ls.length - 1 ? {
      ...l,
      visible: true
    } : l)));
    const cleanup = setTimeout(() => setLayers(ls => ls.filter((l, i) => i === ls.length - 1)), 1300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cleanup);
    };
  }, [chosen]);
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: -1,
      overflow: "hidden",
      background: "var(--ink-900)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundColor: chosen ? "#121212" : "var(--ink-1000)"
    }
  }, layers.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.src + i,
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url("${l.src}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "saturate(.7) contrast(1.05)",
      opacity: l.visible ? 1 : 0,
      transition: "opacity 1200ms ease"
    }
  })), !chosen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--grid-overlay)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--fg-4)"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backdropFilter: `blur(${blur})`,
      WebkitBackdropFilter: `blur(${blur})`,
      maskImage: "radial-gradient(ellipse 70% 70% at center,transparent 62%,black 100%)",
      WebkitMaskImage: "-webkit-radial-gradient(ellipse 70% 70% at center,transparent 62%,black 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: scrim
    }
  }));
}
Object.assign(__ds_scope, { ScrollBackdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/backdrop/ScrollBackdrop.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const T = {
  neutral: {
    color: "var(--text-muted)",
    border: "var(--border-hairline)",
    background: "transparent"
  },
  accent: {
    color: "var(--accent-spring)",
    border: "var(--border-accent)",
    background: "rgba(43,224,138,.08)"
  },
  info: {
    color: "var(--signal-info)",
    border: "1px solid rgba(34,211,238,.45)",
    background: "rgba(34,211,238,.08)"
  },
  warn: {
    color: "var(--signal-warn)",
    border: "1px solid rgba(240,192,90,.45)",
    background: "rgba(240,192,90,.08)"
  },
  fail: {
    color: "var(--signal-fail)",
    border: "1px solid rgba(255,107,94,.45)",
    background: "rgba(255,107,94,.08)"
  }
};
function Badge({
  tone = "neutral",
  dot = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      height: 18,
      padding: "0 6px",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      lineHeight: 1,
      ...T[tone],
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      background: "currentColor",
      borderRadius: "var(--radius-pill)"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    background: "var(--grad-accent)",
    color: "var(--ink-900)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "transparent",
    color: "var(--text-strong)",
    border: "var(--border-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-body)",
    border: "1px solid transparent"
  },
  danger: {
    background: "transparent",
    color: "var(--signal-fail)",
    border: "1px solid rgba(255,107,94,.5)"
  }
};
const S = {
  sm: {
    height: "var(--control-h-sm)",
    padding: "0 var(--space-2)",
    fontSize: "var(--size-2xs)"
  },
  md: {
    height: "var(--control-h)",
    padding: "0 var(--space-3)",
    fontSize: "var(--size-xs)"
  },
  lg: {
    height: "var(--control-h-lg)",
    padding: "0 var(--space-4)",
    fontSize: "var(--size-sm)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  prefix,
  suffix,
  full = false,
  as = "button",
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false),
    [a, setA] = React.useState(false);
  const Tag = as;
  const v = V[variant] || V.primary;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setA(false);
    },
    onMouseDown: () => setA(true),
    onMouseUp: () => setA(false),
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-1)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      whiteSpace: "nowrap",
      transition: "var(--transition-control),transform var(--dur-1) var(--ease-term)",
      transform: a && !disabled ? "translateY(1px)" : "none",
      textDecoration: "none",
      ...v,
      ...S[size],
      ...(h && !disabled ? variant === "primary" ? {
        filter: "brightness(1.08)"
      } : {
        background: "var(--bg-hover)",
        borderColor: variant === "danger" ? "var(--signal-fail)" : "var(--line-accent)",
        color: variant === "ghost" ? "var(--text-strong)" : v.color
      } : null),
      ...style
    }
  }, rest), prefix, /*#__PURE__*/React.createElement("span", null, children), suffix);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  label,
  index,
  title,
  meta,
  footer,
  interactive = false,
  padded = true,
  children,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: interactive && h ? "var(--surface-card-hover)" : "var(--surface-card)",
      border: interactive && h ? "var(--border-accent)" : "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      cursor: interactive ? "pointer" : "default",
      transition: "var(--transition-control)",
      display: "flex",
      flexDirection: "column",
      ...style
    }
  }, rest), (label || index) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "var(--space-2) var(--space-4)",
      borderBottom: "var(--border-hairline)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: h && interactive ? "var(--text-accent)" : "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)"
    }
  }, index)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: padded ? "var(--space-4)" : 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-xl)",
      color: "var(--text-strong)",
      letterSpacing: "var(--track-tight)",
      lineHeight: "var(--leading-snug)"
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-xs)",
      color: "var(--text-muted)"
    }
  }, meta), children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-3) var(--space-4)",
      borderTop: "var(--border-hairline)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-3)",
      fontSize: "var(--size-xs)",
      color: "var(--text-muted)"
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = "https://unpkg.com/lucide-static@0.451.0/icons/";

/** Monochrome glyph. Renders the Lucide SVG as a CSS mask so it inherits currentColor. */
function Icon({
  name,
  size = 15,
  strokeWidth,
  style,
  ...rest
}) {
  const url = `url("${BASE}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-hidden": "true",
    "data-icon": name,
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      background: "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      verticalAlign: "-0.15em",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  name,
  label,
  size = "md",
  variant = "ghost",
  disabled = false,
  active = false,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const d = {
    sm: 26,
    md: 32,
    lg: 40
  }[size] || 32;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: d,
      height: d,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: active ? "var(--bg-active)" : h && !disabled ? "var(--bg-hover)" : "transparent",
      color: active ? "var(--text-accent)" : h && !disabled ? "var(--text-strong)" : "var(--text-body)",
      border: variant === "outline" ? "var(--border-hairline)" : "1px solid transparent",
      borderRadius: "var(--radius-1)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === "sm" ? 13 : size === "lg" ? 18 : 15
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logotype.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Wordmark. No logo mark exists for this brand; the name set in type IS the mark. */
function Logotype({
  size = 18,
  variant = "full",
  gradient = false,
  style,
  ...rest
}) {
  const txt = variant === "initials" ? "JN" : "JAMES NOTLEY";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: size * .45,
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--weight-bold)",
      fontSize: size,
      letterSpacing: "var(--track-wide)",
      lineHeight: 1,
      color: "var(--text-strong)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: gradient ? {
      background: "var(--grad-accent)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    } : undefined
  }, txt));
}
Object.assign(__ds_scope, { Logotype });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logotype.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionRule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionRule({
  label,
  index,
  gradient = false,
  style,
  ...rest
}) {
  const grad = gradient === "smooth" ? "var(--grad-accent-smooth)" : gradient ? "var(--grad-accent)" : "var(--line-1)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      width: "100%",
      ...style
    }
  }, rest), index && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-faint)"
    }
  }, index), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: grad,
      opacity: gradient ? .7 : 1
    }
  }));
}
Object.assign(__ds_scope, { SectionRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  selected = false,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 8px",
      background: selected ? "var(--grad-accent-soft)" : h ? "var(--bg-hover)" : "transparent",
      border: selected ? "var(--border-accent)" : "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: selected ? "var(--text-strong)" : "var(--text-body)",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)"
    }
  }, "#"), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      all: "unset",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontSize: "var(--size-xs)"
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Figure.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Figure({
  src,
  alt = "",
  caption,
  index,
  ratio = "4 / 3",
  placeholder = "Micrograph / rig photo",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: "var(--bg-inset)",
      border: "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: src ? undefined : "var(--grid-overlay)"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "saturate(.85)"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, placeholder)), (caption || index) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-muted)",
      lineHeight: "var(--leading-snug)"
    }
  }, index && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-spring)"
    }
  }, index), /*#__PURE__*/React.createElement("span", null, caption)));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Figure.jsx", error: String((e && e.message) || e) }); }

// components/data/KeyValueList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function KeyValueList({
  items = [],
  columns = 1,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("dl", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
      gap: "var(--space-1) var(--space-6)",
      margin: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-2)",
      padding: "6px 0",
      borderBottom: "var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, it.key), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderBottom: "var(--border-dashed)",
      opacity: .5,
      transform: "translateY(-3px)"
    }
  }), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums",
      textAlign: "right"
    }
  }, it.value))));
}
Object.assign(__ds_scope, { KeyValueList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KeyValueList.jsx", error: String((e && e.message) || e) }); }

// components/data/Meter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Meter({
  label,
  value = 0,
  max = 100,
  unit,
  tone = "accent",
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = tone === "accent" ? "var(--grad-accent)" : `var(--signal-${tone})`;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      width: "100%",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-strong)",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: 0
    }
  }, value, unit && ` ${unit}`)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--bg-inset)",
      border: "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fill,
      transition: `width var(--dur-4) var(--ease-term)`
    }
  })));
}
Object.assign(__ds_scope, { Meter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Meter.jsx", error: String((e && e.message) || e) }); }

// components/data/SpecTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SpecTable({
  columns = [],
  rows = [],
  caption,
  dense = false,
  style,
  ...rest
}) {
  const pad = dense ? "6px var(--space-3)" : "var(--space-2) var(--space-3)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)"
    }
  }, caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: "top",
      textAlign: "left",
      padding: pad,
      borderBottom: "var(--border-hairline)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      background: "var(--bg-inset)"
    }
  }, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: i ? "right" : "left",
      padding: pad,
      borderBottom: "var(--border-strong)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      fontWeight: "var(--weight-regular)"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, r.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci,
    style: {
      textAlign: ci ? "right" : "left",
      padding: pad,
      borderBottom: ri === rows.length - 1 ? "none" : "var(--border-hairline)",
      color: ci ? "var(--text-strong)" : "var(--text-body)",
      fontVariantNumeric: "tabular-nums"
    }
  }, c)))))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/data/Terminal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Terminal({
  title = "~/notley",
  lines = [],
  cursor = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--bg-inset)",
      border: "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      overflow: "hidden",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: "6px var(--space-3)",
      borderBottom: "var(--border-hairline)",
      color: "var(--text-faint)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      background: "var(--accent-spring)"
    }
  }), title), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-3)",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundImage: "var(--scanline)"
    }
  }, lines.map((l, i) => {
    const cmd = typeof l === "object" && l.cmd,
      txt = typeof l === "string" ? l : l.cmd || l.out;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: "var(--space-2)",
        lineHeight: "var(--leading-snug)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: cmd ? "var(--accent-spring)" : "transparent"
      }
    }, ">"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: cmd ? "var(--text-strong)" : "var(--text-body)",
        whiteSpace: "pre-wrap"
      }
    }, txt));
  }), cursor && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-spring)"
    }
  }, ">"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 14,
      background: "var(--accent-spring)",
      animation: "ds-blink var(--blink)"
    }
  }))));
}
Object.assign(__ds_scope, { Terminal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Terminal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const M = {
  note: {
    c: "var(--signal-info)",
    i: "info"
  },
  ok: {
    c: "var(--signal-ok)",
    i: "check"
  },
  warn: {
    c: "var(--signal-warn)",
    i: "triangle-alert"
  },
  fail: {
    c: "var(--signal-fail)",
    i: "octagon-alert"
  }
};
function Callout({
  tone = "note",
  title,
  children,
  style,
  ...rest
}) {
  const m = M[tone] || M.note;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--space-4)",
      background: "var(--bg-panel)",
      border: "var(--border-hairline)",
      borderLeft: `2px solid ${m.c}`,
      borderRadius: "var(--radius-1)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: m.i,
    size: 15,
    style: {
      color: m.c,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: m.c
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-xs)",
      color: "var(--text-body)",
      lineHeight: "var(--leading-body)"
    }
  }, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Callout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = false,
  title,
  onClose,
  footer,
  width = 520,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "var(--space-6)",
      background: "rgba(5,8,11,.72)",
      backdropFilter: "blur(3px)"
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: "100%",
      background: "var(--bg-panel)",
      border: "var(--border-strong)",
      borderRadius: "var(--radius-1)",
      boxShadow: "none",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-3)",
      padding: "var(--space-2) var(--space-2) var(--space-2) var(--space-4)",
      borderBottom: "var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4)",
      fontSize: "var(--size-xs)",
      color: "var(--text-body)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-2)",
      padding: "var(--space-3) var(--space-4)",
      borderTop: "var(--border-hairline)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  label,
  placement = "top",
  children,
  style,
  ...rest
}) {
  const [s, setS] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 6px)"
  } : {
    bottom: "calc(100% + 6px)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setS(true),
    onMouseLeave: () => setS(false),
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }, rest), children, s && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      ...pos,
      whiteSpace: "nowrap",
      padding: "4px 8px",
      background: "var(--ink-1000)",
      border: "var(--border-strong)",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-strong)",
      zIndex: 20,
      pointerEvents: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 15,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: checked ? "var(--grad-accent)" : "var(--bg-inset)",
      border: checked ? "1px solid transparent" : "var(--border-strong)",
      borderRadius: "var(--radius-1)",
      color: "var(--ink-900)",
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 11
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  prompt = false,
  invalid = false,
  size = "md",
  style,
  ...rest
}) {
  const [f_, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: f_ ? "var(--text-accent)" : "var(--text-muted)",
      transition: "var(--transition-control)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: size === "sm" ? "var(--control-h-sm)" : "var(--control-h)",
      padding: "0 var(--pad-control-x)",
      background: "var(--bg-inset)",
      borderRadius: "var(--radius-1)",
      border: invalid ? "1px solid var(--signal-fail)" : f_ ? "var(--border-accent)" : "var(--border-hairline)",
      boxShadow: f_ && !invalid ? "var(--ring-focus)" : "none",
      transition: "var(--transition-control)"
    }
  }, prompt && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-spring)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)"
    }
  }, ">"), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      all: "unset",
      flex: 1,
      minWidth: 0,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--text-strong)",
      ...style
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: invalid ? "var(--signal-fail)" : "var(--text-faint)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  value,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  const [f_, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: f_ ? "var(--text-accent)" : "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      appearance: "none",
      width: "100%",
      height: size === "sm" ? "var(--control-h-sm)" : "var(--control-h)",
      padding: "0 28px 0 var(--pad-control-x)",
      background: "var(--bg-inset)",
      border: f_ ? "var(--border-accent)" : "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--text-strong)",
      outline: "none",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === "string" ? o : o.value,
      l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 13,
    style: {
      position: "absolute",
      right: 10,
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: checked ? "var(--text-strong)" : "var(--text-muted)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 16,
      padding: 2,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: checked ? "flex-end" : "flex-start",
      background: checked ? "var(--grad-accent)" : "var(--bg-inset)",
      border: checked ? "1px solid transparent" : "var(--border-strong)",
      borderRadius: "var(--radius-1)",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      background: checked ? "var(--ink-900)" : "var(--text-muted)",
      transition: "var(--transition-control)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  rows = 4,
  invalid = false,
  style,
  ...rest
}) {
  const [f_, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      width: "100%"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: f_ ? "var(--text-accent)" : "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      background: "var(--bg-inset)",
      border: invalid ? "1px solid var(--signal-fail)" : f_ ? "var(--border-accent)" : "var(--border-hairline)",
      borderRadius: "var(--radius-1)",
      padding: "var(--space-2) var(--pad-control-x)",
      resize: "vertical",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      lineHeight: "var(--leading-body)",
      color: "var(--text-strong)",
      outline: "none",
      boxShadow: f_ && !invalid ? "var(--ring-focus)" : "none",
      transition: "var(--transition-control)",
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-faint)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumb({
  items = [],
  size = "sm",
  style,
  ...rest
}) {
  const fs = size === "xl" ? "var(--size-xl)" : size === "lg" ? "var(--size-lg)" : "var(--size-2xs)";
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontSize: fs,
      letterSpacing: "var(--track-wide)",
      color: "var(--text-muted)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-spring)"
    }
  }, "~"), items.map((it, i) => {
    const l = typeof it === "string" ? it : it.label,
      last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)"
      }
    }, "/"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: last ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, l));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteHeader({
  links = [],
  active,
  onNavigate,
  action,
  navPrefix,
  brand,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const navigate = v => {
    setOpen(false);
    onNavigate && onNavigate(v);
  };
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      height: 56,
      padding: "0 var(--space-6)",
      borderBottom: "var(--border-hairline)",
      background: "color-mix(in oklab,var(--bg-canvas) 88%,transparent)",
      backdropFilter: "blur(8px)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate("work"),
    style: {
      all: "unset",
      cursor: "pointer"
    },
    "aria-label": "Home"
  }, brand || /*#__PURE__*/React.createElement(__ds_scope.Logotype, {
    size: 14
  })), /*#__PURE__*/React.createElement("nav", {
    className: "pf-header-nav" + (open ? " pf-open" : ""),
    style: {
      alignItems: "center",
      gap: "var(--space-5)"
    }
  }, navPrefix, links.map(l => {
    const v = typeof l === "string" ? l : l.value,
      t = typeof l === "string" ? l : l.label,
      on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => navigate(v),
      style: {
        all: "unset",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        height: "100%",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-2xs)",
        letterSpacing: "var(--track-caps)",
        textTransform: "uppercase",
        color: on ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        borderBottom: on ? "1px solid var(--accent-spring)" : "1px solid transparent",
        paddingBottom: 2
      }
    }, t));
  }), action || /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "secondary",
    prefix: /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "download",
      size: 13
    })
  }, "CV")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    className: "pf-header-burger",
    "aria-label": open ? "Close menu" : "Open menu",
    style: {
      all: "unset",
      cursor: "pointer",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: open ? "x" : "menu",
    size: 20
  })));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: 0,
      borderBottom: "var(--border-hairline)",
      ...style
    }
  }, rest), items.map(it => {
    const v = typeof it === "string" ? it : it.value,
      l = typeof it === "string" ? it : it.label,
      n = typeof it === "object" ? it.count : undefined,
      on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        all: "unset",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "0 var(--space-3)",
        height: "var(--control-h)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-2xs)",
        letterSpacing: "var(--track-caps)",
        textTransform: "uppercase",
        color: on ? "var(--text-strong)" : "var(--text-muted)",
        borderBottom: on ? "2px solid var(--accent-spring)" : "2px solid transparent",
        marginBottom: -1,
        background: on ? "var(--grad-accent-soft)" : "transparent",
        transition: "var(--transition-control)"
      }
    }, l, n != null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)"
      }
    }, n));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_site/AboutScreen.jsx
try { (() => {
function AboutScreen({
  onContact
}) {
  const {
    Breadcrumb,
    SectionRule,
    KeyValueList,
    SpecTable,
    Tag,
    Tooltip,
    Button,
    Icon
  } = window.DS;
  const data = window.SITE_DATA;
  return /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto",
      padding: "calc(var(--space-8) / 2) var(--space-6) var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "2px solid var(--line-1)",
      paddingBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    size: "xl",
    items: ["about"]
  })), /*#__PURE__*/React.createElement("div", {
    className: "pf-grid-2",
    style: {
      gap: "var(--space-8)",
      margin: "var(--space-6) 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-xl)",
      lineHeight: 1.45,
      color: "var(--text-strong)",
      maxWidth: "46ch",
      margin: "0 0 var(--space-5)"
    }
  }, "I'm a materials science and engineering student at UC Riverside, building hardware for ultra-high vacuum systems and rocketry."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-md)"
    }
  }, "As a researcher on the MEMENCYS fellowship at the Bartels Lab, I design and build vacuum systems for semiconductor material growth, including a manipulator-compatible heated stage and a multi-source metal deposition chamber."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-md)"
    }
  }, "As Airframe Lead for the Highlander Space Program, I led a team of seven students fabricating launch vehicle airframes from fiberglass and sheet metal, and built the filament winder documented on this site."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-md)"
    }
  }, "I write projects up in full because half-documented work gets repeated. If something here is useful and the detail is missing, ask and I will send the data.")), /*#__PURE__*/React.createElement("div", null, data.cv.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "01",
    label: "Experience"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-3) 0 var(--space-7)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)"
    }
  }, data.cv.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-3)",
      padding: "6px 0",
      borderBottom: "var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: "var(--weight-bold)"
    }
  }, d.role), /*#__PURE__*/React.createElement("br", null), d.org.split(" — ")[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap",
      textAlign: "right"
    }
  }, d.key))))), /*#__PURE__*/React.createElement(SectionRule, {
    index: "02",
    label: "Instruments & methods"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-xs)",
      color: "var(--text-muted)",
      margin: "var(--space-3) 0 var(--space-3)"
    }
  }, "Hover for the full name."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: "var(--space-7)"
    }
  }, [["uhv", "Ultra high vacuum systems"], ["cnc", "CNC machining"], ["cfrp", "CFRP composites"], ["fdm", "FDM 3D printing"], ["sem", "Scanning electron microscopy"], ["xrd", "X-ray diffraction"], ["utm", "Universal testing machine"], ["solidworks", "SolidWorks"], ["fusion360", "Fusion 360 + simulation"], ["python", "Python"]].map(([t, full]) => /*#__PURE__*/React.createElement(Tooltip, {
    key: t,
    label: full
  }, /*#__PURE__*/React.createElement(Tag, null, t)))), /*#__PURE__*/React.createElement(SectionRule, {
    index: "03",
    label: "Education"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-3) 0 0"
    }
  }, /*#__PURE__*/React.createElement(SpecTable, {
    dense: true,
    columns: ["Institution", "Degree", "Grad"],
    rows: [["UC Riverside", /*#__PURE__*/React.createElement(React.Fragment, null, "BS, Materials Science and Engineering", /*#__PURE__*/React.createElement("br", null), "3.71 GPA, Tau Beta Pi"), "Dec 2026"]]
  })))));
}
window.AboutScreen = AboutScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_site/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_site/App.jsx
try { (() => {
function ContactSection() {
  const {
    SectionRule,
    Input,
    Textarea,
    Button,
    Icon,
    Breadcrumb
  } = window.DS;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "calc(var(--space-8) / 2) var(--space-6) var(--space-9)",
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "2px solid var(--line-1)",
      paddingBottom: "var(--space-3)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    size: "xl",
    items: ["contact"]
  })), /*#__PURE__*/React.createElement("div", {
    className: "pf-grid-2",
    style: {
      gap: "var(--space-7)",
      marginTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-xl)",
      lineHeight: 1.45,
      color: "var(--text-strong)",
      maxWidth: "36ch",
      margin: 0
    }
  }, "Riverside, CA. Open to roles and collaborations in vacuum systems, composites, and materials testing."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:jamesnotley@gmail.com",
    style: {
      display: "inline-block",
      marginTop: "var(--space-4)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-sm)"
    }
  }, "jamesnotley@gmail.com"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+19165214107",
    style: {
      display: "block",
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-sm)"
    }
  }, "(916) 521-4107")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--accent-spring)"
    }
  }, "> message queued. reply within two working days.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    placeholder: "you@email.xyz"
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Message",
    rows: 5
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: () => setSent(true),
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 13
    })
  }, "Send")))));
}
window.ContactSection = ContactSection;
function SiteFooter({
  onNavigate
}) {
  const {
    Logotype,
    SectionRule,
    Icon
  } = window.DS;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "var(--border-hairline)",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    gradient: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-5)",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Logotype, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://linkedin.com/in/jamesnotley",
    "aria-label": "LinkedIn",
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--weight-bold)",
      borderBottom: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin",
    size: 14
  })), /*#__PURE__*/React.createElement("a", {
    href: "mailto:jamesnotley@gmail.com",
    "aria-label": "Email",
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--weight-bold)",
      borderBottom: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 14
  }))))));
}
function App() {
  const {
    SiteHeader,
    Button,
    Icon,
    Switch
  } = window.DS;
  const [route, setRoute] = React.useState({
    name: "page"
  });
  const [active, setActive] = React.useState("work");
  const [paper, setPaper] = React.useState(false);
  React.useEffect(() => {
    document.body.dataset.theme = paper ? "paper" : "";
  }, [paper]);
  React.useEffect(() => {
    if (route.name !== "page") return;
    const ids = ["work", "about", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-40% 0px -50% 0px"
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [route.name]);
  const scrollToId = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 56,
      behavior: "smooth"
    });
  };
  const goSection = id => {
    if (route.name !== "page") {
      setRoute({
        name: "page"
      });
      setTimeout(() => scrollToId(id), 0);
      return;
    }
    scrollToId(id);
  };
  const open = id => {
    setRoute({
      name: "project",
      id
    });
    window.scrollTo(0, 0);
  };
  const backHome = () => {
    setRoute({
      name: "page"
    });
    window.scrollTo(0, 0);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: ["work", "about", "contact"],
    active: route.name === "project" ? "work" : active,
    onNavigate: goSection,
    brand: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-sm)",
        letterSpacing: "var(--track-wide)",
        color: "var(--text-strong)"
      }
    }, "[jn@portfolio ~] ", /*#__PURE__*/React.createElement("span", {
      style: {
        animation: "cursor-blink 1s step-end infinite"
      }
    }, "_")),
    navPrefix: /*#__PURE__*/React.createElement(Switch, {
      checked: paper,
      onChange: () => setPaper(!paper)
    }),
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      prefix: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 13
      })
    }, "Resume")
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, route.name === "page" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    id: "work"
  }, /*#__PURE__*/React.createElement(window.HomeScreen, {
    onOpen: open
  })), /*#__PURE__*/React.createElement("section", {
    id: "about"
  }, /*#__PURE__*/React.createElement(window.AboutScreen, null)), /*#__PURE__*/React.createElement(window.ContactSection, null)), route.name === "project" && /*#__PURE__*/React.createElement(window.ProjectScreen, {
    id: route.id,
    onBack: backHome,
    onOpen: open
  })), /*#__PURE__*/React.createElement(SiteFooter, {
    onNavigate: goSection
  }));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_site/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_site/HomeScreen.jsx
try { (() => {
function HomeScreen({
  onOpen
}) {
  const {
    Button,
    Icon,
    Card,
    Tag,
    SectionRule,
    Logotype,
    ScrollBackdrop,
    Breadcrumb
  } = window.DS;
  const {
    Terminal,
    KeyValueList
  } = window.DS;
  const {
    Tabs
  } = window.DS;
  const {
    Input
  } = window.DS;
  const data = window.SITE_DATA;
  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [bgIdx, setBgIdx] = React.useState(() => Math.floor(Math.random() * data.backdrop.length));
  React.useEffect(() => {
    const t = setInterval(() => setBgIdx(i => (i + 1) % data.backdrop.length), 7000);
    return () => clearInterval(t);
  }, []);
  const list = data.projects.filter(p => (tab === "all" || p.tags.some(t => t.includes(tab)) || tab === "failure" && p.tags.includes("failure")) && (q === "" || (p.title + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      padding: "var(--space-9) var(--space-6) var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(ScrollBackdrop, {
    image: data.backdrop[bgIdx],
    scrim: "rgba(18,18,18,.55)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(540px,100%)",
      margin: "0 auto",
      color: "#EDEDED",
      textAlign: "center",
      padding: "0 var(--space-4)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "var(--space-4)",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Logotype, {
    size: 14,
    variant: "name",
    style: {
      color: "#EDEDED"
    }
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-5xl)",
      lineHeight: 1.04,
      marginBottom: "var(--space-4)",
      color: "#EDEDED"
    }
  }, "Half scientist,", /*#__PURE__*/React.createElement("br", null), "half engineer,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#2BE08A"
    }
  }, "all builder")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-lg)",
      maxWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#FFFFFF"
    }
  }, "I'm a materials science and engineering student, semiconductor researcher, rocketry enthusiast, amateur machinist, and your next hire.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginTop: "var(--space-5)",
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-down",
      size: 13
    }),
    onClick: () => onOpen(data.projects[0].id),
    style: {
      width: 169,
      justifyContent: "center"
    }
  }, "Latest project"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    style: {
      color: "#EDEDED",
      borderColor: "#EDEDED",
      width: 169,
      justifyContent: "center"
    },
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 13
    })
  }, "Download Resume"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "calc(var(--space-8) / 2) var(--space-6) var(--space-8)",
      maxWidth: "var(--container)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "2px solid var(--line-1)",
      paddingBottom: "var(--space-3)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    size: "xl",
    items: ["work"]
  })), /*#__PURE__*/React.createElement(SectionRule, {
    index: "01",
    label: "Selected projects"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pf-tabs-row",
    style: {
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      margin: "calc(var(--space-4) / 2) 0 var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: "all",
      label: "All",
      count: data.projects.length
    }, {
      value: "uhv",
      label: "Vacuum",
      count: 1
    }, {
      value: "composites",
      label: "Composites",
      count: 1
    }],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    className: "pf-search-wrap",
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    prompt: true,
    size: "sm",
    placeholder: "filter projects\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pf-grid-2",
    style: {
      gap: "var(--space-4)"
    }
  }, list.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.id,
    label: "Project",
    index: p.index,
    title: p.title,
    interactive: true,
    onClick: () => onOpen(p.id),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "Read case study"), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 13
    }))
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-faint)",
      letterSpacing: "var(--track-caps)"
    }
  }, p.year), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-xs)",
      color: "var(--text-body)",
      margin: 0,
      flex: 1
    }
  }, p.summary), /*#__PURE__*/React.createElement("div", {
    className: "pf-card-img"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-faint)",
      textTransform: "uppercase",
      letterSpacing: "var(--track-caps)"
    }
  }, "image"))))), list.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--text-faint)",
      padding: "var(--space-5)",
      border: "var(--border-dashed)"
    }
  }, "no matches for \"", q, "\""))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_site/ProjectScreen.jsx
try { (() => {
function ArticleBlock({
  block
}) {
  const {
    SpecTable,
    Figure,
    Callout,
    SectionRule
  } = window.DS;
  if (block.h) return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--size-2xl)",
      margin: "var(--space-7) 0 var(--space-3)",
      maxWidth: "32ch"
    }
  }, block.h);
  if (block.p) return /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-md)",
      lineHeight: "var(--leading-body)",
      color: "var(--text-body)",
      maxWidth: "var(--measure)"
    }
  }, block.lead && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)",
      fontWeight: 600
    }
  }, block.lead, " "), block.p);
  if (block.list) return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-5) 0",
      maxWidth: "var(--measure)",
      borderTop: "var(--border-hairline)",
      borderBottom: "var(--border-hairline)",
      padding: "var(--space-4) 0"
    }
  }, block.list.title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)",
      marginBottom: "var(--space-3)"
    }
  }, block.list.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, block.list.items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      fontSize: "var(--size-sm)",
      lineHeight: 1.5,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--accent-spring)",
      paddingTop: 2
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", null, it)))));
  if (block.skills) return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)",
      paddingTop: "var(--space-4)",
      borderTop: "var(--border-hairline)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      lineHeight: 1.8,
      color: "var(--text-faint)",
      maxWidth: "var(--measure)"
    }
  }, "Skills: ", block.skills);
  if (block.fig) return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-5) 0"
    }
  }, /*#__PURE__*/React.createElement(Figure, block.fig));
  if (block.table) return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-5) 0",
      maxWidth: "var(--measure)"
    }
  }, /*#__PURE__*/React.createElement(SpecTable, block.table));
  if (block.note) return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-5) 0",
      maxWidth: "var(--measure)"
    }
  }, /*#__PURE__*/React.createElement(Callout, block.note));
  return null;
}
function ProjectScreen({
  id,
  onBack,
  onOpen
}) {
  const {
    Breadcrumb,
    Tag,
    SectionRule,
    KeyValueList,
    Button,
    Icon
  } = window.DS;
  const data = window.SITE_DATA;
  const p = data.projects.find(x => x.id === id) || data.projects[0];
  const others = data.projects.filter(x => x.id !== p.id);
  return /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: 820,
      margin: "0 auto",
      padding: "var(--space-7) var(--space-6) var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      borderBottom: "var(--border-hairline)",
      paddingBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    size: "xl",
    items: ["work", p.id]
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    prefix: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 13
    }),
    onClick: onBack
  }, "Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      marginTop: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, "Project ", p.index, " \xB7 ", p.year)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-4xl)",
      margin: "var(--space-2) 0 var(--space-4)",
      maxWidth: "24ch"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-lg)",
      lineHeight: 1.5,
      color: "var(--text-strong)",
      maxWidth: "58ch"
    }
  }, p.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      margin: "var(--space-4) 0 var(--space-5)"
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "var(--space-5) 0 var(--space-6)",
      maxWidth: "var(--measure)"
    }
  }, /*#__PURE__*/React.createElement(KeyValueList, {
    columns: 2,
    items: p.meta
  })), /*#__PURE__*/React.createElement("div", null, (p.body || [{
    p: "Write-up in progress."
  }]).map((b, i) => /*#__PURE__*/React.createElement(ArticleBlock, {
    key: i,
    block: b
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(SectionRule, {
    label: "More work"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: "var(--space-3)"
    }
  }, others.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    onClick: () => onOpen(o.id),
    style: {
      all: "unset",
      cursor: "pointer",
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      padding: "var(--space-3) 0",
      borderBottom: "var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-2xs)",
      color: "var(--text-faint)"
    }
  }, o.index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-lg)",
      color: "var(--text-strong)",
      flex: 1
    }
  }, o.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-xs)",
      color: "var(--text-muted)"
    }
  }, o.year))))));
}
window.ArticleBlock = ArticleBlock;
window.ProjectScreen = ProjectScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_site/ProjectScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio_site/data.js
try { (() => {
// Real writeups, verbatim from uploads/. Article bodies are block arrays:
// {h}=section heading, {p}=paragraph (+{lead} for a bold opening sentence),
// {list}=bullet list, {fig}=Figure props, {table}=SpecTable props, {note}=Callout props.
window.SITE_DATA = {
  // Optional per-project `cover`/`coverAlternate` image paths feed the project-page ScrollBackdrop
  // (cover-alternate is used in preference where given). Neither is set on this placeholder data.
  projects: [{
    id: "uhv-deposition",
    index: "002",
    title: "Multi-Source UHV Deposition System with Thermally Stabilized Thickness Monitoring",
    year: "2026",
    category: "semiconductor",
    summary: `Designed, built, and qualified a three-material evaporation chamber with a rotating source-selection stage and an actively cooled quartz crystal monitor, then extended it with a 1000 °C in-vacuum annealing stage.`,
    tags: ["uhv", "thermal", "machining", "instrumentation"],
    meta: [{
      key: "Scope",
      value: `Senior design project, sponsored by [LAB NAME], continued under a summer research fellowship`
    }, {
      key: "Role",
      value: `Sole technical contributor`
    }],
    body: [{
      list: {
        title: "At a glance",
        items: [`Three deposition sources (Ti by e-beam, Au and Al by thermal crucible) served by a single thickness monitor`, `±5 nm accuracy target over ~100 nm typical film thickness`, `Interfaces with an existing hub chamber using in-vacuum interchangeable sample stubs`, `Chamber built from salvaged lab hardware; 5×10⁻⁷ torr achieved`, `Conduction-cooled QCM doubles the absorbable radiant load at constant crystal temperature`, `Annealing stub: four isolated electrical contacts in a 1" × 0.75" removable package, to 1000 °C`, `All stage and stub components machined in-house, including diamond-ground alumina`]
      }
    }, {
      h: `The problem`
    }, {
      p: `The sponsoring lab needed a deposition chamber capable of laying down three separate metals without breaking vacuum, feeding samples into an existing hub chamber whose sample stubs are swapped in vacuum by a mechanical transfer arm. Films had to be controlled to ±5 nm.`
    }, {
      p: `That last requirement is what shaped the entire project. Film thickness during evaporation is measured with a quartz crystal microbalance: a crystal oscillates at a frequency set by its mass, and deposited material shifts that frequency in a known way. The complication is that the crystal is equally sensitive to temperature, and both sources of drift are present at once. Heating softens the quartz lattice, lowering the resonant frequency in a way indistinguishable from added mass, while the added mass itself damps the oscillation — so temperature error and mass signal are confounded rather than separable.`
    }, {
      p: `The heat is unavoidable. Evaporating metal is molten metal, and both the deposition flux and the radiant heating it produces are line-of-sight. You cannot block one without blocking the other, short of adding an aperture and accepting a lower deposition rate. So the crystal is going to get hot, and the question is how hot you can let it get.`
    }, {
      p: `The design target came from that: hold the crystal inside the linear region of its temperature-error curve. Published work places that below roughly 50 °C, which leaves room to add a software correction up to 100 °C later once the system is characterized against direct film measurement.`
    }, {
      h: `Chamber and layout`
    }, {
      p: `The available hardware constrained the design before I drew anything. Between the parts on hand, the three-source requirement, and the hub interface geometry, exactly one chamber in the lab could work: roughly 24" long by 10" in diameter. Larger than ideal, but the only vessel with enough port real estate to fit three sources, the transfer interface, gauging, feedthroughs, and the monitor. I built the chamber up from salvaged components and fabricated a cart to house it.`
    }, {
      p: `The three-source requirement invites an obvious but expensive solution: three thickness monitors, one per source. Instead I arranged the sources around a rotating stage that presents either the sample or the monitor to any one source. One crystal, one set of electronics, one calibration to maintain.`
    }, {
      p: `That decision created the thermal problem I actually had to solve. A stationary QCM can be water cooled directly. A rotating one cannot: there are no rotary water feedthroughs in this size class and no UHV-compatible flexible hose to route around the motion. Cooling had to be conductive.`
    }, {
      h: `Thermal design`
    }, {
      p: `The solution is a cold finger with a flexible solid-state thermal bridge. A 0.25" OD copper loop carries ~1 °C chiller water to a fixed point in the chamber — the diameter set by the largest feedthrough available, not by what I would have chosen. A 9" copper braid bridges from that loop to the copper stage body adjacent to the crystal, absorbing the stage rotation without any fluid crossing the moving joint.`
    }, {
      p: `Both ends are joined for thermal contact rather than convenience. The stage end is clamped over roughly 1 in² of direct contact by a stainless backing plate and screws; the cold finger end wraps the tube under a clamp of similar contact area. Copper braid was chosen for conductivity and for its ability to take repeated flexure without work-hardening into failure the way solid strap would.`
    }, {
      p: `Rotation is indexed manually via an external handle, repeatable to ±2° against a scale. Motorized indexing was out of scope, and the source-to-monitor geometry tolerates the error.`
    }, {
      h: `Verification`
    }, {
      p: `The e-beam gun was installed in another group's chamber for the duration, so I characterized the thermal system using a resistive heater to stand in for the radiant load of a molten source. This turned out to be the better test regardless: it let me sweep input power continuously and independently of deposition, which a real source does not allow.`
    }, {
      p: `I instrumented the crystal and both ends of the thermal bridge. Two results came out of it:`
    }, {
      lead: `The cooling loop absorbs roughly twice the radiant load at the same crystal temperature.`,
      p: `Uncooled, the crystal climbed to 65 °C and stopped stabilizing entirely — past the linear region and past the point where the measurement means anything. Cooled, the system holds equivalent crystal temperature at double the input wattage.`
    }, {
      lead: `The bridge is operating in steady-state conduction, not storing heat.`,
      p: `I computed power through the braid from the measured ΔT and its known length, cross-section, and conductivity, and confirmed it matched the applied load. The ΔT across the bridge widened from 5 °C to 20 °C across the power sweep, consistent with conduction-limited transport and no saturation.`
    }, {
      note: {
        tone: "note",
        title: `Pending`,
        children: `Calculations to be inserted.`
      }
    }, {
      p: `The instrumentation itself is a problem in operation: a thermocouple bonded to the crystal interferes with the measurement it is meant to protect. So I built a linear model inferring crystal temperature from the two bridge temperatures, letting the production system run without a sensor at the crystal.`
    }, {
      p: `Linear is the right model here, not a convenient one. At steady state along a conduction path, temperature at any two points is linearly related regardless of the hot-side condition, and the cold side is pinned by chiller water at a fixed ~1 °C. The relationship holds across the operating range by construction, and the sweep data confirms it.`
    }, {
      note: {
        tone: "note",
        title: `Pending`,
        children: `Fit and residuals to be inserted.`
      }
    }, {
      h: `Extension: 1000 °C annealing stage`
    }, {
      p: `The fellowship added a second requirement: silicon annealing inside the hub chamber, heating a chip to 1000 °C with accurate temperature measurement.`
    }, {
      p: `Both the heater and the thermocouple must sit on the removable stub itself, which means routing four electrical contacts through a sample carrier measuring 1" × 0.75" — one that also has to survive repeated in-vacuum handling by the transfer arm and thermal cycling to 1000 °C.`
    }, {
      p: `I built the contacts out of the retention mechanism rather than adding to it. The stub was already held by two structural pins and a clip. I used one pin to deliver heater current and the clip plus the second pin to return the body to neutral, then added side wings for the thermocouple contacts, isolated by ceramic plates and screws. The sample, heater, and clip are separated by an alumina plate. The heater is 0.011" tungsten wire on ceramic bead insulators, roughly 0.5 Ω, driven at 5-10 V.`
    }, {
      p: `Differential expansion works in the design's favor. The 304 stainless body expands faster than the embedded alumina beads and screws, so the ceramics are never crushed or seized on cycling. The structural pins loosen slightly at temperature, but they run with clearance by design and the clip provides retention independently.`
    }, {
      lead: `Results:`,
      p: `the stage side delivers power reliably and stubs interchange cleanly even after repeated high-temperature cycling. The silicon reaches target temperature by visual confirmation.`
    }, {
      lead: `Open issue:`,
      p: `thermocouple readings drop off abruptly above ~600 °C. Debugging is ongoing. The leading hypothesis is a temperature-dependent shunt path through the alumina isolation — bulk resistivity of alumina falls sharply in exactly that band, which would create a virtual junction and pull the reading toward an intermediate point on the leads. The discriminating test is reversibility on cooldown plus leg-to-leg and leg-to-chassis resistance measured hot and cold; EMI would disappear the instant heater power is cut, a shunt would not. Type K is in use for cost during development and may be replaced regardless once the mechanism is confirmed.`
    }, {
      note: {
        tone: "note",
        title: `Pending`,
        children: `Update pending.`
      }
    }, {
      h: `Fabrication`
    }, {
      p: `I machined all stage and stub components myself: milling 304 stainless and copper on a manual mill, holding ±0.005" on the tightest features. Alumina requires diamond or fiber laser cutting and the lab has no laser, so every ceramic part was ground from sheet scrap with diamond burrs.`
    }, {
      p: `Material selection was driven by vacuum compatibility throughout — copper, stainless, molybdenum, tungsten, alumina — with the thermocouple assembly the remaining outgassing question at full temperature.`
    }, {
      h: `Status`
    }, {
      p: `Thermal subsystem qualified. Annealing stage mechanically validated with temperature measurement debugging in progress. Chamber currently operates on borrowed pumping; standing up an independent pump stack is in work, presently limited to 1×10⁻⁴ torr pending rate-of-rise testing to separate leak from outgassing.`
    }, {
      skills: `UHV system design · thermal analysis · precision machining · design for vacuum · instrumentation and measurement · test planning and data analysis`
    }]
  }, {
    id: "filament-winder",
    index: "001",
    title: "Filament Winding Machine and Non-Cylindrical Toolpath Generator",
    year: "2025",
    category: "aerospace",
    summary: `Rebuilt an open-source filament winder from salvaged 3D printer hardware and wrote a toolpath generator that extended it to arbitrary axisymmetric mandrels, enabling wound nosecones rather than tubes alone.`,
    tags: ["composites", "g-code", "golang", "failure"],
    meta: [{
      key: "Scope",
      value: `Independent project within [ROCKETRY ORG], year 2`
    }, {
      key: "Role",
      value: `Sole contributor`
    }],
    body: [{
      list: {
        title: "At a glance",
        items: [`Based on Andrew Reilley's open-source Contraption winder; electronics rebuilt from a salvaged Ender 3`, `4-axis machine, operated in 2-axis configuration for process development`, `Toolpath generator extended from cylinders-only to arbitrary axisymmetric profiles`, `Rewritten from Python to Go with a graphical path visualizer`, `Did not reach production: mold release failed under winding tension, root cause identified`, `[GitHub link]`]
      }
    }, {
      h: `Why build a winder`
    }, {
      p: `Our team's composite airframe components were fabricated by hand layup. That process works, but it has two costs. It is labor-intensive — a tube consumes a full work session and multiple people — and it gives you almost no control over fiber orientation. You are tensioning braided sleeving over a mandrel by hand and accepting whatever angle the material settles into. For structures where the loads are known and the layup could be tailored to them, that is a lot of performance left unclaimed.`
    }, {
      p: `The buy-instead option had just failed decisively. In my first year I ran supplier and fabrication-method research for the team's composite components, and we placed a tube order with a vendor that delayed for roughly six months and ultimately never delivered. The company later closed and sold its equipment off. That experience is what pushed the question from "should we make our own tubing" to "we need to be able to make our own tubing."`
    }, {
      p: `Filament winding answers both problems at once: it is automatic, and fiber angle is a controlled parameter rather than an accident of handling.`
    }, {
      h: `Machine build`
    }, {
      p: `I started from Andrew Reilley's Contraption, an open-source winder design, and adapted the mechanical design to the hardware I could actually get. The electronics came entirely out of the guts of a dead Ender 3 — control board, steppers, drivers, supply — which meant reworking the machine's mechanical layout around what those components could drive rather than the reverse.`
    }, {
      p: `Running the machine on 3D printer firmware was a deliberate choice, not a shortcut. A filament winder and a 3D printer solve the same coordination problem: hold two axes in a fixed velocity ratio through a move. Winding a helical pass at a target fiber angle is a linear move in (mandrel rotation, carriage travel) space, which is exactly what a G1 command already expresses. Stock Ender 3 firmware with minor modification handles it, and I got a debugged motion stack, acceleration handling, and a mature G-code interpreter for free.`
    }, {
      p: `The full machine has four axes — mandrel rotation, carriage travel, filament head rotation, and standoff from the mandrel surface. I ran process development in a two-axis configuration, since head orientation and mandrel proximity matter for fiber placement quality but not for validating that the path geometry and release process work at all.`
    }, {
      h: `Toolpath generation`
    }, {
      p: `The stock software was the real limitation. It supported cylindrical mandrels only, which meant the machine could produce tubes and nothing else — while the parts we most wanted automated were nosecones, where hand layup is hardest and fiber angle control matters most. It was also terminal-only. I generally prefer terminal tools, but a winding path on a non-trivial mandrel is a three-dimensional object built up over many passes and layers, and there is no reading it as text.`
    }, {
      p: `The core computation is the relationship between carriage travel and mandrel rotation needed to produce a target fiber angle relative to the mandrel axis. On a cylinder that ratio is a constant, which is why the stock implementation could get away with what it did. On any profile that changes diameter, the local circumference changes as the carriage advances, so the ratio has to be recomputed continuously along the path.`
    }, {
      p: `My generator takes a mandrel profile — either a list of points or a closed-form expression — and solves for dx/dθ along it, then discretizes the result into G-code moves that hold the fiber angle as close to target as the segmentation allows. It also solves pass distribution, spacing each pass of a helical layer around the mandrel circumference so a layer closes out with even coverage rather than overlapping bands and bare stripes.`
    }, {
      p: `The path solution is purely geometric and does not model friction. On a tapered surface a wound fiber under tension will tend to slip toward the small end unless the path is either geodesic or shallow enough that friction holds it — a non-geodesic winding constraint I did not implement. For the mandrel geometries in scope this was a known, accepted limitation rather than an oversight, and characterizing actual slip against predicted path was queued behind getting parts off the mandrel at all.`
    }, {
      p: `I rewrote the generator from Python to Go and added a GUI. Go for a compiled single binary and better performance on dense paths; the GUI because layer-by-layer visualization is the whole point of the extension. I used AI-assisted translation for the port and the interface code — the algorithmic work and validation of the output paths are mine, the language transfer and UI scaffolding were not where the engineering was.`
    }, {
      h: `Where it failed`
    }, {
      p: `The machine never produced a usable part. Every tube seized on its mandrel and could not be recovered, and the team fabricated by hand for that year's launch as planned.`
    }, {
      p: `The failure is in release, and the interesting part is why our known-good release methods stopped working. Our hand layups used single-use 3D printed mandrels wrapped in Mylar or aluminum foil as a barrier layer against direct adhesion. That approach was well proven for us — it had outperformed PVA release agent in practice, including on the nosecone where I once recovered a stuck 3D printed mold by boiling it out on a stovetop. On the winder, both barrier films and PVA failed, on 3D printed mandrels and on aluminum pipe alike.`
    }, {
      p: `The mechanism is process, not chemistry. Hand layup places material on a mandrel; winding actively pulls it down. Continuous filament tension compacts the laminate radially onto the tool as it is laid, with the compaction pressure scaling as tension over mandrel radius. A release strategy that only has to prevent adhesion is not sufficient once the part is being actively clamped to the tool by its own fiber tension. Our release methods were never bad — they were validated against a process that does not generate that pressure, and we carried the assumption across to one that does.`
    }, {
      p: `That reframes the fix. The answer is not a better release agent but tooling that does not require the part to slide off at all: collapsible or multi-part mandrels that can be disassembled from inside the finished part. My teammate subsequently developed multi-part 3D printed molds on exactly that principle, and they are immune to the tension-sticking problem — independent confirmation of the diagnosis, though it arrived too late in my involvement to revive the winder.`
    }, {
      h: `What I would do differently`
    }, {
      p: `Sequence the process risk first. I built the machine and the software before proving the release process, and the release process is what killed it — an inversion of the right order. A single wound sleeve on a collapsible test mandrel, done in a week, would have surfaced the compaction problem before the machine existed.`
    }, {
      p: `The unimplemented work, in priority order: closed-loop tension control, which is currently absent and leaves fiber tension to spool drag; multi-part tooling; and a non-geodesic slip constraint in the path solver.`
    }, {
      skills: `composites manufacturing · motion control and G-code · Go and Python · geometric algorithms · design for manufacture · root cause analysis`
    }]
  }],
  writing: [],
  cv: [{
    key: "Jan 2026 – Present",
    role: "Researcher (MEMENCYS Fellowship)",
    org: "Dr. Ludwig Bartels Lab — Riverside, CA"
  }, {
    key: "Oct 2023 – June 2026",
    role: "Airframe Lead",
    org: "Highlander Space Program — Riverside, CA"
  }, {
    key: "June 2025 – Sept 2025",
    role: "Manufacturing Engineering Intern",
    org: "Woodward HRT — Santa Clarita, CA"
  }, {
    key: "June 2024 – Sept 2024",
    role: "Machinist Intern",
    org: "S and S Machine — Roseville, CA"
  }],
  backdrop: ["01-d7d18ab2.jpg", "02-a61e2612.jpg", "03-1af1afef.jpg", "04-eaeb2628.jpg", "05-d3c4451a.png", "06-a9a1f7e4.png", "07-a8b942b2.png", "08-870733e7.jpg", "09-9990a8d7.jpg", "10-a6e1e81a.jpg", "11-88140b17.png", "12-d4048632.png", "13-a2d803ba.png", "14-5a651c54.png"].map(f => "../../uploads/micrographs/" + f)
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio_site/data.js", error: String((e && e.message) || e) }); }

// ui_kits/print_dossier/CvSheet.jsx
try { (() => {
function CvSheet() {
  const {
    Logotype,
    SectionRule,
    KeyValueList,
    SpecTable,
    Tag,
    Badge
  } = window.DS;
  const d = window.SITE_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "18mm 16mm 14mm",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderBottom: "2px solid var(--text-strong)",
      paddingBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: "var(--track-wide)",
      color: "var(--text-strong)"
    }
  }, "JAMES NOTLEY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Materials engineer \xB7 Sheffield, UK")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-body)",
      lineHeight: 1.7
    }
  }, "james@notley.eng", /*#__PURE__*/React.createElement("br", null), "notley.eng", /*#__PURE__*/React.createElement("br", null), "github.com/jnotley")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      lineHeight: 1.6,
      margin: 0,
      maxWidth: "none"
    }
  }, "Materials engineer specialising in additive metals, fatigue and failure analysis. Six years between aerostructures and additive manufacturing, with a record of turning material problems back into process problems that can be fixed on the shop floor."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "01",
    label: "Experience"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)"
    }
  }, [["Senior materials engineer", "Kelvin Additive", "2023 — now", ["Owned qualification of Ti-6Al-4V lattice parts from powder intake to fatigue sign-off.", "Cut post-HIP scrap by 38% by re-orienting load-bearing struts within 20° of vertical.", "Wrote the group's build-acceptance procedure, now used across three machines."]], ["Materials engineer", "Barrow Aerostructures", "2020 — 2023", ["Ran a 240-weld porosity survey that reduced fillet-weld rework by a third.", "Closed a repeat gearbox shaft failure to a grinding burn missed by two inspection passes."]], ["Graduate engineer", "Barrow Aerostructures", "2019 — 2020", ["Built a four-station dead-weight creep rig for £3,850, still the teaching standard."]]].map(([role, org, yrs, bullets]) => /*#__PURE__*/React.createElement("div", {
    key: role,
    style: {
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 14,
      color: "var(--text-strong)"
    }
  }, role, " \xB7 ", org), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "var(--track-caps)",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, yrs)), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "6px 0 0",
      paddingLeft: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "flex",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      lineHeight: 1.5,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-spring)"
    }
  }, "\u2014"), /*#__PURE__*/React.createElement("span", null, b)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "02",
    label: "Education"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(KeyValueList, {
    items: [{
      key: "2019",
      value: "MEng Materials Science"
    }, {
      key: "",
      value: "University of Sheffield, 1st"
    }]
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "03",
    label: "Certifications"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(KeyValueList, {
    items: [{
      key: "BINDT",
      value: "RT / PT Level 2"
    }, {
      key: "IMMM",
      value: "CEng"
    }]
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "04",
    label: "Methods"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      marginTop: "var(--space-3)"
    }
  }, ["sem", "edx", "xrd", "ct", "dic", "fatigue", "abaqus", "python", "gmaw", "slm", "hip", "metallography"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "var(--border-hairline)",
      paddingTop: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Curriculum vitae \xB7 2026"), /*#__PURE__*/React.createElement("span", null, "Page 1 / 2")));
}
window.CvSheet = CvSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/print_dossier/CvSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/print_dossier/ProjectSheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProjectSheet() {
  const {
    SectionRule,
    KeyValueList,
    SpecTable,
    Meter,
    Figure,
    Callout
  } = window.DS;
  const p = window.SITE_DATA.projects[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "18mm 16mm 14mm",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 16,
      borderBottom: "2px solid var(--text-strong)",
      paddingBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Project ", p.index, " \xB7 ", p.year), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 24,
      marginTop: 6,
      color: "var(--text-strong)"
    }
  }, p.title))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      lineHeight: 1.6,
      margin: 0,
      maxWidth: "none",
      color: "var(--text-body)"
    }
  }, p.summary), /*#__PURE__*/React.createElement(KeyValueList, {
    columns: 2,
    items: p.meta
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "01",
    label: "Method"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, p.body.filter(b => b.p).slice(0, 3).map((b, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 10.5,
      lineHeight: 1.55,
      margin: 0,
      maxWidth: "none"
    }
  }, b.p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, p.body.filter(b => b.fig).slice(0, 2).map((b, i) => /*#__PURE__*/React.createElement(Figure, _extends({
    key: i
  }, b.fig, {
    ratio: "4 / 3"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionRule, {
    index: "02",
    label: "Results"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.25fr 1fr",
      gap: "var(--space-4)",
      marginTop: "var(--space-3)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SpecTable, _extends({
    dense: true
  }, p.body.find(b => b.table).table)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, p.meters.map(m => /*#__PURE__*/React.createElement(Meter, _extends({
    key: m.label
  }, m)))))), /*#__PURE__*/React.createElement(Callout, {
    tone: "note",
    title: "Test conditions"
  }, "Room temperature, 10 Hz, R = 0.1, n = 6 per condition. Fatigue per ASTM E466."), /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "var(--border-hairline)",
      paddingTop: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "var(--track-caps)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "James Notley \xB7 ", p.id), /*#__PURE__*/React.createElement("span", null, "Page 2 / 2")));
}
window.ProjectSheet = ProjectSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/print_dossier/ProjectSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/print_dossier/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container —
     * monolithic under fragmentation (css-break-3) — so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint — fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip —
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/print_dossier/doc-page.js", error: String((e && e.message) || e) }); }

__ds_ns.ScrollBackdrop = __ds_scope.ScrollBackdrop;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logotype = __ds_scope.Logotype;

__ds_ns.SectionRule = __ds_scope.SectionRule;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.KeyValueList = __ds_scope.KeyValueList;

__ds_ns.Meter = __ds_scope.Meter;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.Terminal = __ds_scope.Terminal;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
