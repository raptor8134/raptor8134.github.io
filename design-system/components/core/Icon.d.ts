/**
 * Lucide glyph wrapper (intentional addition — see readme.md > Iconography).
 * Masked so the glyph always paints in currentColor.
 */
export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "arrow-up-right". */
  name: string;
  /** Pixel box. 13 / 15 / 18 to match control sizes. */
  size?: number;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
