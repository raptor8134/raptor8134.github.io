/** Inline note for caveats, test conditions and confidentiality flags. */
export interface CalloutProps {
  tone?: "note" | "ok" | "warn" | "fail";
  title?: React.ReactNode;
  children?: React.ReactNode;
}
export function Callout(props: CalloutProps): JSX.Element;
