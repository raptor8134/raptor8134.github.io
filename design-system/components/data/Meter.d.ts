/** Horizontal bar for a single measured value against a maximum. */
export interface MeterProps {
  label: React.ReactNode;
  value: number;
  max?: number;
  /** Unit suffix shown after the value, e.g. "MPa". */
  unit?: string;
  tone?: "accent" | "ok" | "warn" | "fail" | "info";
  MeterTone?: never;
}
export function Meter(props: MeterProps): JSX.Element;
