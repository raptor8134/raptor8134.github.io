/** Multi-line field. Same well and focus treatment as Input. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  rows?: number;
  invalid?: boolean;
}
export function Textarea(props: TextareaProps): JSX.Element;
