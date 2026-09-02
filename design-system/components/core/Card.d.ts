/**
 * Panel with an optional uppercase header strip and footer rule. The project-card
 * workhorse: square corners, 1px rule, no drop shadow.
 */
export interface CardProps {
  /** Uppercase header-strip label, e.g. "PROJECT". */
  label?: React.ReactNode;
  /** Right-aligned header index, e.g. "004". */
  index?: React.ReactNode;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  /** Hover accent + pointer cursor. */
  interactive?: boolean;
  padded?: boolean;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
