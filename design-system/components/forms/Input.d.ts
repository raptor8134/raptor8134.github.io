/** Single-line text field on an inset well. `prompt` prefixes a terminal caret. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Show a green ">" caret before the value (search, command fields). */
  prompt?: boolean;
  invalid?: boolean;
  size?: "sm" | "md";
}
export function Input(props: InputProps): JSX.Element;
