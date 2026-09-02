/** 15px square checkbox; checked state fills with the accent gradient. */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
