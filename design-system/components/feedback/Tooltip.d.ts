/** Hover label for icon buttons and abbreviated units/standards. */
export interface TooltipProps {
  label: React.ReactNode;
  placement?: "top" | "bottom";
  children?: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
