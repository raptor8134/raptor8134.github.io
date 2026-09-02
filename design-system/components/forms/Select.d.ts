/** Native select in house clothing, with a Lucide chevron. */
export interface SelectProps {
  label?: React.ReactNode;
  options: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  size?: "sm" | "md";
}
export function Select(props: SelectProps): JSX.Element;
