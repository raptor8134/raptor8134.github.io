/**
 * Square icon-only control for toolbars, card corners and dialog dismiss.
 */
export interface IconButtonProps {
  /** Lucide icon name, kebab-case. */
  name: string;
  /** Required accessible label. */
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
export function IconButton(props: IconButtonProps): JSX.Element;
