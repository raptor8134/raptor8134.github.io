/** Labelled hairline that opens a section. The core structural motif of the brand. */
export interface SectionRuleProps {
  label?: React.ReactNode;
  /** Small ordinal shown before the label, e.g. "02". */
  index?: React.ReactNode;
  /** Paint the rule with the accent gradient (stepped by default; use once or twice per page). "smooth" uses the continuous blend instead. */
  gradient?: boolean | "smooth";
}
export function SectionRule(props: SectionRuleProps): JSX.Element;
