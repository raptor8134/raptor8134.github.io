/**
 * The brand wordmark: name in bold mono followed by a blinking block cursor.
 * There is no graphic logo — do not invent one.
 */
export interface LogotypeProps {
  /** Cap height of the name in px. */
  size?: number;
  variant?: "full" | "name" | "initials";
  /** Gradient-fill the name (hero use only). */
  gradient?: boolean;
}
export function Logotype(props: LogotypeProps): JSX.Element;
