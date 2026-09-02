/** Status chip: project state, material class, publication flag. */
export interface BadgeProps {
  tone?: "neutral" | "accent" | "info" | "warn" | "fail";
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
