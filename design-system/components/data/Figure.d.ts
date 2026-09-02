/**
 * Image slot with a numbered technical caption. Empty state shows a grid-ruled
 * placeholder — leave it empty rather than substituting stock imagery.
 */
export interface FigureProps {
  src?: string;
  alt?: string;
  caption?: React.ReactNode;
  /** Figure number, e.g. "FIG 3". Rendered in accent-spring. */
  index?: React.ReactNode;
  /** CSS aspect-ratio string. */
  ratio?: string;
  placeholder?: string;
}
export function Figure(props: FigureProps): JSX.Element;
