/** Rectangular track toggle for view modes (dark/paper, grid/list). */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
export function Switch(props: SwitchProps): JSX.Element;
